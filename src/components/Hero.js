// components/Hero.jsx
'use client';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function Hero() {
    return (
        <section className="relative h-[95vh] w-full flex items-center justify-center overflow-hidden">

            {/* Background with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
                    alt="Algeria Real Estate Luxury"
                    className="w-full h-full object-cover"
                />
                {/* The Magic Gradient: From your primary color to transparent */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#1b3d4e]/95 via-[#1b3d4e]/70 to-[#1b3d4e]/30"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#1b3d4e] via-transparent to-transparent"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-right"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-[2px] w-12 bg-accent"></div>
                        <span className="text-accent font-bold tracking-widest uppercase text-sm">مستقبل العقار في الجزائر</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-8">
                        استثمر بذكاء <br />
                        عش <span className="text-accent">بفخامة</span>
                    </h1>

                    <p className="text-gray-200 text-lg leading-relaxed mb-10 max-w-lg">
                        منصة IMB تفتح لك آفاقاً جديدة في السوق العقاري الجزائري. نجمع بين فرص الاستثمار الآمنة والعقارات السكنية الراقية في مكان واحد.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <a href="#invest" className="bg-accent hover:bg-accent-hover text-white px-8 py-4 rounded-sm font-bold transition-all shadow-lg hover:shadow-accent/20">
                            ابدأ الاستثمار
                        </a>
                        <a href="/properties" className="border border-white text-white hover:bg-white hover:text-primary px-8 py-4 rounded-sm font-bold transition-all">
                            تصفح العقارات
                        </a>
                    </div>
                </motion.div>

                {/* Optional: Floating Stats Card for "Trust" */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="hidden md:block relative"
                >
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-lg max-w-sm mr-auto relative">
                        <div className="absolute -top-10 -right-10 w-20 h-20 bg-accent rounded-full opacity-20 blur-2xl"></div>
                        <h3 className="text-2xl font-bold text-white mb-4 border-b border-white/10 pb-4">إحصائياتنا</h3>
                        <div className="space-y-6">
                            <div>
                                <span className="text-3xl font-bold text-accent">+50</span>
                                <p className="text-gray-300 text-sm">مشروع استثماري ناجح</p>
                            </div>
                            <div>
                                <span className="text-3xl font-bold text-accent">+200</span>
                                <p className="text-gray-300 text-sm">عميل راضٍ في 2024</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
            >
                <ChevronDown size={32} />
            </motion.div>
        </section>
    );
}