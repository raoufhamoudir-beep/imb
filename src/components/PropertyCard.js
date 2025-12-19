'use client';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Bed, Bath, Move, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

// دالة مساعدة لتنسيق السعر (يمكنك نقلها لملف utils لاحقاً)
const formatPrice = (price) => {
    if (!price) return 'السعر عند الطلب';
    if (typeof price === 'object' && price.amount) {
        return new Intl.NumberFormat('ar-DZ').format(price.amount) + ' دج';
    }
    return new Intl.NumberFormat('ar-DZ').format(price) + ' دج';
};

export default function PropertyCard({ property, className = '' }) {
    // استخراج الميزات بذكاء
    const findFeature = (keyword) => {
        const allDetails = [...(property.features || []), ...(property.details || [])];
        const found = allDetails.find(item =>
            typeof item === 'string' ? item.includes(keyword) : item?.name?.includes(keyword)
        );
        if (!found) return null;
        return typeof found === 'string' ? found : found.value;
    };

    const beds = findFeature('غرف') || findFeature('chambre') || '3';
    const baths = findFeature('حمام') || findFeature('bain') || '1';
    const area = findFeature('مساحة') || findFeature('area') || '120';

    return (
        <div
            className={`bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 -z-10 group flex flex-col h-full ${className}`}
        >
            {/* قسم الصورة */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100 ">
                <Link href={`/properties/${property._id}`} className="block w-full h-full ">
                    <Image
                        src={property.images?.[0] || '/images/placeholder.jpg'}
                        alt={property.title}
                        fill
                        className="object-cover  transition-transform duration-700 group-hover:scale-110 "
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </Link>

                {/* بادج الحالة */}
                <div className="absolute top-4 right-4 z-10">
                    <span className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider text-white shadow-sm ${property.type === 'rent' ? 'bg-accent' : 'bg-primary'
                        }`}>
                        {property.type === 'rent' ? 'للكراء' : 'للبيع'}
                    </span>
                </div>

                {/* زر المفضلة (جمالي) */}
                <button className="absolute top-4 left-4 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm text-gray-500 hover:text-red-500 hover:bg-white transition-all shadow-sm">
                    <Heart size={18} />
                </button>

                {/* السعر والتدرج */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-5 pt-12">
                    <p className="text-white font-bold text-xl md:text-2xl drop-shadow-md">
                        {formatPrice(property.price)}
                    </p>
                </div>
            </div>

            {/* قسم التفاصيل */}
            <div className="p-5 flex flex-col flex-grow justify-between">
                <div>
                    <div className="flex items-start justify-between gap-2 mb-3">
                        <Link href={`/properties/${property._id}`} className="block">
                            <h3 className="text-primary font-bold text-lg leading-snug line-clamp-2 group-hover:text-accent transition-colors">
                                {property.title}
                            </h3>
                        </Link>
                    </div>

                    <p className="text-gray-500 text-sm mb-4 flex items-center gap-1.5">
                        <MapPin size={16} className="text-accent shrink-0" />
                        <span className="truncate">
                            {property.location?.city || 'الجزائر'}، {property.location?.state || 'الجزائر العاصمة'}
                        </span>
                    </p>
                </div>

                {/* شريط الميزات */}
                <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-2">
                    <div className="flex flex-col items-center gap-1 text-gray-600">
                        <div className="flex items-center gap-1">
                            <Bed size={18} className="text-primary/70" />
                            <span className="font-bold text-sm text-primary">{beds}</span>
                        </div>
                        <span className="text-[10px] text-gray-400">غرف</span>
                    </div>

                    <div className="w-[1px] h-8 bg-gray-100"></div>

                    <div className="flex flex-col items-center gap-1 text-gray-600">
                        <div className="flex items-center gap-1">
                            <Bath size={18} className="text-primary/70" />
                            <span className="font-bold text-sm text-primary">{baths}</span>
                        </div>
                        <span className="text-[10px] text-gray-400">حمام</span>
                    </div>

                    <div className="w-[1px] h-8 bg-gray-100"></div>

                    <div className="flex flex-col items-center gap-1 text-gray-600">
                        <div className="flex items-center gap-1">
                            <Move size={18} className="text-primary/70" />
                            <span className="font-bold text-sm text-primary">{area}</span>
                        </div>
                        <span className="text-[10px] text-gray-400">م²</span>
                    </div>
                </div>
            </div>
        </div>
    );
}