import ContactForm from '@/components/ContactForm';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Linkedin, MessageCircle } from 'lucide-react';

export const metadata = {
    title: 'تواصل معنا | IMB العقارية',
    description: 'نحن هنا للإجابة على جميع استفساراتكم بخصوص العقارات والاستثمار في الجزائر.',
};

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-primary pt-32 pb-20 px-6 text-center">
                <div className="container mx-auto">
                    <span className="text-accent font-bold tracking-widest uppercase text-sm mb-4 inline-block bg-white/5 px-4 py-1 rounded-full border border-white/10">
                        خدمة العملاء
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
                        كيف يمكننا <span className="text-accent">مساعدتك؟</span>
                    </h1>
                    <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                        سواء كان لديك سؤال حول عقار معين، أو ترغب في استشارة استثمارية، فريقنا جاهز لخدمتك على مدار الساعة.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-6 -mt-10 pb-20 relative z-10">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Left Column: Contact Info (35%) */}
                    <div className="lg:w-[35%] space-y-6">

                        {/* Contact Cards */}
                        <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 space-y-8">

                            {/* Phone */}
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center shrink-0">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800 text-lg">اتصل بنا</h4>
                                    <p className="text-gray-500 text-sm mb-1">متوفرون من 9 صباحاً - 5 مساءً</p>
                                    <a href="tel:+213555000000" className="text-xl font-black text-primary hover:text-accent transition-colors dir-ltr block">
                                        +213 555 00 00 00
                                    </a>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center shrink-0">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800 text-lg">البريد الإلكتروني</h4>
                                    <p className="text-gray-500 text-sm mb-1">للاستفسارات الرسمية والملفات</p>
                                    <a href="mailto:contact@imb-dz.com" className="text-lg font-bold text-primary hover:text-accent transition-colors">
                                        contact@imb-dz.com
                                    </a>
                                </div>
                            </div>

                            {/* Address */}
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center shrink-0">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800 text-lg">المقر الرئيسي</h4>
                                    <p className="text-gray-500 text-sm mb-1">تفضل بزيارتنا لشرب القهوة</p>
                                    <p className="text-primary font-medium">
                                        123 شارع ديدوش مراد، الجزائر العاصمة، الجزائر.
                                    </p>
                                </div>
                            </div>

                        </div>

                        {/* Social Media & WhatsApp */}
                        <div className="bg-primary p-8 rounded-3xl shadow-lg text-white text-center">
                            <h4 className="font-bold text-xl mb-6">تواصل مباشر</h4>

                            <a
                                href="https://wa.me/213555000000"
                                target="_blank"
                                className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-3 rounded-xl font-bold transition-all shadow-md mb-6"
                            >
                                <MessageCircle size={22} />
                                <span>محادثة واتساب</span>
                            </a>

                            <div className="flex justify-center gap-4">
                                <a href="#" className="p-3 bg-white/10 rounded-full hover:bg-accent transition-colors"><Facebook size={20} /></a>
                                <a href="#" className="p-3 bg-white/10 rounded-full hover:bg-accent transition-colors"><Instagram size={20} /></a>
                                <a href="#" className="p-3 bg-white/10 rounded-full hover:bg-accent transition-colors"><Linkedin size={20} /></a>
                            </div>
                        </div>

                    </div>

                    {/* Right Column: Form (65%) */}
                    <div className="lg:w-[65%]">
                        <ContactForm />
                    </div>

                </div>

                {/* Map Section */}
                <div className="mt-12 bg-white p-4 rounded-3xl shadow-sm border border-gray-100">
                    <div className="w-full h-[400px] bg-gray-200 rounded-2xl overflow-hidden relative">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3197.6698661868353!2d3.0560!3d36.7525!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128fb2f768297bcf%3A0x6e268d069c9b56f!2sAlgiers%2C%20Algeria!5e0!3m2!1sen!2sdz!4v1680000000000!5m2!1sen!2sdz"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="grayscale hover:grayscale-0 transition-all duration-500"
                        ></iframe>

                        {/* Custom Overlay (Optional) */}
                        <div className="absolute top-4 right-4 bg-white px-4 py-2 rounded-lg shadow-md flex items-center gap-2">
                            <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                            <span className="text-xs font-bold text-gray-700">مفتوح الآن</span>
                        </div>
                    </div>
                </div>

            </div>

        </main>
    );
}