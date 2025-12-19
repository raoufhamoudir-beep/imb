'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Phone, Eye, EyeOff, ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function SignupPage() {
    const [loading, setLoading] = useState(false);
    const { signup } = useAuth();
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        password: '',
        role: 'client' // client, investor, affiliate
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const result = await signup(formData); // نرسل الـ formData كاملة

        if (!result.success) {
            setError(result.error);
            setLoading(false);
        }
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
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">أنشئ حساباً جديداً</h1>
                        <p className="text-gray-500">ابدأ رحلتك العقارية مع IMB اليوم.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">

                        {/* Name */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">الاسم الكامل</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    required
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pl-10 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                                    placeholder="محمد بن عبد الله"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                                <User className="absolute left-3 top-3.5 text-gray-400" size={20} />
                            </div>
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">رقم الهاتف</label>
                            <div className="relative">
                                <input
                                    type="tel"
                                    required
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pl-10 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                                    placeholder="05 XX XX XX XX"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                />
                                <Phone className="absolute left-3 top-3.5 text-gray-400" size={20} />
                            </div>
                        </div>

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
                            <label className="block text-sm font-bold text-gray-700 mb-2">كلمة المرور</label>
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
                            <p className="text-xs text-gray-400 mt-1">يجب أن تحتوي على 8 أحرف على الأقل.</p>
                        </div>

                        {/* Role Selection (Optional - Interesting for your business model) */}
                        <div className="pt-2">
                            <label className="block text-sm font-bold text-gray-700 mb-2">أنا مهتم بـ:</label>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, role: 'client' })}
                                    className={`py-3 rounded-xl text-sm font-bold border transition-all ${formData.role === 'client' ? 'bg-primary text-white border-primary' : 'bg-white text-gray-500 border-gray-200 hover:border-primary'}`}
                                >
                                    شراء/كراء عقار
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, role: 'investor' })}
                                    className={`py-3 rounded-xl text-sm font-bold border transition-all ${formData.role === 'investor' ? 'bg-primary text-white border-primary' : 'bg-white text-gray-500 border-gray-200 hover:border-primary'}`}
                                >
                                    استثمار أموال
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-accent hover:bg-accent-hover text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-70"
                        >
                            {loading ? <Loader2 className="animate-spin" /> : <CheckCircle2 size={20} />}
                            <span>{loading ? 'جاري إنشاء الحساب...' : 'تسجيل حساب جديد'}</span>
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-gray-500">
                            لديك حساب بالفعل؟{' '}
                            <Link href="/login" className="font-bold text-primary hover:text-accent transition-colors">
                                سجل دخولك هنا
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* 2. الجانب الأيسر: الصورة (تظهر فقط في الشاشات الكبيرة) */}
            <div className="hidden lg:block w-1/2 relative bg-[#112833]">
                <img
                    src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                    alt="Modern Architecture"
                    className="object-cover opacity-50 mix-blend-overlay"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#112833] via-transparent to-transparent"></div>
                <div className="absolute bottom-12 right-12 text-white max-w-lg">
                    <h2 className="text-4xl font-black mb-4 text-accent">عائلة IMB ترحب بك.</h2>
                    <p className="text-lg text-gray-300">سجل اليوم واحصل على أولوية الوصول لأحدث العروض الاستثمارية قبل طرحها في السوق.</p>
                </div>
            </div>

        </div>
    );
}