import connectDB from '@/lib/db';
import Investment from '@/models/Investment';
import InvestmentCard from '@/components/InvestmentCard';
import { SearchX } from 'lucide-react';

// لجعل الصفحة ديناميكية (تتحدث مع كل طلب)
export const dynamic = 'force-dynamic';

async function getInvestments() {
  try {
    await connectDB();
    const investments = await Investment.find().sort({ createdAt: -1 }).lean();
    
    // تحويل البيانات لتناسب React (Serialization)
    return investments.map(doc => ({
      ...doc,
      _id: doc._id.toString(),
      createdAt: doc.createdAt?.toString(),
      updatedAt: doc.updatedAt?.toString(),
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function InvestmentPage() {
  const investments = await getInvestments();

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-[#1b3d4e] pt-32 pb-16 px-6 text-center text-white relative overflow-hidden">
        {/* Decorative Circles */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="container mx-auto relative z-10">
            <span className="text-accent font-bold tracking-widest uppercase text-sm mb-4 inline-block bg-white/5 px-4 py-1 rounded-full border border-white/10">
                فرص حصرية
            </span>
            <h1 className="text-3xl md:text-5xl font-black mb-6">
                استثمر في مستقبل <br/> <span className="text-accent">العقار الجزائري</span>
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">
                اكتشف مشاريع عقارية واعدة، شارك في التمويل، وحقق عوائد استثمارية ممتازة مع ضمانات قانونية كاملة.
            </p>
        </div>
      </div>

      {/* Investments Grid */}
      <div className="container mx-auto px-6 py-16">
        
        {/* Filters Header (Simple) */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
            <h2 className="text-2xl font-bold text-gray-800">أحدث الفرص المتاحة</h2>
            {/* يمكن إضافة فلاتر هنا لاحقاً */}
        </div>

        {investments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {investments.map((invest) => (
                    <InvestmentCard key={invest._id} investment={invest} />
                ))}
            </div>
        ) : (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-400">
                    <SearchX size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-800">لا توجد فرص متاحة حالياً</h3>
                <p className="text-gray-500 mt-2 max-w-md text-center">
                    نحن نعمل على تجهيز مشاريع جديدة. يرجى العودة لاحقاً أو التواصل معنا لتنبيهك عند توفر فرص جديدة.
                </p>
            </div>
        )}
      </div>
      
      {/* Trust Section */}
      <div className="bg-white py-16 border-t border-gray-100">
         <div className="container mx-auto px-6 text-center">
             <p className="text-gray-500 mb-8">لماذا تستثمر مع IMB؟</p>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 <div className="p-4">
                     <h3 className="font-bold text-lg mb-2">عوائد مدروسة</h3>
                     <p className="text-sm text-gray-500">نحلل السوق بدقة لضمان أفضل عائد ممكن لرأس مالك.</p>
                 </div>
                 <div className="p-4">
                     <h3 className="font-bold text-lg mb-2">شفافية كاملة</h3>
                     <p className="text-sm text-gray-500">تتبع تقدم المشروع ومصاريفه لحظة بلحظة عبر لوحة التحكم.</p>
                 </div>
                 <div className="p-4">
                     <h3 className="font-bold text-lg mb-2">أصول حقيقية</h3>
                     <p className="text-sm text-gray-500">استثمارك مدعوم بأصول عقارية ملموسة وموثقة قانونياً.</p>
                 </div>
             </div>
         </div>
      </div>
    </main>
  );
}