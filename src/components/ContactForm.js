'use client';

import { useState } from 'react';
import { Send, CheckCircle2, Loader2 } from 'lucide-react';

export default function ContactForm() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // محاكاة إرسال البيانات للسيرفر
        await new Promise(resolve => setTimeout(resolve, 2000));

        // هنا يمكنك استدعاء API حقيقي
        // await fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) });

        setLoading(false);
        setSuccess(true);
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100 relative overflow-hidden">
            {/* زخرفة خلفية */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-bl-full -z-0"></div>

            <div className="relative z-10">
                <h3 className="text-2xl font-black text-primary mb-2">أرسل لنا رسالة</h3>
                <p className="text-gray-500 mb-8">املأ النموذج أدناه وسيقوم فريقنا بالرد عليك في أقرب وقت ممكن.</p>

                {success ? (
                    <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center animate-in fade-in zoom-in duration-300">
                        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle2 size={32} />
                        </div>
                        <h4 className="text-xl font-bold text-green-800 mb-2">تم الإرسال بنجاح!</h4>
                        <p className="text-green-600 mb-6">شكراً لتواصلك معنا، سنتصل بك قريباً.</p>
                        <button
                            onClick={() => setSuccess(false)}
                            className="text-green-700 font-bold hover:underline"
                        >
                            إرسال رسالة أخرى
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid md:grid-cols-2 gap-5">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-600">الاسم الكامل</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="محمد بن عبد الله"
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-600">رقم الهاتف</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    required
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="05 XX XX XX XX"
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-600">البريد الإلكتروني</label>
                            <input
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="email@example.com"
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-600">الموضوع</label>
                            <select
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                            >
                                <option value="">اختر موضوع الرسالة</option>
                                <option value="buy">استفسار عن شراء عقار</option>
                                <option value="invest">استفسار عن استثمار</option>
                                <option value="complaint">شكوى أو اقتراح</option>
                                <option value="other">أخرى</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-600">الرسالة</label>
                            <textarea
                                name="message"
                                required
                                value={formData.message}
                                onChange={handleChange}
                                rows="4"
                                placeholder="اكتب تفاصيل استفسارك هنا..."
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all resize-none"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? <Loader2 className="animate-spin" /> : <Send size={20} />}
                            <span>{loading ? 'جاري الإرسال...' : 'إرسال الرسالة'}</span>
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}