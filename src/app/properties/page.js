import connectDB from '@/lib/db';
import Property from '@/models/Property';
import PropertyCard from '@/components/PropertyCard'; // تأكد من المسار
import PropertyFilter from '@/components/PropertyFilter';
import { SearchX } from 'lucide-react';

// لجعل الصفحة ديناميكية دائماً لتقبل البحث
export const dynamic = 'force-dynamic';

async function getProperties(filters) {
    await connectDB();

    const query = {};

    // 1. تصحيح الفلترة: نتأكد أن القيمة موجودة وليست نصاً فارغاً
    if (filters.type && filters.type !== 'all') {
        query.type = filters.type;
    }

    if (filters.propertyType && filters.propertyType !== 'all') {
        query.propertyType = filters.propertyType;
    }

    // 2. بحث المدينة: نستخدم regex للبحث المرن
    if (filters.city && filters.city.trim() !== '') {
        query['location.city'] = { $regex: filters.city, $options: 'i' };
    }

    // 3. البحث النصي العام
    if (filters.search && filters.search.trim() !== '') {
        const searchRegex = { $regex: filters.search, $options: 'i' };
        query.$or = [
            { title: searchRegex },
            { description: searchRegex },
            { 'location.state': searchRegex },
            { 'location.city': searchRegex }
        ];
    }

    // 4. إصلاح فلتر السعر (بما أن السكيما Mixed)
    if (filters.maxPrice) {
        const max = Number(filters.maxPrice);
        if (!isNaN(max)) {
            // نبحث في الحالتين: إما السعر مخزن كرقم مباشرة أو داخل كائن amount
            query.$or = [
                { price: { $lte: max } },          // الحالة 1: price: 50000
                { 'price.amount': { $lte: max } }  // الحالة 2: price: { amount: 50000 }
            ];

            // إذا كان هناك بحث نصي موجود مسبقاً في $or، نستخدم $and لدمج الشرطين
            // لكن للتبسيط هنا، سنفترض أن المستخدم يبحث بالسعر بشكل منفصل أو نضيفه كـ $and
            // التحسين لدمج الـ $or:
            if (filters.search) {
                const searchOr = [
                    { title: { $regex: filters.search, $options: 'i' } },
                    { description: { $regex: filters.search, $options: 'i' } }
                ];
                const priceOr = [
                    { price: { $lte: max } },
                    { 'price.amount': { $lte: max } }
                ];

                // إعادة صياغة الكويري لتشمل الاثنين
                delete query.$or; // نحذف القديم
                query.$and = [
                    { $or: searchOr },
                    { $or: priceOr }
                ];
            }
        }
    }

    // طباعة الكويري في التيرمينال للتأكد (Debug)

    const properties = await Property.find(query).sort({ createdAt: -1 }).lean();

    return properties.map(doc => ({
        ...doc,
        _id: doc._id.toString(),
        createdAt: doc.createdAt?.toString(),
        updatedAt: doc.updatedAt?.toString(),
        // معالجة السعر ليظهر بشكل صحيح دائماً
        price: typeof doc.price === 'object' ? doc.price : { amount: doc.price, currency: 'DZD' }
    }));
}

export default async function PropertiesPage({ searchParams }) {
    // هام جداً في Next.js 15: يجب انتظار searchParams
    const resolvedSearchParams = await searchParams;

    const properties = await getProperties(resolvedSearchParams);

    return (
        <main className="min-h-screen bg-gray-50">

            {/* Page Header */}
            <div className="bg-primary pt-32 pb-16 text-center text-white">
                <h1 className="text-4xl font-black mb-4">تصفح عقاراتنا</h1>
            </div>

            <div className="container mx-auto px-6 py-12">
                <div className="flex flex-col lg:flex-row gap-8">

                    <aside className="lg:w-1/4 ">
                        <div className="sticky z-[10] top-24">
                            <PropertyFilter />
                        </div>
                    </aside>

                    <div className="lg:w-3/4 relative z-0">
                        {properties.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {properties.map(property => (
                                    <div key={property._id} className="h-full">
                                        {/* تأكد أنك تستخدم المكون الصحيح هنا */}
                                        <PropertyCard property={property} />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
                                <SearchX size={64} className="text-gray-300 mb-4" />
                                <h3 className="text-xl font-bold text-gray-800">لا توجد نتائج</h3>
                                <p className="text-gray-500 mt-2">
                                    الكويري المرسل: {JSON.stringify(resolvedSearchParams)}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}