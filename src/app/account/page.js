'use client';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Save, Lock, User, Loader2 } from 'lucide-react';
import axios from 'axios';

export default function AccountSettings() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '', 
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ type: '', text: '' });

        // 1. Validation
        if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
            setMessage({ type: 'error', text: 'كلمة المرور الجديدة غير متطابقة' });
            return;
        }

        if (formData.newPassword && !formData.currentPassword) {
            setMessage({ type: 'error', text: 'يرجى إدخال كلمة المرور الحالية لتغيير كلمة المرور' });
            return;
        }

        setLoading(true);

        try {
            // 2. Prepare Payload
            const payload = {
                name: formData.name,
            };

            // Only send password data if user is trying to change it
            if (formData.newPassword) {
                payload.currentPassword = formData.currentPassword;
                payload.newPassword = formData.newPassword;
            }

            // 3. API Call
            await axios.put(`/api/user?id=${user.id}`, payload);

            setMessage({ type: 'success', text: 'تم تحديث البيانات بنجاح!' });
            
            // Clear password fields
            setFormData(prev => ({
                ...prev,
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            }));

        } catch (error) {
            console.error(error);
            setMessage({ 
                type: 'error', 
                text: error.response?.data?.message || 'حدث خطأ أثناء التحديث' 
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-black text-primary mb-2">إعدادات الحساب</h1>
                <p className="text-gray-500">قم بتحديث معلوماتك الشخصية وكلمة المرور.</p>
            </div>

            {message.text && (
                <div className={`p-4 rounded-xl mb-6 font-bold text-center border ${
                    message.type === 'success' 
                    ? 'bg-green-50 text-green-700 border-green-200' 
                    : 'bg-red-50 text-red-700 border-red-200'
                }`}>
                    {message.text}
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
                            value={formData.currentPassword}
                            onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-accent"
                        />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">كلمة المرور الجديدة</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={formData.newPassword}
                                onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-accent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">تأكيد كلمة المرور</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
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