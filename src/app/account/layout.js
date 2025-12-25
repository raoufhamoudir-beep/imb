'use client';
import { useAuth } from '@/context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { User, Building, PlusCircle, Share2, Settings, Loader2, LogOut } from 'lucide-react';
import { useEffect } from 'react';

export default function AccountLayout({ children }) {
    const { user, loading, logout } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

    if (loading) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin text-accent w-10 h-10" /></div>;
    if (!user) return null;

    const menuItems = [
        { name: 'إعدادات الحساب', icon: <Settings size={20} />, href: '/account' },
        { name: 'عقاراتي', icon: <Building size={20} />, href: '/account/my-properties' },
        { name: 'عروضي الاستتمارية', icon: <Building size={20} />, href: '/account/my-investment' },
        { name: 'إضافة عقار', icon: <PlusCircle size={20} />, href: '/account/add-property' },
        { name: 'إضافة استتمار', icon: <PlusCircle size={20} />, href: '/account/add-investment' },
        { name: 'نظام المسوق', icon: <Share2 size={20} />, href: '/account/marketing' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Sidebar */}
                    <aside className="lg:w-1/4">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-28">
                            <div className="text-center mb-8 pb-8 border-b border-gray-100">
                                <div className="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4">
                                    {user.name.charAt(0)}
                                </div>
                                <h2 className="font-bold text-xl text-gray-800">{user.name}</h2>
                                <p className="text-gray-500 text-sm">{user.email}</p>
                                <span className="inline-block mt-2 px-3 py-1 bg-accent/10 text-accent text-xs font-bold rounded-full">
                                    {user.role === 'client' ? 'مستخدم' : 'مسوق عقاري'}
                                </span>
                            </div>

                            <nav className="space-y-2">
                                {menuItems.map((item) => {
                                    const isActive = pathname === item.href;
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold ${isActive
                                                ? 'bg-primary text-white shadow-md'
                                                : 'text-gray-600 hover:bg-gray-50'
                                                }`}
                                        >
                                            {item.icon}
                                            {item.name}
                                        </Link>
                                    );
                                })}
                                <button
                                    onClick={logout}
                                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-red-500 hover:bg-red-50 mt-4 border-t border-gray-100"
                                >
                                    <LogOut size={20} />
                                    تسجيل الخروج
                                </button>
                            </nav>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="lg:w-3/4">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 min-h-[600px]">
                            {children}
                        </div>
                    </main>

                </div>
            </div>
        </div>
    );
}