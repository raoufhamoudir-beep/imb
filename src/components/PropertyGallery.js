'use client';

import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css'; // استيراد الستايل
import Image from 'next/image';
import { Share2, Heart, ImageIcon } from 'lucide-react';

export default function PropertyGallery({ images, title }) {
    // إذا لم توجد صور، نضع صورة افتراضية
    const galleryImages = images?.length > 0 ? images : ['/images/placeholder.jpg'];

    return (
        <PhotoProvider
            speed={() => 800}
            easing={(type) => (type === 2 ? 'cubic-bezier(0.36, 0, 0.66, -0.56)' : 'cubic-bezier(0.34, 1.56, 0.64, 1)')}
        >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[400px] md:h-[500px] mb-12 relative">

                {/* الصورة الرئيسية الكبيرة */}
                <div className="md:col-span-2 relative h-full rounded-2xl overflow-hidden shadow-2xl group cursor-pointer">
                    <PhotoView src={galleryImages[0]}>
                        <div className="w-full h-full relative">
                            <Image
                                src={galleryImages[0]}
                                alt={title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                priority
                            />
                            {/* تراكب أيقونة التكبير عند التحويم */}
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <ImageIcon className="text-white w-12 h-12" />
                            </div>
                        </div>
                    </PhotoView>

                    <div className="absolute top-4 left-4 flex gap-2 z-10">
                        <button className="bg-white/90 p-2 rounded-full hover:bg-white text-gray-700 transition shadow-md"><Share2 size={20} /></button>
                        <button className="bg-white/90 p-2 rounded-full hover:bg-white text-red-500 transition shadow-md"><Heart size={20} /></button>
                    </div>
                </div>

                {/* الصور الجانبية */}
                <div className="hidden md:flex flex-col gap-4 h-full">
                    {/* الصورة الثانية */}
                    {galleryImages[1] && (
                        <div className="relative flex-1 rounded-2xl overflow-hidden shadow-lg cursor-pointer group">
                            <PhotoView src={galleryImages[1]}>
                                <div className="w-full h-full relative">
                                    <Image
                                        src={galleryImages[1]}
                                        alt="Gallery 2"
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                            </PhotoView>
                        </div>
                    )}

                    {/* الصورة الثالثة + زر المزيد */}
                    {galleryImages[2] && (
                        <div className="relative flex-1 rounded-2xl overflow-hidden shadow-lg cursor-pointer group">
                            <PhotoView src={galleryImages[2]}>
                                <div className="w-full h-full relative">
                                    <Image
                                        src={galleryImages[2]}
                                        alt="Gallery 3"
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    {/* طبقة شفافة إذا كان هناك المزيد من الصور */}
                                    {galleryImages.length > 3 && (
                                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                            <span className="text-white font-bold text-xl flex items-center gap-2">
                                                +{galleryImages.length - 3} صور
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </PhotoView>
                        </div>
                    )}
                </div>

                {/* تحميل باقي الصور "مخفية" ليعمل المعرض عند التنقل */}
                {galleryImages.slice(3).map((img, index) => (
                    <PhotoView key={index + 3} src={img}>
                        <span style={{ display: 'none' }} />
                    </PhotoView>
                ))}

            </div>
        </PhotoProvider>
    );
}