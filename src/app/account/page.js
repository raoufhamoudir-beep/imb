'use client';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Save, Lock, User, Loader2 } from 'lucide-react';

export default function AccountSettings() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '', // للعرض فقط
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        // محاكاة الاتصال بالـ API لتحديث البيانات
        setTimeout(() => {
            setLoading(false);
            setMessage('تم تحديث البيانات بنجاح!');
        }, 1500);
        // هنا يجب إضافة كود fetch('/api/user/update', ...) لاحقاً
    };

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-black text-primary mb-2">إعدادات الحساب</h1>
                <p className="text-gray-500">قم بتحديث معلوماتك الشخصية وكلمة المرور.</p>
            </div>

            {message && (
                <div className="bg-green-50 text-green-700 p-4 rounded-xl mb-6 font-bold text-center border border-green-200">
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl">
                {/* المعلومات الشخصية */}
                <div className="space-y-4">
                    <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 pb-2 border-b">
                        <User size={20} className="text-accent" /> المعلومات الشخصية
                    </h3>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">الاسم الكامل</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-accent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">البريد الإلكتروني</label>
                            <input
                                type="email"
                                value={formData.email}
                                disabled
                                className="w-full bg-gray-100 border border-gray-200 rounded-xl px-4 py-3 text-gray-500 cursor-not-allowed"
                            />
                        </div>
                    </div>
                </div>

                {/* تغيير كلمة المرور */}
                <div className="space-y-4">
                    <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 pb-2 border-b">
                        <Lock size={20} className="text-accent" /> الأمان وكلمة المرور
                    </h3>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">كلمة المرور الحالية</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-accent"
                        />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">كلمة المرور الجديدة</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-accent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">تأكيد كلمة المرور</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-accent"
                            />
                        </div>
                    </div>
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-xl font-bold transition-all flex items-center gap-2 disabled:opacity-70"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : <Save size={20} />}
                        حفظ التغييرات
                    </button>
                </div>
            </form>
        </div>
    );
}