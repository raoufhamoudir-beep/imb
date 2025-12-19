// components/CtaSection.jsx
import Link from 'next/link';
import { Building2, TrendingUp, ArrowLeft } from 'lucide-react';

export default function CtaSection() {
    return (
        <section id="invest" className="py-24 bg-gray-50">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16 max-w-2xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">مسارك نحو النجاح</h2>
                    <p className="text-gray-600">في IMB، صممنا خدماتنا لتناسب طموحاتك. سواء كنت تبحث عن تنمية رأس مالك أو عن منزل الأحلام، نحن هنا.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Investment Card */}
                    <div className="group relative bg-white p-10 rounded-lg shadow-sm hover:shadow-2xl transition-all duration-300 border-t-4 border-accent overflow-hidden">
                        <div className="absolute top-0 left-0 w-32 h-32 bg-accent/5 rounded-full -translate-x-10 -translate-y-10 group-hover:scale-150 transition-transform duration-500"></div>

                        <div className="relative z-10">
                            <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center mb-6">
                                <TrendingUp className="text-accent w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold text-primary mb-4">الاستثمار العقاري</h3>
                            <p className="text-gray-600 mb-8 leading-relaxed">
                                استثمر في مشاريع عقارية (ترقية عقارية، بناء) بعوائد ربحية ممتازة ومدروسة. نظام شفاف يضمن حقوقك ويطلعك على سير المشروع خطوة بخطوة.
                            </p>
                            <Link href="/investment" className="inline-flex items-center text-primary font-bold group-hover:text-accent transition-colors">
                                تعرف على الفرص <ArrowLeft className="mr-2 w-4 h-4" />
                            </Link>
                        </div>
                    </div>

                    {/* Property Card */}
                    <div className="group relative bg-primary p-10 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden text-white">
                        <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 rounded-full translate-x-20 translate-y-20 group-hover:scale-150 transition-transform duration-500"></div>

                        <div className="relative z-10">
                            <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center mb-6">
                                <Building2 className="text-white w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">شراء وكراء العقارات</h3>
                            <p className="text-gray-300 mb-8 leading-relaxed">
                                تصفح أفخم الشقق والفيلات في الجزائر. عقارات موثقة، معاينة ميدانية، وإجراءات قانونية سليمة نرافقك فيها حتى استلام المفتاح.
                            </p>
                            <Link href="/properties" className="inline-flex items-center text-white font-bold hover:text-accent transition-colors">
                                تصفح العقارات <ArrowLeft className="mr-2 w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}