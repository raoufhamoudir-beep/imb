import { CheckCircle2 } from 'lucide-react';


export default function AboutSnippet() {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    <div className="w-full md:w-1/2">
                        <div className="relative">
                            <div className="absolute top-4 left-4 w-full h-full border-2 border-primary rounded-lg z-0"></div>
                            <img
                                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                alt="About IMB"
                                className="w-full h-auto rounded-lg shadow-lg relative z-10"
                            />
                        </div>
                    </div>
                    <div className="w-full md:w-1/2">
                        <h4 className="text-accent font-bold uppercase tracking-wider text-sm mb-2">لماذا تختارنا؟</h4>
                        <h2 className="text-3xl md:text-4xl font-black text-primary mb-6">شريكك الموثوق في عالم العقار</h2>
                        <p className="text-gray-600 leading-relaxed mb-8">
                            نحن في IMB نؤمن بأن العقار ليس مجرد جدران، بل هو أصول تنمو ومستقبل يُبنى. بخبرة سنوات في السوق الجزائري، نقدم لك:
                        </p>

                        <ul className="space-y-4 mb-8">
                            {[
                                'عقود موثقة ومسح عقاري شامل',
                                'نسب أرباح تنافسية للمستثمرين',
                                'دعم قانوني وإداري متكامل',
                                'شبكة علاقات واسعة في كافة الولايات'
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-primary font-medium">
                                    <CheckCircle2 className="text-accent" size={20} />
                                    {item}
                                </li>
                            ))}
                        </ul>

                        <a href="/about" className="text-primary font-bold border-b-2 border-accent hover:text-accent transition-colors pb-1">
                            اقرأ المزيد عنا
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}