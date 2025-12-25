'use client';

import { useEffect, useState, Suspense } from 'react'; // Added Suspense
import { motion, AnimatePresence } from 'framer-motion';
import {
    MapPin, Home, DollarSign, Image as ImageIcon,
    Check, ChevronRight, ChevronLeft, Upload, X, Shield, Car, Trees, Wifi,
    Loader2,
    Target, Wallet ,Building ,Coins, Clock 
} from 'lucide-react';
import handleImageUpload from '@/utility/UploadImages';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import axios from 'axios';

// ... (SUGGESTED_FEATURES remains the same) ...


function EditeinvestmentForm() { // Renamed mainly to wrap in Suspense later
    const searchParams = useSearchParams();
    const { user } = useAuth();
    const id = searchParams.get('id');
    const router = useRouter();

    const [step, setStep] = useState(1);

    // --- Loading States ---
    const [loading, setLoading] = useState(true); // Fixed: Added loading state
    const [submitting, setSubmitting] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [err, setErr] = useState("");

    // --- Form Data ---
   const [formData, setFormData] = useState({
        // Step 1: Basic Info
        title: '',
        description: '',
        address: '',
        city: '',
        state: '',
        // Step 2: Investment Details
        projectStatus: 'planning',
        revenueModel: 'one_shot',
        projectType: 'residential_complex',
        minInvestment: '',
        totalTarget: '',
        expectedRoi: '',
        duration: '',
        user: {
            name: user?.name, // Added optional chaining safety
            id: user?.id
        },
        riskLevel: 'low',
        // Step 3: Images
        images: []
    });

    // --- THE FIXED USE EFFECT ---
    useEffect(() => {
        const fetchPropertyData = async () => {
            if (!id) return;

            setLoading(true);
            try {
                // Fetch using Axios as imported
                const res = await axios.get(`/api/oneinvestment/?id=${id}`);

                // Ensure we merge the data correctly. 
                // We spread the response data into existing form structure
                if (res.data) {
                    setFormData(prev => ({
                        ...prev,
                        ...res.data,
                        // Ensure nested objects or arrays are handled if API returns nulls
                        images: res.data.images || []
                    }));
                }
            } catch (error) {
                console.error("Error fetching properties:", error);
                setErr("فشل في تحميل بيانات العقار");
            } finally {
                setLoading(false);
            }
        };

        fetchPropertyData();
    }, [id]); // Fixed: Added id dependency

    // Control changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Toggle Featur

    // Handle File Select
    const handleFileSelect = async (e) => {
        const files = Array.from(e.target.files);
        if (!files.length) return;

        setIsUploading(true);
        setErr("");

        try {
            const uploadPromises = files.map(file => handleImageUpload(file));
            const uploadedUrls = await Promise.all(uploadPromises);
            const validUrls = uploadedUrls.filter(url => url !== null);

            setFormData(prev => ({
                ...prev,
                images: [...prev.images, ...validUrls]
            }));
        } catch (error) {
            console.error("Upload failed", error);
            setErr("حدث خطأ أثناء رفع الصور");
        } finally {
            setIsUploading(false);
            e.target.value = "";
        }
    };

    const removeImage = (index) => {
        setFormData(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
    };

    const nextStep = () => setStep(prev => Math.min(prev + 1, 3));
    const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

    // Handle Edit Submit
    const handleEdetInvestment = async () => {
        if (formData.images.length === 0) {
            setErr("يرجى إضافة صورة واحدة على الأقل");
            return;
        }

        setSubmitting(true);
        setErr("");

        try {
            // Note: Your fetch here uses /api/my-properties, but GET uses /api/property
            // Ensure this endpoint matches your backend route for updates
            const res = await fetch(`/api/my-investment?id=${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                router.push('/account/my-investment');
            } else {
                setErr(data.message || "حدث خطأ غير متوقع");
            }
        } catch (error) {
            setErr("فشل الاتصال بالخادم");
        } finally {
            setSubmitting(false);
        }
    };

    // Progress Steps Component
    const ProgressSteps = () => (
        <div className="flex justify-between items-center mb-10 relative">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -z-10 rounded-full"></div>
            <div className="absolute top-1/2 left-0 h-1 bg-accent -z-10 rounded-full transition-all duration-500" style={{ width: `${((step - 1) / 2) * 100}%` }}></div>
            {[1, 2, 3].map((num) => (
                <div key={num} className={`flex flex-col items-center gap-2 bg-gray-50 px-2`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${step >= num ? 'bg-accent text-white shadow-lg scale-110' : 'bg-gray-200 text-gray-500'}`}>
                        {num}
                    </div>
                    <span className={`text-xs font-bold ${step >= num ? 'text-primary' : 'text-gray-400'}`}>
                        {num === 1 ? 'المعلومات' : num === 2 ? 'التفاصيل' : 'الصور'}
                    </span>
                </div>
            ))}
        </div>
    );

    // --- LOADING VIEW ---
    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <Loader2 className="animate-spin text-accent mb-4" size={50} />
                <p className="text-gray-500 font-bold">جاري تحميل بيانات العقار...</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto" dir="rtl">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-black text-primary mb-2">طرح فرصة استثمارية</h1>
                <p className="text-gray-500">ابحث عن ممولين وشركاء لمشروعك العقاري القادم.</p>
            </div>

            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-10">
                <ProgressSteps />

                {err && (
                    <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-center font-bold text-sm border border-red-100">
                        {err}
                    </div>
                )}

                <form onSubmit={(e) => e.preventDefault()}>
                    <AnimatePresence mode="wait">
                        {/* ---------------- STEP 1: Basic Info ---------------- */}
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">اسم المشروع</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        placeholder="مثال: مشروع البرج السكني"
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
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">المدينة / البلدية</label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleChange}
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
                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pl-10 focus:outline-none focus:border-accent"
                                        />
                                        <MapPin className="absolute left-3 top-3.5 text-gray-400" size={20} />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">وصف المشروع</label>
                                    <textarea
                                        rows="5"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-accent resize-none"
                                    ></textarea>
                                </div>
                            </motion.div>
                        )}

                        {/* ---------------- STEP 2: Investment Specifics ---------------- */}
                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8"
                            >
                                {/* Revenue Model */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-3">نوع العائد</label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, revenueModel: 'one_shot' })}
                                            className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${formData.revenueModel === 'one_shot'
                                                ? 'bg-accent/10 border-accent'
                                                : 'bg-white border-gray-200'
                                                }`}
                                        >
                                            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${formData.revenueModel === 'one_shot' ? 'bg-accent text-white' : 'bg-gray-100 text-gray-500'}`}>
                                                <Target size={24} />
                                            </div>
                                            <div className="text-right">
                                                <h4 className="font-bold text-gray-800">عائد رأسمالي (One Shot)</h4>
                                                <p className="text-xs text-gray-500">بيع المشروع وتوزيع الأرباح مرة واحدة.</p>
                                            </div>
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, revenueModel: 'stable' })}
                                            className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${formData.revenueModel === 'stable'
                                                ? 'bg-green-50 border-green-500'
                                                : 'bg-white border-gray-200'
                                                }`}
                                        >
                                            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${formData.revenueModel === 'stable' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
                                                <Wallet size={24} />
                                            </div>
                                            <div className="text-right">
                                                <h4 className="font-bold text-gray-800">دخل مستمر (Stable)</h4>
                                                <p className="text-xs text-gray-500">عوائد إيجار دورية.</p>
                                            </div>
                                        </button>
                                    </div>
                                </div>

                                {/* Project Type & Duration */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">نوع المشروع</label>
                                        <div className="relative">
                                            <select
                                                name="projectType"
                                                value={formData.projectType}
                                                onChange={handleChange}
                                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pl-10 focus:outline-none focus:border-accent appearance-none"
                                            >
                                                <option value="residential_complex">مجمع سكني</option>
                                                <option value="mall">مركز تجاري</option>
                                                <option value="office_building">مبنى مكاتب</option>
                                                <option value="land_development">تهيئة أراضي</option>
                                                <option value="industrial">مشروع صناعي</option>
                                            </select>
                                            <Building className="absolute left-3 top-3.5 text-gray-400" size={18} />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">المدة (أشهر)</label>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                name="duration"
                                                value={formData.duration}
                                                onChange={handleChange}
                                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pl-10 focus:outline-none focus:border-accent"
                                            />
                                            <Clock className="absolute left-3 top-3.5 text-gray-400" size={18} />
                                        </div>
                                    </div>
                                </div>

                                {/* Financials */}
                                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
                                    <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                                        <Coins size={20} className="text-accent" /> البيانات المالية
                                    </h4>
                                    <div className="grid md:grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 mb-1">أقل مبلغ (دج)</label>
                                            <input type="number" name="minInvestment" value={formData.minInvestment} onChange={handleChange} className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 font-bold focus:border-accent outline-none" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 mb-1">المبلغ المطلوب (دج)</label>
                                            <input type="number" name="totalTarget" value={formData.totalTarget} onChange={handleChange} className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 font-bold focus:border-accent outline-none" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 mb-1">العائد (%)</label>
                                            <div className="relative">
                                                <input type="number" name="expectedRoi" value={formData.expectedRoi} onChange={handleChange} className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 font-bold focus:border-accent outline-none pl-8" />
                                                <span className="absolute left-3 top-2 text-gray-400 font-bold">%</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Risk Level - ADDED HERE */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-3">تقييم درجة المخاطرة</label>
                                    <div className="flex gap-4">
                                        {['low', 'medium', 'high'].map((risk) => (
                                            <button
                                                key={risk}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, riskLevel: risk })}
                                                className={`flex-1 py-3 rounded-xl font-bold border-2 transition-all flex flex-col items-center gap-1 ${formData.riskLevel === risk
                                                    ? (risk === 'low' ? 'border-green-500 bg-green-50 text-green-700' : risk === 'medium' ? 'border-yellow-500 bg-yellow-50 text-yellow-700' : 'border-red-500 bg-red-50 text-red-700')
                                                    : 'border-transparent bg-gray-100 text-gray-400 grayscale'
                                                    }`}
                                            >
                                                {risk === 'low' ? 'منخفضة' : risk === 'medium' ? 'متوسطة' : 'عالية'}
                                                <div className="flex gap-0.5">
                                                    <div className={`w-2 h-2 rounded-full ${risk === 'low' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                                    <div className={`w-2 h-2 rounded-full ${risk === 'medium' || risk === 'high' ? (risk === 'medium' ? 'bg-yellow-500' : 'bg-red-500') : 'bg-gray-300'}`}></div>
                                                    <div className={`w-2 h-2 rounded-full ${risk === 'high' ? 'bg-red-500' : 'bg-gray-300'}`}></div>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* ---------------- STEP 3: Images ---------------- */}
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
                                onClick={handleEdetInvestment}
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


export default function Editeinvestment() {
    return (
        <Suspense fallback={<div className="flex justify-center items-center h-screen"><Loader2 className="animate-spin" /></div>}>
            <EditeinvestmentForm />
        </Suspense>
    );
}