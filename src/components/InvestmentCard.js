'use client';
import Link from 'next/link';
import Image from 'next/image';
import { TrendingUp, Users, AlertTriangle, Target, Clock, MapPin } from 'lucide-react';

export default function InvestmentCard({ investment }) {
    
    // تحديد لون المخاطرة
    const riskColors = {
        low: 'bg-green-100 text-green-700 border-green-200',
        medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
        high: 'bg-red-100 text-red-700 border-red-200'
    };

    const riskLabel = {
        low: 'مخاطرة منخفضة',
        medium: 'مخاطرة متوسطة',
        high: 'مخاطرة عالية'
    };

    // تنسيق الأرقام
    const formatMoney = (amount) => {
        return new Intl.NumberFormat('ar-DZ').format(amount) + ' دج';
    };

    return (
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full group">
            
            {/* Image Header */}
            <div className="relative h-48 w-full overflow-hidden">
                <Image 
                    src={investment.images?.[0] || '/images/placeholder-invest.jpg'} 
                    alt={investment.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3 right-3 z-10">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${riskColors[investment.riskLevel] || riskColors.medium}`}>
                        {riskLabel[investment.riskLevel] || 'مخاطرة متوسطة'}
                    </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <h3 className="text-white font-bold text-lg truncate">{investment.title}</h3>
                    <div className="flex items-center gap-1 text-gray-300 text-xs">
                        <MapPin size={12} />
                        {investment.city}، {investment.state}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-1">
                
                {/* ROI & Duration */}
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                    <div className="text-center">
                        <p className="text-xs text-gray-500 mb-1">العائد المتوقع</p>
                        <p className="text-xl font-black text-green-600 flex items-center gap-1">
                            <TrendingUp size={16} /> {investment.expectedRoi}%
                        </p>
                    </div>
                    <div className="h-8 w-[1px] bg-gray-100"></div>
                    <div className="text-center">
                        <p className="text-xs text-gray-500 mb-1">مدة المشروع</p>
                        <p className="text-lg font-bold text-gray-800 flex items-center gap-1">
                            <Clock size={16} className="text-accent" /> {investment.duration} شهر
                        </p>
                    </div>
                </div>

                {/* Financial Details */}
                <div className="space-y-3 mb-6 flex-1">
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500 flex items-center gap-2"><Target size={16} /> الهدف الإجمالي:</span>
                        <span className="font-bold text-gray-800">{formatMoney(investment.totalTarget)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500 flex items-center gap-2"><Users size={16} /> أقل مساهمة:</span>
                        <span className="font-bold text-primary">{formatMoney(investment.minInvestment)}</span>
                    </div>
                </div>

                {/* Progress Bar (Visual Only for now) */}
                {/* <div className="mb-4">
                    <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-500">اكتمال التمويل</span>
                        <span className="text-accent font-bold">0%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-accent w-0"></div>
                    </div>
                </div> */}

                {/* Action */}
                <Link 
                    href={`/investment/${investment._id}`}
                    className="w-full block text-center bg-primary hover:bg-primary-dark text-white py-3 rounded-xl font-bold transition-colors"
                >
                    عرض التفاصيل
                </Link>
            </div>
        </div>
    );
}