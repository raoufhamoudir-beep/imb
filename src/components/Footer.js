// components/Footer.jsx
import Link from 'next/link';
import { MapPin, Phone, Mail, Facebook, Instagram, Linkedin } from 'lucide-react';
import Image from 'next/image';

export default function Footer() {
    return (
        <footer className="bg-primary text-white pt-20 pb-10">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-4 gap-12 border-b border-white/10 pb-12 mb-12">
                    {/* Brand Info */}
                    <div className="md:col-span-1">
                        <Link href="/" className="text-3xl font-black text-white tracking-wide block mb-6">
<Image
className='w-16 h-16'
src={'/logo.png'} 
alt='logo_imb'
width={50}
height={50}
/>                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            نحن نعيد تعريف مفهوم العقار في الجزائر من خلال المصداقية، الشفافية، والحلول الاستثمارية المبتكرة.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent transition-colors"><Facebook size={18} /></a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent transition-colors"><Instagram size={18} /></a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent transition-colors"><Linkedin size={18} /></a>
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 text-white">روابط هامة</h4>
                        <ul className="space-y-4 text-gray-400 text-sm">
                            <li><Link href="/about" className="hover:text-accent transition-colors">من نحن</Link></li>
                            <li><Link href="/investment" className="hover:text-accent transition-colors">كيف أستثمر؟</Link></li>
                            <li><Link href="/properties" className="hover:text-accent transition-colors">أحدث العقارات</Link></li>
                            <li><Link href="/privacy" className="hover:text-accent transition-colors">سياسة الخصوصية</Link></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 text-white">خدماتنا</h4>
                        <ul className="space-y-4 text-gray-400 text-sm">
                            <li>تسويق عقاري</li>
                            <li>إدارة أملاك</li>
                            <li>استشارة قانونية عقارية</li>
                            <li>الترقية العقارية</li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 text-white">تواصل معنا</h4>
                        <ul className="space-y-4 text-gray-400 text-sm">
                            <li className="flex items-start gap-3">
                                <MapPin className="text-accent shrink-0 mt-1" size={18} />
                                <span>الجزائر العاصمة، الجزائر</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="text-accent shrink-0" size={18} />
                                <span dir="ltr">+213 555 123 456</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="text-accent shrink-0" size={18} />
                                <span>info@imb-dz.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="text-center text-gray-500 text-sm flex flex-col md:flex-row justify-between items-center">
                    <p>© {new Date().getFullYear()} IMB Real Estate. جميع الحقوق محفوظة.</p>
                    <p className="mt-2 md:mt-0">Design by <a
                    href="https://wa.me/213776966468"
                    target='_blank'
                    className="text-accent font-semibold">#raouf_Hamoudi</a></p>
                </div>
            </div>
        </footer>
    );
}