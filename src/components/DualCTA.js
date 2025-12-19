'use client';
import { motion } from 'framer-motion';
import { TrendingUp, Home, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function DualCTA() {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">ما هو هدفك اليوم؟</h2>
                    <p className="text-gray-600 text-lg">صممنا IMB لتلبي احتياجات الجميع، اختر المسار الذي يناسبك</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {/* Card 1: Investment */}
                    <motion.div
                        whileHover={{ y: -10 }}
                        className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-900 to-indigo-900 p-8 text-white shadow-2xl"
                    >
                        <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-x-10 -translate-y-10"></div>

                        <TrendingUp className="w-12 h-12 text-purple-300 mb-6" />
                        <h3 className="text-2xl font-bold mb-3">أريد استثمار أموالي</h3>
                        <p className="text-purple-100 mb-8 leading-relaxed">
                            انضم لنخبة المستثمرين في مشاريع عقارية مضمونة ذات عائد ربحي مرتفع. تتبع أرباحك من لوحة تحكم خاصة.
                        </p>
                        <Link href="/investment" className="inline-flex items-center gap-2 bg-white text-purple-900 px-6 py-3 rounded-xl font-bold hover:bg-purple-50 transition-colors">
                            ابدأ الاستثمار <ArrowLeft size={18} />
                        </Link>
                    </motion.div>

                    {/* Card 2: Property */}
                    <motion.div
                        whileHover={{ y: -10 }}
                        className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-700 to-emerald-800 p-8 text-white shadow-2xl"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl translate-x-10 -translate-y-10"></div>

                        <Home className="w-12 h-12 text-teal-300 mb-6" />
                        <h3 className="text-2xl font-bold mb-3">أبحث عن عقار</h3>
                        <p className="text-teal-100 mb-8 leading-relaxed">
                            تصفح مئات الشقق، الفيلات، والأراضي الموثقة قانونياً. سواء للشراء أو الكراء، منزلك القادم هنا.
                        </p>
                        <Link href="/properties" className="inline-flex items-center gap-2 bg-white text-teal-900 px-6 py-3 rounded-xl font-bold hover:bg-teal-50 transition-colors">
                            تصفح العقارات <ArrowLeft size={18} />
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}