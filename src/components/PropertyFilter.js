'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Filter, Search, X, RotateCcw, Check } from 'lucide-react';

export default function PropertyFilter() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isOpen, setIsOpen] = useState(false); // للتحكم في القائمة في الموبايل

    // الحالة الأولية للفلاتر (نقرأها من الرابط عند التحميل)
    const [filters, setFilters] = useState({
        city: '',
        type: '', // buy | rental
        propertyType: '',
        maxPrice: '',
        search: ''
    });

    // تحديث الحالة عند فتح الصفحة بناءً على الرابط الموجود
    useEffect(() => {
        setFilters({
            city: searchParams.get('city') || '',
            type: searchParams.get('type') || '',
            propertyType: searchParams.get('propertyType') || '',
            maxPrice: searchParams.get('maxPrice') || '',
            search: searchParams.get('search') || '',
        });
    }, [searchParams]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const selectType = (type) => {
        setFilters(prev => ({ ...prev, type: prev.type === type ? '' : type }));
    };

    const applyFilters = () => {
        // بناء الرابط الجديد (Query String)
        const params = new URLSearchParams();
        if (filters.city) params.set('city', filters.city);
        if (filters.type) params.set('type', filters.type);
        if (filters.propertyType) params.set('propertyType', filters.propertyType);
        if (filters.maxPrice) params.set('maxPrice', filters.maxPrice);
        if (filters.search) params.set('search', filters.search);

        // توجيه المستخدم (Scroll: false لمنع القفز لأعلى الصفحة)
        router.push(`/properties?${params.toString()}`, { scroll: false });
        setIsOpen(false); // إغلاق القائمة في الموبايل
    };

    const resetFilters = () => {
        setFilters({ city: '', type: '', propertyType: '', maxPrice: '', search: '' });
        router.push('/properties', { scroll: false });
    };

    return (
        <>
            {/* 1. زر الموبايل (يظهر فقط في الشاشات الصغيرة) */}
            <button
                onClick={() => setIsOpen(true)}
                className="lg:hidden w-full mb-6 flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-lg font-bold shadow-lg hover:bg-primary-dark transition-colors"
            >
                <Filter size={20} /> تصفية وبحث متقدم
            </button>

            {/* 2. حاوية الفلتر (Sidebar / Modal) */}
            <div className={`
        fixed inset-0 z-[50] bg-black/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden
        ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
      `} onClick={() => setIsOpen(false)}></div>

            <div className={`
        fixed inset-y-0 right-0 z-[100] zbi  w-80 bg-white shadow-2xl transform transition-transform duration-300 overflow-y-auto
        lg:translate-x-0 lg:static lg:w-full lg:shadow-sm lg:rounded-2xl lg:border lg:border-gray-100 lg:block
        ${isOpen ? 'translate-x-0 ' : 'translate-x-full'}
      `}>

                <div className="p-6 zbi">
                    {/* رأس القائمة */}
                    <div className="flex zbi justify-between items-center mb-6 border-b border-gray-100 pb-4">
                        <h3 className="text-xl font-bold text-primary flex items-center gap-2">
                            <Filter size={20} className="text-accent" />
                            تصفية النتائج
                        </h3>
                        <button onClick={() => setIsOpen(false)} className="lg:hidden text-gray-400 hover:text-red-500">
                            <X size={24} />
                        </button>
                    </div>

                    <div className="space-y-6 zbi">
                        {/* البحث النصي */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">بحث سريع</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    name="search"
                                    value={filters.search}
                                    onChange={handleChange}
                                    placeholder="ابحث عن اسم العقار..."
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 px-4 pl-10 focus:outline-none focus:border-accent transition-colors"
                                />
                                <Search className="absolute left-3 top-3.5 text-gray-400" size={18} />
                            </div>
                        </div>

                        {/* المدينة / الولاية */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">المدينة / الولاية</label>
                            <input
                                type="text"
                                name="city"
                                value={filters.city}
                                onChange={handleChange}
                                placeholder="مثال: وهران، القبة..."
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 px-4 focus:outline-none focus:border-accent transition-colors"
                            />
                        </div>

                        {/* نوع العملية (أزرار تبديل) */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">نوع العرض</label>
                            <div className="flex bg-gray-100 p-1 rounded-lg">
                                <button
                                    onClick={() => selectType('sale')}
                                    className={`flex-1 py-2 rounded-md text-sm font-bold transition-all flex items-center justify-center gap-2 ${filters.type === 'sale'
                                        ? 'bg-white text-primary shadow-sm ring-1 ring-gray-200'
                                        : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    {filters.type === 'sale' && <Check size={14} className="text-accent" />} بيع
                                </button>
                                <button
                                    onClick={() => selectType('rent')}
                                    className={`flex-1 py-2 rounded-md text-sm font-bold transition-all flex items-center justify-center gap-2 ${filters.type === 'rent'
                                        ? 'bg-white text-primary shadow-sm ring-1 ring-gray-200'
                                        : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    {filters.type === 'rent' && <Check size={14} className="text-accent" />} كراء
                                </button>
                            </div>
                        </div>

                        {/* نوع العقار */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">نوع العقار</label>
                            <select
                                name="propertyType"
                                value={filters.propertyType}
                                onChange={handleChange}
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 px-4 focus:outline-none focus:border-accent appearance-none cursor-pointer"
                            >
                                <option value="">الكل</option>
                                <option value="apartment">شقة (Appartement)</option>
                                <option value="villa">فيلا (Villa)</option>
                                <option value="studio">ستوديو (Studio)</option>
                                <option value="land">أرض (Terrain)</option>
                                <option value="commercial">محل تجاري</option>
                                <option value="level_villa">طابق فيلا</option>
                            </select>
                        </div>

                        {/* السعر */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">أقصى ميزانية (دج)</label>
                            <input
                                type="number"
                                name="maxPrice"
                                value={filters.maxPrice}
                                onChange={handleChange}
                                placeholder="مثال: 20000000"
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 px-4 focus:outline-none focus:border-accent transition-colors"
                            />
                            <p className="text-xs text-gray-400 mt-1 text-left">أتركها فارغة للبحث في كل الأسعار</p>
                        </div>

                        {/* أزرار التحكم */}
                        <div className="pt-6 border-t border-gray-100 flex flex-col gap-3">
                            <button
                                onClick={applyFilters}
                                className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-lg transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                            >
                                <Search size={18} /> عرض النتائج
                            </button>

                            <button
                                onClick={resetFilters}
                                className="w-full bg-white border border-gray-200 text-gray-500 font-bold py-3 rounded-lg hover:text-red-500 hover:border-red-200 transition-colors flex items-center justify-center gap-2"
                            >
                                <RotateCcw size={18} /> إعادة تعيين
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}