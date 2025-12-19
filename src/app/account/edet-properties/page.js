'use client';

import { useEffect, useState, Suspense } from 'react'; // Added Suspense
import { motion, AnimatePresence } from 'framer-motion';
import {
    MapPin, Home, DollarSign, Image as ImageIcon,
    Check, ChevronRight, ChevronLeft, Upload, X, Shield, Car, Trees, Wifi,
    Loader2
} from 'lucide-react';
import handleImageUpload from '@/utility/UploadImages';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import axios from 'axios';

// ... (SUGGESTED_FEATURES remains the same) ...
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

function EditPropertyForm() { // Renamed mainly to wrap in Suspense later
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
        title: '',
        user: {
            name: user?.name || '', // Fixed: Safe access
            id: user?.id || ''
        },
        description: '',
        address: '',
        city: '',
        state: '',
        type: 'sale',
        propertyType: 'apartment',
        price: '',
        area: '',
        rooms: 3,
        bathrooms: 1,
        features: [],
        images: []
    });

    // --- THE FIXED USE EFFECT ---
    useEffect(() => {
        const fetchPropertyData = async () => {
            if (!id) return;

            setLoading(true);
            try {
                // Fetch using Axios as imported
                const res = await axios.get(`/api/property/?id=${id}`);

                // Ensure we merge the data correctly. 
                // We spread the response data into existing form structure
                if (res.data) {
                    setFormData(prev => ({
                        ...prev,
                        ...res.data,
                        // Ensure nested objects or arrays are handled if API returns nulls
                        features: res.data.features || [],
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

    // Toggle Features
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
    const handleEdetproperties = async () => {
        if (formData.images.length === 0) {
            setErr("يرجى إضافة صورة واحدة على الأقل");
            return;
        }

        setSubmitting(true);
        setErr("");

        try {
            // Note: Your fetch here uses /api/my-properties, but GET uses /api/property
            // Ensure this endpoint matches your backend route for updates
            const res = await fetch(`/api/my-properties?id=${id}`, {
                method: 'PUT',
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
        <div className="max-w-4xl mx-auto">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-black text-primary mb-2">تعديل العقار</h1>
                <p className="text-gray-500">قم بتحديث بيانات عقارك.</p>
            </div>

            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-10">
                <ProgressSteps />

                <form onSubmit={(e) => e.preventDefault()}>
                    {/* Show Global Error if any */}
                    {err && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-center font-bold border border-red-100">
                            {err}
                        </div>
                    )}

                    <AnimatePresence mode="wait">
                        {/* STEP 1 */}
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
                                        placeholder="مثال: شقة فاخرة F4"
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-accent transition-all"
                                    />
                                </div>
                                {/* ... Rest of Step 1 ... */}
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
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">المدينة / البلدية</label>
                                        <input type="text" name="city" value={formData.city} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-accent" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">العنوان الدقيق</label>
                                    <div className="relative">
                                        <input type="text" name="address" value={formData.address} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pl-10 focus:outline-none focus:border-accent" />
                                        <MapPin className="absolute left-3 top-3.5 text-gray-400" size={20} />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">وصف العقار</label>
                                    <textarea rows="5" name="description" value={formData.description} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-accent resize-none"></textarea>
                                </div>
                            </motion.div>
                        )}

                        {/* STEP 2 */}
                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8"
                            >
                                <div className="grid grid-cols-2 gap-4 bg-gray-50 p-2 rounded-xl">
                                    {['sale', 'rent'].map((t) => (
                                        <button key={t} type="button" onClick={() => setFormData({ ...formData, type: t })} className={`py-3 rounded-lg font-bold transition-all flex items-center justify-center gap-2 ${formData.type === t ? 'bg-white text-accent shadow-md' : 'text-gray-500 hover:text-gray-700'}`}>
                                            {t === 'sale' ? 'بيع' : 'كراء'}
                                            {formData.type === t && <Check size={16} />}
                                        </button>
                                    ))}
                                </div>
                                {/* ... Rest of fields from Step 2 (Price, Area, etc.) ... */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">السعر (دج)</label>
                                        <input type="number" name="price" value={formData.price} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">نوع العقار</label>
                                        <select name="propertyType" value={formData.propertyType} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
                                            <option value="apartment">شقة</option>
                                            <option value="villa">فيلا</option>
                                            <option value="studio">ستوديو</option>
                                            <option value="land">أرض</option>
                                            <option value="commercial">محل تجاري</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 mb-1">الغرف</label>
                                        <input type="number" name="rooms" value={formData.rooms} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-center" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 mb-1">الحمامات</label>
                                        <input type="number" name="bathrooms" value={formData.bathrooms} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-center" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 mb-1">المساحة</label>
                                        <input type="number" name="area" value={formData.area} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-center" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-3">الميزات الإضافية</label>
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                        {SUGGESTED_FEATURES.map((feat) => {
                                            const isSelected = formData.features.includes(feat.label);
                                            return (
                                                <button key={feat.id} type="button" onClick={() => toggleFeature(feat.label)} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-bold border transition-all ${isSelected ? 'bg-accent/10 border-accent text-accent' : 'bg-white border-gray-200 text-gray-500'}`}>
                                                    {feat.icon} {feat.label}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* STEP 3 */}
                        {step === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <div className={`border-2 border-dashed rounded-2xl p-10 text-center relative ${isUploading ? 'bg-gray-50 border-accent' : 'border-gray-300 hover:bg-gray-50'}`}>
                                    {isUploading ? (
                                        <div className="flex flex-col items-center justify-center py-4">
                                            <Loader2 className="animate-spin text-accent mb-2" size={40} />
                                            <p className="text-gray-500 font-bold">جاري رفع الصور...</p>
                                        </div>
                                    ) : (
                                        <>
                                            <input type="file" multiple accept="image/*" onChange={handleFileSelect} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                                            <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4"><Upload size={32} /></div>
                                            <h3 className="text-lg font-bold text-gray-700">اضغط لرفع الصور</h3>
                                        </>
                                    )}
                                </div>
                                {formData.images.length > 0 && (
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {formData.images.map((src, idx) => (
                                            <div key={idx} className="relative aspect-square rounded-xl overflow-hidden shadow-sm group border border-gray-100">
                                                <img src={src} alt="Preview" className="w-full h-full object-cover" />
                                                <button type="button" onClick={() => removeImage(idx)} className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"><X size={16} /></button>
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
                            <button type="button" onClick={prevStep} disabled={submitting || isUploading} className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-50">
                                <ChevronRight size={20} /> السابق
                            </button>
                        ) : <div></div>}

                        {step < 3 ? (
                            <button type="button" onClick={nextStep} disabled={isUploading} className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl disabled:opacity-50">
                                التالي <ChevronLeft size={20} />
                            </button>
                        ) : (
                            <button type="button" onClick={handleEdetproperties} disabled={submitting || isUploading} className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl disabled:opacity-70">
                                {submitting ? <Loader2 className="animate-spin" /> : <Check size={20} />}
                                <span>{submitting ? 'جاري التعديل...' : 'حفظ التعديلات'}</span>
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}

// WRAPPER: Required because we use useSearchParams()
export default function EditPropertyPage() {
    return (
        <Suspense fallback={<div className="flex justify-center items-center h-screen"><Loader2 className="animate-spin" /></div>}>
            <EditPropertyForm />
        </Suspense>
    );
}