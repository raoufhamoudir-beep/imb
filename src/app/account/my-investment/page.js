'use client';
import Link from 'next/link';
import { PlusCircle, Home, Edit, Trash2, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Myinvestment() {
    const { user } = useAuth();
    const [investment, setinvestment] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch Properties
    useEffect(() => {
        const getMyinvestment = async () => {
            if (!user?.id) return; // Wait for user to be loaded

            try {
                const res = await axios.get(`/api/my-investment/?id=${user.id}`);
                setinvestment(res.data);
            } catch (error) {
                console.error("Error fetching investment:", error);
            } finally {
                setLoading(false);
            }
        };

        getMyinvestment(); 
    }, [user]);

    // Delete Property Function
    const handleDelete = async (id) => {
        if (!confirm("هل أنت متأكد من حذف هذا العقار؟")) return;

        try {
            await axios.delete(`/api/investment?id=${id}`);
            // Remove from UI immediately
            setinvestment(prev => prev.filter(p => p._id !== id));
        } catch (error) {
            alert("حدث خطأ أثناء الحذف");
        }
    };

    

    // Helper to format date
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('ar-DZ', {
            year: 'numeric', month: 'long', day: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="animate-spin text-primary" size={40} />
            </div>
        );
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-black text-primary mb-2">عروضي الاستتمارية</h1>
                    <p className="text-gray-500">إدارة عروضي الاستتمارية التي قمت بنشرها.</p>
                </div>
                <Link
                    href="/account/add-investment"
                    className="bg-accent hover:bg-accent-hover text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 text-sm"
                >
                    <PlusCircle size={18} /> إضافة فرصة استتمارية 
                </Link>
            </div>

            {investment.length > 0 ? (
                <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-100">
                    <table className="w-full text-right border-collapse">
                        <thead>
                            <tr className="bg-gray-50 text-gray-600 text-sm">
                                <th className="p-4 rounded-r-xl">الاستتمار</th>
                                <th className="p-4">تاريخ النشر</th>
                                <th className="p-4">اقل سعر للانضمام</th>
                                <th className="p-4">الحالة</th>
                                <th className="p-4 rounded-l-xl">إجراءات</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {investment.map((prop) => (
                                <tr key={prop._id} className="group hover:bg-gray-50 transition-colors">
                                    <td className="p-4 font-bold text-gray-800">{prop.title}</td>

                                    <td className="p-4 text-gray-500">
                                        {formatDate(prop.createdAt)}
                                    </td>

                                    <td className="p-4 text-accent font-bold">
                                        {Number(prop.minInvestment).toLocaleString()} دج
                                    </td>

                                    <td className="p-4">
                                        {/* Assuming your DB doesn't have status yet, I put a default */}
                                        <span className="px-2 py-1 rounded-full text-xs font-bold bg-green-100 text-green-600">
                                            منشور
                                        </span>
                                    </td>

                                    <td className="p-4 flex gap-2">
                                        <Link
                                            href={`/account/edet-investment/?id=${prop._id}`}
                                            className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg" title="تعديل">
                                            <Edit size={18} />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(prop._id)}
                                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                                            title="حذف"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                    <div className="w-16 h-16 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Home size={32} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">لم تقم بإضافة أي عروضي الاستتمارية بعد</h3>
                    <p className="text-gray-500 mb-6">ابدأ الآن واعرض عروضي الاستتمارية أمام آلاف المشترين.</p>
                    <Link
                        href="/account/add-investment"
                        className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary-dark transition-colors"
                    >
                        <PlusCircle size={20} /> إضافة أول فرصة استتمارية
                    </Link>
                </div>
            )}
        </div>
    );
}