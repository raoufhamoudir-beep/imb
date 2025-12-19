'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, Search, Share2, FileCheck, Key, TrendingUp, Users, CheckCircle2 } from 'lucide-react';

// البيانات الخاصة بكل فئة
const data = {
    investor: {
        title: 'كيف تنمي أموالك مع IMB؟',
        description: 'استثمر في مشاريع عقارية مضمونة (ترقية عقارية) واحصل على عوائد ربحية دورية.',
        steps: [
            { icon: <Search size={32} />, title: 'اختر الفرصة', desc: 'تصفح المشاريع الاستثمارية المتاحة واطلع على دراسة الجدوى والمدة الزمنية.' },
            { icon: <FileCheck size={32} />, title: 'توقيع العقد', desc: 'يتم توقيع عقد شراكة موثق قانونياً يضمن حقوقك ويوضح نسبة الأرباح.' },
            { icon: <TrendingUp size={32} />, title: 'متابعة النمو', desc: 'تابع تطور المشروع عبر لوحة تحكم خاصة بك وتقارير دورية تصلك.' },
            { icon: <Wallet size={32} />, title: 'استلام الأرباح', desc: 'عند انتهاء المشروع أو بيع الوحدات، يتم تحويل رأس المال + الأرباح لحسابك.' },
        ]
    },
    buyer: {
        title: 'رحلة امتلاك منزلك الجديد',
        description: 'سواء كنت تبحث عن منزل للسكن أو للكراء، نحن نضمن لك عقارات بوثائق سليمة 100%.',
        steps: [
            { icon: <Search size={32} />, title: 'البحث والمعاينة', desc: 'استخدم الفلاتر للبحث عن العقار المناسب، واطلب موعداً لزيارته ميدانياً.' },
            { icon: <Users size={32} />, title: 'التفاوض والاتفاق', desc: 'نحن نلعب دور الوسيط النزيه لضمان أفضل سعر لك وللبائع.' },
            { icon: <FileCheck size={32} />, title: 'الإجراءات القانونية', desc: 'فريقنا القانوني يتكفل بفحص الدفتر العقاري وتحضير العقود عند الموثق.' },
            { icon: <Key size={32} />, title: 'استلام المفاتيح', desc: 'مبروك! تستلم عقارك جاهزاً فور إتمام إجراءات البيع النهائية.' },
        ]
    },
    affiliate: {
        title: 'اربح عمولة بدون رأس مال',
        description: 'نظام التسويق بالعمولة يتيح لك تحقيق دخل إضافي بمجرد ترشيح عملاء جادين.',
        steps: [
            { icon: <Users size={32} />, title: 'سجل كمسوق', desc: 'أنشئ حساباً واطلب الانضمام لبرنامج المسوقين للحصول على كود خاص.' },
            { icon: <Share2 size={32} />, title: 'رشح العقارات', desc: 'شارك العقارات مع معارفك أو عبر شبكات التواصل باستخدام رابطك الخاص.' },
            { icon: <CheckCircle2 size={32} />, title: 'إتمام البيع', desc: 'عندما يشتري العميل الذي رشحته أي عقار عن طريقنا.' },
            { icon: <Wallet size={32} />, title: 'اصرف عمولتك', desc: 'احصل على عمولتك (1% أو حسب الاتفاق) فور إتمام الصفقة.' },
        ]
    }
};

export default function LearnTabs() {
    const [activeTab, setActiveTab] = useState('buyer'); // الحالة الافتراضية

    return (
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">

            {/* 1. أزرار التبديل */}
            <div className="flex flex-col md:flex-row border-b border-gray-100">
                {[
                    { id: 'buyer', label: 'أريد شراء عقار', icon: <Key size={18} /> },
                    { id: 'investor', label: 'أريد الاستثمار', icon: <TrendingUp size={18} /> },
                    { id: 'affiliate', label: 'نظام المسوقين', icon: <Share2 size={18} /> },
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex-1 py-6 px-4 flex items-center justify-center gap-2 text-lg font-bold transition-all
              ${activeTab === tab.id
                                ? 'bg-primary text-white'
                                : 'bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-primary'
                            }`}
                    >
                        {tab.icon}
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* 2. المحتوى المتغير */}
            <div className="p-8 md:p-12 bg-gray-50/50 min-h-[500px]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-black text-primary mb-4">{data[activeTab].title}</h2>
                            <p className="text-gray-600 text-lg max-w-2xl mx-auto">{data[activeTab].description}</p>
                        </div>

                        {/* Steps Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                            {/* الخط الواصل (يظهر فقط في الشاشات الكبيرة) */}
                            <div className="hidden lg:block absolute top-12 left-0 w-full h-1 bg-gray-200 -z-10"></div>

                            {data[activeTab].steps.map((step, idx) => (
                                <div key={idx} className="relative bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-center group">
                                    {/* رقم الخطوة */}
                                    <div className="w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center font-bold absolute -top-4 -right-4 shadow-sm border-2 border-white">
                                        {idx + 1}
                                    </div>

                                    {/* الأيقونة */}
                                    <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                        {step.icon}
                                    </div>

                                    <h3 className="text-xl font-bold text-gray-800 mb-3">{step.title}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

        </div>
    );
}