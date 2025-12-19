// components/Header.jsx
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, User, LogOut, LayoutDashboard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { user, logout } = useAuth();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'الرئيسية', href: '/' },
        { name: 'فرص استثمارية', href: '/investment' },
        { name: 'عقارات للبيع', href: '/properties' },
        { name: 'تعلم معنا', href: '/learn' },
        { name: 'من نحن', href: '/about' },
        { name: 'اتصل بنا', href: '/contact' },
    ];

    return (
        <header
            className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-[#1b3d4e] shadow-lg py-3' : 'bg-[#1b3d4e] py-3'}`} // وحدت الخلفية لضمان ظهور الهيدر دائماً
        >
            <div className="container mx-auto px-6 flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="text-3xl font-black text-white tracking-wide">
                    IMB<span className="text-accent">.DZ</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex gap-6 items-center">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-white/90 hover:text-accent font-medium text-sm transition-colors relative group"
                        >
                            {link.name}
                            <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full"></span>
                        </Link>
                    ))}

                    {/* User Area */}
                    {user ? (
                        <div className="flex items-center gap-3 border-r border-white/20 pr-4 mr-2">
                            {/* الرابط إلى لوحة التحكم */}
                            <Link href="/account" className="flex items-center gap-3 group">
                                <div className="text-left hidden lg:block">
                                    <span className="text-white/60 text-[10px] block">مرحباً بك</span>
                                    <span className="text-white font-bold text-sm group-hover:text-accent transition-colors">
                                        {user.name}
                                    </span>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-accent/20 border border-accent/50 text-accent flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all">
                                    <User size={20} />
                                </div>
                            </Link>

                            {/* زر الخروج */}
                            <button
                                onClick={logout}
                                className="p-2 rounded-full hover:bg-red-500/20 text-white/50 hover:text-red-500 transition-colors"
                                title="تسجيل الخروج"
                            >
                                <LogOut size={18} />
                            </button>
                        </div>
                    ) : (
                        <Link
                            href="/login"
                            className={`px-6 py-2 rounded-sm font-bold text-sm transition-all border-2 flex items-center gap-2 ${scrolled
                                ? 'bg-accent border-accent text-white hover:bg-white hover:text-primary'
                                : 'bg-transparent border-white text-white hover:bg-white hover:text-primary'
                                }`}
                        >
                            <User size={18} />
                            تسجيل الدخول
                        </Link>
                    )}
                </nav>

                {/* Mobile Toggle */}
                <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-white">
                    {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="absolute top-full left-0 w-full bg-[#1b3d4e] border-t border-white/10 md:hidden shadow-2xl overflow-hidden"
                    >
                        <div className="flex flex-col p-6 gap-4 text-center">
                            {user && (
                                <Link
                                    href="/account"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="bg-white/5 p-4 rounded-xl flex items-center gap-4 mb-2 border border-white/10"
                                >
                                    <div className="w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center font-bold text-xl">
                                        {user.name.charAt(0)}
                                    </div>
                                    <div className="text-right">
                                        <p className="text-white font-bold">{user.name}</p>
                                        <p className="text-accent text-sm">لوحة التحكم</p>
                                    </div>
                                </Link>
                            )}

                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="text-white text-lg font-bold py-2 hover:text-accent transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}

                            {!user ? (
                                <Link
                                    href="/login"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="bg-accent text-white py-3 mt-2 rounded-sm font-bold flex items-center justify-center gap-2"
                                >
                                    <User size={20} />
                                    تسجيل الدخول
                                </Link>
                            ) : (
                                <button
                                    onClick={() => { logout(); setMobileMenuOpen(false); }}
                                    className="bg-red-500/10 text-red-400 py-3 mt-2 rounded-sm font-bold flex items-center justify-center gap-2"
                                >
                                    <LogOut size={20} />
                                    تسجيل الخروج
                                </button>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}