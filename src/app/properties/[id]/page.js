import connectDB from '@/lib/db';
import Property from '@/models/Property';
import { notFound } from 'next/navigation';
import { MapPin, CheckCircle2, User } from 'lucide-react';
import PropertyGallery from '@/components/PropertyGallery'; // المكون الجديد
import PropertyContact from '@/components/PropertyContact'; // المكون الجديد

// ---------------------------------------------------------
// Configuration
// ---------------------------------------------------------
export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
    await connectDB();
    const properties = await Property.find({}, '_id').limit(50).lean();
    return properties.map((prop) => ({ id: prop._id.toString() }));
}

export async function generateMetadata({ params }) {
    const { id } = await params; // Next.js 15+ Await params
    const property = await getProperty(id);
    if (!property) return { title: 'عقار غير موجود' };
    return {
        title: `${property.title} | IMB العقارية`,
        description: property.description?.substring(0, 160),
        openGraph: { images: property.images?.[0] || [] },
    };
}

// ---------------------------------------------------------
// Data Fetching
// ---------------------------------------------------------
async function getProperty(id) {
    try {
        await connectDB();
        const property = await Property.findById(id).lean();
        if (!property) return null;
        return {
            ...property,
            _id: property._id.toString(),
            createdAt: property.createdAt?.toString(),
            updatedAt: property.updatedAt?.toString(),
        };
    } catch (error) { return null; }
}

const formatPrice = (price) => {
    if (!price) return 'السعر عند الطلب';
    if (typeof price === 'object' && price.amount) {
        return new Intl.NumberFormat('ar-DZ').format(price.amount) + ' دج';
    }
    return new Intl.NumberFormat('ar-DZ').format(price) + ' دج';
};

// ---------------------------------------------------------
// Page Component
// ---------------------------------------------------------
export default async function PropertyDetailsPage({ params }) {
    // 1. Await Params (Next.js 16 requirement)
    const { id } = await params;

    // 2. Fetch Data
    const property = await getProperty(id);

    if (!property) {
        notFound();
    }

    const features = [...(property.features || []), ...(property.details || [])];

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Hero Section: Location & Price Focused */}
            <div className="bg-primary text-white pt-32 pb-16 px-6">
                <div className="container mx-auto">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
                        <div className="space-y-4">
                            <div className="flex flex-wrap items-center gap-3">
                                <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${property.type === 'rent' ? 'bg-accent text-white' : 'bg-white/20 text-white'}`}>
                                    {property.type === 'rent' ? 'للكراء' : 'للبيع'}
                                </span>
                                {/* عرض الموقع بوضوح تام */}
                                <div className="flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full text-sm">
                                    <MapPin size={16} className="text-accent" />
                                    <span>{property.state}</span>
                                    <span className="text-white/40">/</span>
                                    <span>{property.city}</span>
                                </div>
                            </div>

                            <h1 className="text-3xl md:text-5xl font-black leading-tight max-w-3xl">
                                {property.title}
                            </h1>

                            <p className="text-gray-300 text-lg flex items-center gap-2">
                                <MapPin size={20} className="text-accent shrink-0" />
                                {property.address || 'العنوان الدقيق متوفر عند الاتصال'}
                            </p>
                        </div>

                        <div className="text-left bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm min-w-[250px]">
                            <p className="text-gray-400 text-sm mb-1">السعر الإجمالي</p>
                            <p className="text-3xl md:text-4xl font-bold text-accent whitespace-nowrap">
                                {formatPrice(property.price)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 py-8 -mt-10 relative z-10">

                {/* Gallery Component */}
                <PropertyGallery images={property.images} title={property.title} />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-10">
                        {/* Description */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                            <h2 className="text-2xl font-bold text-primary mb-6 border-b pb-4">تفاصيل العقار</h2>
                            <p className="text-gray-600 leading-8 text-lg whitespace-pre-line">
                                {property.description || 'لا يوجد وصف متاح.'}
                            </p>
                        </div>

                        {/* Features */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                            <h2 className="text-2xl font-bold text-primary mb-6 border-b pb-4">المرافق والمميزات</h2>
                            {features.length > 0 ? (
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {features.map((feature, idx) => (
                                        <div key={idx} className="flex items-center gap-3 text-gray-700 bg-gray-50 p-4 rounded-xl hover:bg-gray-100 transition-colors">
                                            <CheckCircle2 className="text-accent shrink-0" size={20} />
                                            <span className="font-bold text-sm">
                                                {typeof feature === 'string' ? feature : feature.name}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-400">لا توجد ميزات إضافية.</p>
                            )}
                        </div>

                        {/* Advertiser Info (Simplified) */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                                <User size={32} className="text-gray-400" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">تم النشر بواسطة</p>
                                <p className="text-xl font-bold text-primary">{property.contact?.name || 'المالك المباشر'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar: Contact Form */}
                    <aside className="space-y-6">
                        <PropertyContact
                            propertyId={property._id}
                            propertyTitle={property.title}
                            phone={property.contact?.phone}
                        />
                    </aside>

                </div>
            </div>
        </main>
    );
}