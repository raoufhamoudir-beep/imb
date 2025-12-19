import LearnTabs from '@/components/LearnTabs';
import { HelpCircle, ShieldCheck, FileText, Banknote } from 'lucide-react';

export const metadata = {
    title: 'كيف يعمل الموقع؟ | IMB العقارية',
    description: 'دليل شامل للمستثمرين، المشترين، والمسوقين للتعامل مع منصة IMB.',
};

export default function LearnPage() {
    return (
        <main className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-primary pt-32 pb-20 px-6 text-center relative overflow-hidden">
                {/* Decorative Background Elements */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

                <div className="relative z-10 container mx-auto">
                    <span className="text-accent font-bold tracking-widest uppercase text-sm mb-4 inline-block bg-white/5 px-4 py-1 rounded-full border border-white/10">
                        دليل المستخدم
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                        كل ما تحتاج معرفته عن <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-yellow-200">IMB العقارية</span>
                    </h1>
                    <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        نؤمن بالشفافية الكاملة. سواء كنت هنا لشراء منزل أحلامك، استثمار مدخراتك، أو العمل معنا كمسوق، إليك كيف تسير الأمور بوضوح.
                    </p>
                </div>
            </div>

            {/* Interactive Tabs Section */}
            <div className="container mx-auto px-6 -mt-10 relative z-20 mb-24">
                <LearnTabs />
            </div>

            {/* FAQ Section (الأسئلة الشائعة) */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-black text-primary mb-4">أسئلة يتكرر طرحها</h2>
                        <div className="w-20 h-1 bg-accent mx-auto rounded-full"></div>
                    </div>

                    <div className="space-y-4">
                        {[
                            {
                                q: "هل العقارات المعروضة موثقة قانونياً؟",
                                a: "نعم، وبشكل صارم. لا نقبل عرض أي عقار على منصة IMB إلا بعد التحقق من الدفتر العقاري وعقد الملكية من قبل فريقنا القانوني لضمان سلامة الصفقة."
                            },
                            {
                                q: "ما هي أقل قيمة للاستثمار معكم؟",
                                a: "تختلف القيمة حسب المشروع، ولكننا نسعى لتوفير فرص استثمارية تبدأ من مبالغ متوسطة (مثلاً حصص في شقق نصف جاهزة) لتمكين صغار المستثمرين من المشاركة."
                            },
                            {
                                q: "كيف أضمن حقي في نظام التسويق بالعمولة؟",
                                a: "نظامنا يسجل كل عميل يأتي عن طريق رابطك الخاص في قاعدة البيانات. بمجرد إتمام الصفقة، تظهر العمولة في لوحة التحكم الخاصة بك ويتم تحويلها لك فور استلام المبلغ من المشتري."
                            },
                            {
                                q: "هل يمكنني زيارة العقار قبل الشراء؟",
                                a: "بالتأكيد. المعاينة حق أساسي للمشتري. يمكنك حجز موعد عبر الموقع وسيرافقك أحد وكلائنا لمعاينة العقار والحي والتأكد من كل التفاصيل."
                            }
                        ].map((item, index) => (
                            <details key={index} className="group bg-gray-50 rounded-2xl border border-gray-100 open:bg-white open:shadow-lg open:border-accent/30 transition-all duration-300">
                                <summary className="flex cursor-pointer items-center justify-between p-6 font-bold text-lg text-gray-800 marker:content-none select-none">
                                    <span className="flex items-center gap-3">
                                        <HelpCircle className="text-accent" size={24} />
                                        {item.q}
                                    </span>
                                    <span className="transform transition-transform group-open:rotate-180 text-gray-400">▼</span>
                                </summary>
                                <div className="px-6 pb-6 text-gray-600 leading-relaxed mr-9 border-t border-gray-100 pt-4">
                                    {item.a}
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* Trust Indicators */}
            <section className="py-16 bg-primary text-white text-center">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-6">
                            <ShieldCheck className="mx-auto text-accent mb-4 w-12 h-12" />
                            <h3 className="text-xl font-bold mb-2">تعامل قانوني 100%</h3>
                            <p className="text-gray-400 text-sm">جميع تعاملاتنا تتم عبر موثقين معتمدين.</p>
                        </div>
                        <div className="p-6 border-x border-white/10">
                            <FileText className="mx-auto text-accent mb-4 w-12 h-12" />
                            <h3 className="text-xl font-bold mb-2">شفافية مطلقة</h3>
                            <p className="text-gray-400 text-sm">لا رسوم مخفية، كل شيء موضح في العقد.</p>
                        </div>
                        <div className="p-6">
                            <Banknote className="mx-auto text-accent mb-4 w-12 h-12" />
                            <h3 className="text-xl font-bold mb-2">أسعار مدروسة</h3>
                            <p className="text-gray-400 text-sm">نقيم العقارات بناءً على أسعار السوق الحقيقية.</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}