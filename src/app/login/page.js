'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowLeft, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const { login } = useAuth(); // استخدام الكونتكست
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const result = await login(formData.email, formData.password);

        if (!result.success) {
            setError(result.error);
            setLoading(false);
        }
        // التوجيه يحدث تلقائياً داخل دالة login في الكونتكست
    };

    return (
        <div className="min-h-screen flex bg-white">

            {/* 1. الجانب الأيمن: النموذج */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-12 relative">
                <Link href="/" className="absolute top-8 right-8 text-gray-400 hover:text-primary transition-colors flex items-center gap-2">
                    <ArrowLeft size={18} /> العودة للرئيسية
                </Link>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md"
                >
                    <div className="mb-10 text-center">
                        <Link href="/" className="text-4xl font-black text-primary tracking-wide block mb-6">
                            IMB<span className="text-accent">.DZ</span>
                        </Link>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">مرحباً بعودتك</h1>
                        <p className="text-gray-500">سجل الدخول لمتابعة استثماراتك وعقاراتك.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm font-bold text-center">
                                {error}
                            </div>
                        )}
                        {/* Email */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">البريد الإلكتروني</label>
                            <div className="relative">
                                <input
                                    type="email"
                                    required
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pl-10 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                                    placeholder="name@example.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                                <Mail className="absolute left-3 top-3.5 text-gray-400" size={20} />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-sm font-bold text-gray-700">كلمة المرور</label>
                                <Link href="/forgot-password" className="text-xs font-bold text-accent hover:text-primary transition-colors">
                                    نسيت كلمة المرور؟
                                </Link>
                            </div>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pl-10 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute left-3 top-3.5 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? <Loader2 className="animate-spin" /> : <Lock size={20} />}
                            <span>{loading ? 'جاري التحقق...' : 'تسجيل الدخول'}</span>
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-gray-500">
                            ليس لديك حساب؟{' '}
                            <Link href="/signup" className="font-bold text-primary hover:text-accent transition-colors">
                                أنشئ حساباً جديداً
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* 2. الجانب الأيسر: الصورة (تظهر فقط في الشاشات الكبيرة) */}
            <div className="hidden lg:block w-1/2 relative bg-primary">
                <img
                    src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                    alt="Luxury Apartment"
                    className="object-cover opacity-60 mix-blend-overlay"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent"></div>
                <div className="absolute bottom-12 right-12 text-white max-w-lg">
                    <h2 className="text-4xl font-black mb-4">استثمارك الآمن يبدأ هنا.</h2>
                    <p className="text-lg text-gray-300">انضم لأكثر من 500 مستثمر يثقون في IMB لإدارة وتنمية ثرواتهم العقارية.</p>
                </div>
            </div>

        </div>
    );
}