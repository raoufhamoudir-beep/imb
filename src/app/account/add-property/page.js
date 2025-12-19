'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    MapPin, Home, DollarSign, Image as ImageIcon,
    Check, ChevronRight, ChevronLeft, Upload, X, Shield, Car, Trees, Wifi,
    Loader2
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import handleImageUpload from '@/utility/UploadImages';
import { useRouter } from 'next/navigation'; // Added useRouter

// قائمة الميزات المقترحة (يمكنك زيادتها)
const SUGGESTED_FEATURES = [
    { id: 'garage', label: 'مرآب سيارات', icon: <Car size={16} /> },
    { id: 'garden', label: 'حديقة خاصة', icon: <Trees size={16} /> },
    { id: 'security', label: 'حي آمن / حراسة', icon: <Shield size={16} /> },
    { id: 'internet', label: 'إنترنت ألياف بصرية', icon: <Wifi size={16} /> },
    { id: 'central_heating', label: 'تدفئة مركزية', icon: <Check size={16} /> },
    { id: 'ac', label: 'مكيف هواء', icon: <Check size={16} /> },
    { id: 'elevator', label: 'مصعد', icon: <Check size={16} /> },
    { id: 'near_mosque', label: 'قريب من المسجد', icon: <Check size={16} /> },
    { id: 'near_school', label: 'قريب من المدارس', icon: <Check size={16} /> },
    { id: 'sea_view', label: 'إطلالة على البحر', icon: <Check size={16} /> },
];

export default function AddPropertyPage() {
    const { user } = useAuth();
    const [step, setStep] = useState(1);
    const router = useRouter();
    // Loading states
    const [submitting, setSubmitting] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [err, setErr] = useState("");

    // الحالة العامة للبيانات
    const [formData, setFormData] = useState({
        // Step 1
        title: '',
        user: {
            name: user.name,
            id: user.id
        },
        description: '',
        address: '',
        city: '',
        state: '', // الولاية
        // Step 2
        type: 'sale', // sale | rent
        propertyType: 'apartment', // apartment, villa...
        price: '',
        area: '',
        rooms: 3,
        bathrooms: 1,
        features: [], // Array to store selected features
        // Step 3
        images: [] // To store File objects
    });

    // التحكم في التغييرات
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // التحكم في اختيار الميزات (Toggle)
    const toggleFeature = (featureId) => {
        setFormData(prev => {
            const exists = prev.features.includes(featureId);
            if (exists) {
                return { ...prev, features: prev.features.filter(f => f !== featureId) };
            } else {
                return { ...prev, features: [...prev.features, featureId] };
            }
        });
    };

    // التحكم في رفع الصور (معاينة فقط)
    const handleFileSelect = async (e) => {
        const files = Array.from(e.target.files);
        if (!files.length) return;

        setIsUploading(true);
        setErr("");

        try {
            // Upload all selected files in parallel
            const uploadPromises = files.map(file => handleImageUpload(file));
            const uploadedUrls = await Promise.all(uploadPromises);

            // Filter out any nulls if an upload failed silently
            const validUrls = uploadedUrls.filter(url => url !== null);

            setFormData(prev => ({
                ...prev,
                images: [...prev.images, ...validUrls]
            }));

        } catch (error) {
            console.error("Upload failed", error);
            setErr("حدث خطأ أثناء رفع الصور، يرجى المحاولة مرة أخرى.");
        } finally {
            setIsUploading(false);
            e.target.value = ""; // Reset input
        }
    };

    const removeImage = (index) => {
        setFormData(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
    };

    // التنقل بين الخطوات
    const nextStep = () => setStep(prev => Math.min(prev + 1, 3));
    const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

    const handlePostInvestment = async () => {
        if (formData.images.length === 0) {
            setErr("يرجى إضافة صورة واحدة على الأقل");
            return;
        }

        setSubmitting(true);
        setErr("");

        try {
            const res = await fetch('/api/properties', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                router.push('/account/my-properties');
            } else {
                setErr(data.message || "حدث خطأ غير متوقع");
            }
        } catch (error) {
            setErr("فشل الاتصال بالخادم");
        } finally {
            setSubmitting(false);
        }
    };

    // شريط التقدم
    const ProgressSteps = () => (
        <div className="flex justify-between items-center mb-10 relative">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -z-10 rounded-full"></div>
            <div className="absolute top-1/2 left-0 h-1 bg-accent -z-10 rounded-full transition-all duration-500" style={{ width: `${((step - 1) / 2) * 100}%` }}></div>

            {[1, 2, 3].map((num) => (
                <div key={num} className={`flex flex-col items-center gap-2 bg-gray-50 px-2`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${step >= num ? 'bg-accent text-white shadow-lg scale-110' : 'bg-gray-200 text-gray-500'
                        }`}>
                        {num}
                    </div>
                    <span className={`text-xs font-bold ${step >= num ? 'text-primary' : 'text-gray-400'}`}>
                        {num === 1 ? 'المعلومات' : num === 2 ? 'التفاصيل' : 'الصور'}
                    </span>
                </div>
            ))}
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-black text-primary mb-2">نشر عقار جديد</h1>
                <p className="text-gray-500">قم بملء البيانات التالية لعرض عقارك أمام آلاف المشترين.</p>
            </div>

            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-10">
                <ProgressSteps />

                <form onSubmit={(e) => e.preventDefault()}>
                    <AnimatePresence mode="wait">

                        {/* ---------------- STEP 1: Location & Basic Info ---------------- */}
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">عنوان الإعلان</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        placeholder="مثال: شقة فاخرة F4 في وهران واجهة بحرية"
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-accent transition-all"
                                    />
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">الولاية</label>
                                        <select
                                            name="state"
                                            value={formData.state}
                                            onChange={handleChange}
                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-accent"
                                        >
                                            <option value="">اختر الولاية</option>
                                            <option value="Algiers">الجزائر العاصمة</option>
                                            <option value="Oran">وهران</option>
                                            <option value="Setif">سطيف</option>
                                            {/* باقي الولايات */}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">المدينة / البلدية</label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleChange}
                                            placeholder="مثال: بئر الجير"
                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-accent"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">العنوان الدقيق</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            placeholder="الحي، رقم الشارع..."
                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pl-10 focus:outline-none focus:border-accent"
                                        />
                                        <MapPin className="absolute left-3 top-3.5 text-gray-400" size={20} />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">وصف العقار</label>
                                    <textarea
                                        rows="5"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        placeholder="اكتب وصفاً جذاباً ومفصلاً للعقار..."
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-accent resize-none"
                                    ></textarea>
                                </div>
                            </motion.div>
                        )}

                        {/* ---------------- STEP 2: Details, Price & Features ---------------- */}
                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8"
                            >
                                {/* Type Selection */}
                                <div className="grid grid-cols-2 gap-4 bg-gray-50 p-2 rounded-xl">
                                    {['sale', 'rent'].map((t) => (
                                        <button
                                            key={t}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, type: t })}
                                            className={`py-3 rounded-lg font-bold transition-all flex items-center justify-center gap-2 ${formData.type === t ? 'bg-white text-accent shadow-md' : 'text-gray-500 hover:text-gray-700'
                                                }`}
                                        >
                                            {t === 'sale' ? 'بيع' : 'كراء'}
                                            {formData.type === t && <Check size={16} />}
                                        </button>
                                    ))}
                                </div>

                                {/* Price & Property Type */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">السعر (دج)</label>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                name="price"
                                                value={formData.price}
                                                onChange={handleChange}
                                                placeholder="مثال: 15000000"
                                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pl-10 focus:outline-none focus:border-accent"
                                            />
                                            <DollarSign className="absolute left-3 top-3.5 text-gray-400" size={18} />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">نوع العقار</label>
                                        <select
                                            name="propertyType"
                                            value={formData.propertyType}
                                            onChange={handleChange}
                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-accent"
                                        >
                                            <option value="apartment">شقة (Appartement)</option>
                                            <option value="villa">فيلا (Villa)</option>
                                            <option value="studio">ستوديو</option>
                                            <option value="land">أرض (Terrain)</option>
                                            <option value="commercial">محل تجاري</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Rooms & Area */}
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 mb-1">الغرف</label>
                                        <input type="number" name="rooms" value={formData.rooms} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-center font-bold focus:border-accent outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 mb-1">الحمامات</label>
                                        <input type="number" name="bathrooms" value={formData.bathrooms} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-center font-bold focus:border-accent outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 mb-1">المساحة (م²)</label>
                                        <input type="number" name="area" value={formData.area} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-center font-bold focus:border-accent outline-none" />
                                    </div>
                                </div>

                                {/* Features Selection */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-3">الميزات الإضافية (اختر ما ينطبق)</label>
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                        {SUGGESTED_FEATURES.map((feat) => {
                                            const isSelected = formData.features.includes(feat.label);
                                            return (
                                                <button
                                                    key={feat.id}
                                                    type="button"
                                                    onClick={() => toggleFeature(feat.label)}
                                                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-bold border transition-all ${isSelected
                                                        ? 'bg-accent/10 border-accent text-accent'
                                                        : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300'
                                                        }`}
                                                >
                                                    {feat.icon}
                                                    {feat.label}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* ---------------- STEP 3: Images Upload ---------------- */}
                        {step === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <div className={`border-2 border-dashed rounded-2xl p-10 text-center transition-colors relative ${isUploading ? 'bg-gray-50 border-accent' : 'border-gray-300 hover:bg-gray-50'}`}>

                                    {isUploading ? (
                                        <div className="flex flex-col items-center justify-center py-4">
                                            <Loader2 className="animate-spin text-accent mb-2" size={40} />
                                            <p className="text-gray-500 font-bold">جاري رفع الصور...</p>
                                        </div>
                                    ) : (
                                        <>
                                            <input
                                                type="file"
                                                multiple
                                                accept="image/*"
                                                onChange={handleFileSelect}
                                                disabled={isUploading}
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                                            />
                                            <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <Upload size={32} />
                                            </div>
                                            <h3 className="text-lg font-bold text-gray-700">اضغط لرفع الصور</h3>
                                            <p className="text-gray-500 text-sm mt-1">يفضل رفع صور 3D للمشروع</p>
                                        </>
                                    )}
                                </div>

                                {/* Previews */}
                                {formData.images.length > 0 && (
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {formData.images.map((src, idx) => (
                                            <div key={idx} className="relative aspect-square rounded-xl overflow-hidden shadow-sm group border border-gray-100">
                                                <img src={src} alt="Preview" className="w-full h-full object-cover" />
                                                <button
                                                    type="button"
                                                    onClick={() => removeImage(idx)}
                                                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                                                >
                                                    <X size={16} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        )}

                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-10 pt-6 border-t border-gray-100">
                        {step > 1 ? (
                            <button
                                type="button"
                                onClick={prevStep}
                                disabled={submitting || isUploading}
                                className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-50"
                            >
                                <ChevronRight size={20} /> السابق
                            </button>
                        ) : <div></div>}

                        {step < 3 ? (
                            <button
                                type="button"
                                onClick={nextStep}
                                disabled={isUploading}
                                className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                التالي <ChevronLeft size={20} />
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={handlePostInvestment}
                                disabled={submitting || isUploading}
                                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {submitting ? <Loader2 className="animate-spin" /> : <Check size={20} />}
                                <span>{submitting ? 'جاري النشر...' : 'طرح الفرصة'}</span>
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}