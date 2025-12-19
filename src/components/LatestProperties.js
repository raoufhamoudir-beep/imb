'use client';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, ChevronLeft } from 'lucide-react';
import PropertyCard from './PropertyCard'; // استيراد المكون الجديد
import { useRef } from 'react';

export default function LatestProperties({ properties }) {
    const scrollContainerRef = useRef(null);

    if (!properties || properties.length === 0) {
        return null;
    }

    // دالة للتحريك يدوياً بالأزرار (اختياري)
    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            const { current } = scrollContainerRef;
            const scrollAmount = direction === 'left' ? -350 : 350;
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <section className="py-24 bg-gray-50 overflow-hidden">
            <div className="container mx-auto px-6 relative">

                {/* رأس القسم */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                    <div>
                        <h4 className="text-accent font-bold uppercase tracking-widest text-sm mb-2">فرص مميزة</h4>
                        <h2 className="text-3xl md:text-4xl font-black text-primary">أحدث العقارات المضافة</h2>
                        <div className="w-20 h-1.5 bg-accent mt-4 rounded-full"></div>
                    </div>

                    {/* أزرار التنقل (تظهر فقط في الشاشات الكبيرة) */}
                    <div className="hidden md:flex gap-3">
                        <button onClick={() => scroll('right')} className="p-3 rounded-full border border-gray-200 hover:bg-primary hover:text-white hover:border-primary transition-all text-gray-400">
                            <ChevronRight size={24} />
                        </button>
                        <button onClick={() => scroll('left')} className="p-3 rounded-full border border-gray-200 hover:bg-primary hover:text-white hover:border-primary transition-all text-gray-400">
                            <ChevronLeft size={24} />
                        </button>
                    </div>
                </div>

                {/* حاوية السكرول الأفقي */}
                {/* - snap-x: يجعل السكرول يتوقف عند كل بطاقة بذكاء
                    - no-scrollbar: كلاس سنضيفه في CSS لإخفاء الشريط
                    - -mx-6 px-6: لضمان أن السكرول يصل لحواف الشاشة في الموبايل
                */}
                <div
                    ref={scrollContainerRef}
                    className="flex overflow-x-auto gap-6 pb-12 snap-x snap-mandatory -mx-6 px-6 md:mx-0 md:px-0 scroll-smooth no-scrollbar"
                >
                    {properties.map((property) => (
                        <div
                            key={property._id}
                            // تحديد عرض ثابت للبطاقة لتفعيل السكرول
                            className="min-w-[85%] md:min-w-[380px] snap-center"
                        >
                            <PropertyCard property={property} className="h-full" />
                        </div>
                    ))}

                    {/* بطاقة "عرض المزيد" في نهاية السكرول */}
                    <div className="min-w-[200px] md:min-w-[250px] snap-center flex items-center justify-center">
                        <Link href="/properties" className="group flex flex-col items-center gap-4 text-gray-400 hover:text-primary transition-colors">
                            <div className="w-16 h-16 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center group-hover:border-primary group-hover:scale-110 transition-all">
                                <ArrowLeft size={24} />
                            </div>
                            <span className="font-bold">عرض الكل</span>
                        </Link>
                    </div>
                </div>

                {/* زر للموبايل في الأسفل */}
                <div className="md:hidden text-center mt-4">
                    <Link
                        href="/properties"
                        className="text-primary font-bold text-sm border-b border-primary pb-1"
                    >
                        عرض جميع العقارات
                    </Link>
                </div>

            </div>
            <div className="text-center">

                <Link

                    href="/properties"

                    className="inline-flex items-center gap-2 bg-transparent border-2 border-primary text-primary px-8 py-3 rounded-sm font-bold hover:bg-primary hover:text-white transition-all duration-300"

                >

                    تصفح جميع العقارات <ArrowLeft size={20} />

                </Link>

            </div>
        </section>
    );
}