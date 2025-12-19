'use client';
import { Share2, Copy, TrendingUp, Users } from 'lucide-react';

export default function MarketingPage() {
    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-black text-primary mb-2">لوحة المسوق</h1>
                <p className="text-gray-500">اربح عمولات من خلال تسويق العقارات.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                    <TrendingUp className="text-blue-600 mb-2" size={24} />
                    <p className="text-2xl font-black text-blue-800">0 دج</p>
                    <p className="text-blue-600 text-sm">إجمالي الأرباح</p>
                </div>
                <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100">
                    <Users className="text-purple-600 mb-2" size={24} />
                    <p className="text-2xl font-black text-purple-800">0</p>
                    <p className="text-purple-600 text-sm">العملاء المحالون</p>
                </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Share2 size={20} className="text-accent" /> رابط الإحالة الخاص بك
                </h3>
                <div className="flex gap-2">
                    <input
                        type="text"
                        readOnly
                        value="https://imb.dz/?ref=YOUR_NAME"
                        className="flex-1 bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-600 text-sm"
                    />
                    <button className="bg-primary text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-primary-dark flex items-center gap-2">
                        <Copy size={16} /> نسخ
                    </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">شارك هذا الرابط واربح عمولة على كل عملية بيع تتم من خلاله.</p>
            </div>
        </div>
    );
}