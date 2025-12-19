'use client';

import { useState } from 'react';
import { Phone, MessageCircle, Send, CheckCircle } from 'lucide-react';

export default function PropertyContact({ propertyId, propertyTitle, phone }) {
    const [formData, setFormData] = useState({ name: '', phone: '' });
    const [isSubmitted, setIsSubmitted] = useState(false);

    // دالة التعامل مع الواتساب
    const handleWhatsApp = () => {
        // تنظيف رقم الهاتف وإضافة رمز الدولة إذا لم يكن موجوداً
        const cleanPhone = phone ? phone.replace(/\D/g, '') : '213555000000';
        const message = encodeURIComponent(`مرحباً، أنا مهتم بالعقار: ${propertyTitle} (ID: ${propertyId})`);
        window.open(`https://wa.me/${cleanPhone}?text=${message}`, '_blank');
    };

    // دالة إرسال الطلب
    const handleSubmit = async (e) => {
        e.preventDefault();
        // هنا يمكنك إضافة استدعاء API لحفظ الطلب في قاعدة البيانات لاحقاً
        console.log("Order Sent:", formData);

        setIsSubmitted(true);
        // إعادة تعيين الحالة بعد 3 ثواني
        setTimeout(() => setIsSubmitted(false), 3000);
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-lg border-t-4 border-accent sticky top-24">
            <h3 className="text-xl font-bold text-primary mb-6">مهتم بهذا العقار؟</h3>

            <div className="space-y-4">
                {/* زر الواتساب */}
                <button
                    onClick={handleWhatsApp}
                    className="flex items-center justify-center gap-3 w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl"
                >
                    <MessageCircle size={24} />
                    <span>تواصل عبر واتساب</span>
                </button>

                <div className="relative flex py-2 items-center">
                    <div className="flex-grow border-t border-gray-200"></div>
                    <span className="flex-shrink-0 mx-4 text-gray-400 text-sm">أو اطلب معلومات</span>
                    <div className="flex-grow border-t border-gray-200"></div>
                </div>

                {/* نموذج الطلب السريع */}
                {isSubmitted ? (
                    <div className="bg-green-50 text-green-700 p-4 rounded-xl flex flex-col items-center justify-center text-center animate-pulse">
                        <CheckCircle size={40} className="mb-2" />
                        <p className="font-bold">تم إرسال طلبك بنجاح!</p>
                        <p className="text-sm">سنتصل بك في أقرب وقت.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-3">
                        <div>
                            <label className="text-xs font-bold text-gray-500 mr-1">الاسم الكامل</label>
                            <input
                                type="text"
                                required
                                placeholder="أدخل اسمك"
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 outline-none focus:border-accent transition-colors"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-gray-500 mr-1">رقم الهاتف</label>
                            <input
                                type="tel"
                                required
                                placeholder="05 XX XX XX XX"
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 outline-none focus:border-accent transition-colors"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            />
                        </div>
                        <button
                            type="submit"
                            className="flex items-center justify-center gap-2 w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-xl font-bold transition-all"
                        >
                            <Send size={18} />
                            <span>إرسال طلب استفسار</span>
                        </button>
                    </form>
                )}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                <p className="text-xs text-gray-400">
                    يرجى ذكر الرمز <span className="font-bold text-primary">#{propertyId.substring(propertyId.length - 6)}</span> عند الاتصال.
                </p>
            </div>
        </div>
    );
}