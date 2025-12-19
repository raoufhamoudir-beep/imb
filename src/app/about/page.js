import Image from 'next/image';
import Link from 'next/link';
import { Target, Shield, Users, Lightbulb, TrendingUp, CheckCircle2 } from 'lucide-react';

export const metadata = {
    title: 'من نحن | IMB العقارية',
    description: 'تعرف على IMB، الشركة الرائدة في تغيير مفهوم الاستثمار العقاري في الجزائر.',
};

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-white">
            {/* 1. Hero Section - نظيف وهادئ */}
            <div className="relative pt-32 pb-20 px-6 bg-primary overflow-hidden">
                {/* خلفية زخرفية */}
                <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 skew-x-12 translate-x-1/4"></div>

                <div className="container mx-auto relative z-10 text-center text-white">
                    <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
                        نحن نبني <span className="text-accent">الثقة</span> <br /> قبل بناء الجدران
                    </h1>
                    <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                        IMB ليست مجرد وكالة عقارية، بل هي رؤية جديدة تهدف لجعل الاستثمار العقاري في الجزائر تجربة آمنة، شفافة، ومربحة للجميع.
                    </p>
                </div>
            </div>

            {/* 2. Our Story Section (صورة + نص) */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row items-center gap-16">

                        {/* Image Composition */}
                        <div className="lg:w-1/2 relative">
                            <div className="relative h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl">
                                <img
                                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                                    alt="IMB Team Meeting"
                                    className="object-cover"
                                />
                            </div>
                            {/* Floating Badge */}
                            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl border-t-4 border-accent hidden md:block">
                                <p className="text-4xl font-black text-primary mb-1">اول</p>
                                <p className="text-gray-500 text-sm font-bold">منصة عقارية متكاملة </p>
                            </div>
                        </div>

                        {/* Text Content */}
                        <div className="lg:w-1/2">
                            <h4 className="text-accent font-bold uppercase tracking-widest text-sm mb-2">قصتنا</h4>
                            <h2 className="text-3xl md:text-4xl font-black text-primary mb-6">لماذا IMB؟</h2>
                            <div className="space-y-6 text-gray-600 leading-relaxed text-lg text-justify">
                                <p>
                                    بدأت IMB من ملاحظة بسيطة: السوق العقاري الجزائري مليء بالفرص، ولكنه يفتقر إلى <strong>الشفافية</strong> و <strong>الاحترافية</strong> التي يحتاجها المستثمر العصري.
                                </p>
                                <p>
                                    رأينا الكثير من الصفقات تفشل بسبب غياب الوثائق القانونية، ومستثمرين يخشون المجازفة بأموالهم. لذا قررنا إنشاء منصة تكون بمثابة "المرجع الآمن".
                                </p>
                                <p>
                                    اليوم، نحن فخورون باننا الاولون في المجال العقاري المتكامل
                                </p>
                            </div>

                            <div className="mt-8 pt-8 border-t border-gray-100 flex gap-8">
                                <div className="flex items-center gap-3">
                                    <CheckCircle2 className="text-accent" size={24} />
                                    <span className="font-bold text-primary">عقود موثقة</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <CheckCircle2 className="text-accent" size={24} />
                                    <span className="font-bold text-primary">فريق قانوني</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* 3. Stats Section (شريط الأرقام) */}
            <section className="py-16 bg-primary text-white">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/10 divide-x-reverse">
                        {[
                            { num: '50+', label: 'عقار  متاح' },
                            { num: '98%', label: 'نسبة رضا العملاء' },
                            { num: '12+', label: 'ولاية' },
                            { num: '24/7', label: 'دعم متواصل' },
                        ].map((stat, idx) => (
                            <div key={idx} className="p-4">
                                <p className="text-4xl md:text-5xl font-black text-accent mb-2">{stat.num}</p>
                                <p className="text-gray-300 font-medium">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. Vision & Mission (القيم) */}
            <section className="py-24 bg-gray-50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-black text-primary mb-4">قيمنا الراسخة</h2>
                        <div className="w-20 h-1 bg-accent mx-auto rounded-full"></div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Card 1 */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group">
                            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                                <Shield className="text-primary w-8 h-8 group-hover:text-white transition-colors" />
                            </div>
                            <h3 className="text-xl font-bold text-primary mb-3">الأمان أولاً</h3>
                            <p className="text-gray-500 leading-relaxed">
                                لا ندرج أي عقار أو مشروع استثماري إلا بعد اجتيازه لعملية تدقيق قانوني صارمة. أموالك وراحة بالك خط أحمر.
                            </p>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group">
                            <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                                <Lightbulb className="text-purple-600 w-8 h-8 group-hover:text-white transition-colors" />
                            </div>
                            <h3 className="text-xl font-bold text-primary mb-3">الابتكار في الاستثمار</h3>
                            <p className="text-gray-500 leading-relaxed">
                                نقدم حلولاً غير تقليدية مثل الاستثمار التشاركي والتمويل العقاري الميسر، لنفتح الباب أمام الجميع.
                            </p>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group">
                            <div className="w-16 h-16 bg-teal-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                                <Users className="text-teal-600 w-8 h-8 group-hover:text-white transition-colors" />
                            </div>
                            <h3 className="text-xl font-bold text-primary mb-3">مجتمع متكامل</h3>
                            <p className="text-gray-500 leading-relaxed">
                                علاقتنا لا تنتهي بتوقيع العقد. نحن نبني مجتمعاً من المستثمرين والشركاء ينمو ويزدهر معاً.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. Founder Message (لمسة شخصية) */}


            {/* 6. Call to Action */}
            <section className="py-20 text-center">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-black text-primary mb-6">جاهز للبدء معنا؟</h2>
                    <p className="text-gray-500 mb-8 max-w-xl mx-auto">سواء كنت تبحث عن استثمار مربح أو منزل مريح، فريقنا جاهز لخدمتك.</p>
                    <div className="flex justify-center gap-4">
                        <Link href="/properties" className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-lg font-bold transition-all">
                            تصفح العقارات
                        </Link>
                        <Link href="/contact" className="bg-white border-2 border-primary text-primary hover:bg-gray-50 px-8 py-3 rounded-lg font-bold transition-all">
                            تواصل معنا
                        </Link>
                    </div>
                </div>
            </section>

        </main>
    );
}