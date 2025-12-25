import connectDB from '@/lib/db';
import Investment from '@/models/Investment';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { notFound } from 'next/navigation';
import PropertyGallery from '@/components/PropertyGallery';
import { 
  TrendingUp, Clock, Wallet, Shield, MapPin, 
  FileText, CheckCircle2, AlertTriangle, Building, 
  Target, Phone, MessageCircle, Download
} from 'lucide-react';
import Link from 'next/link';

// ---------------------------------------------------------
// 1. Configuration & SEO
// ---------------------------------------------------------
export const revalidate = 3600; // Update every hour
export const dynamicParams = true;

export async function generateStaticParams() {
  await connectDB();
  const investments = await Investment.find({}, '_id').limit(20).lean();
  return investments.map((inv) => ({ id: inv._id.toString() }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const investment = await getInvestment(id);
  if (!investment) return { title: 'فرصة غير موجودة' };
  
  return {
    title: `${investment.title} | استثمار IMB`,
    description: investment.description?.substring(0, 160),
    openGraph: { images: investment.images?.[0] || [] },
  };
}

// ---------------------------------------------------------
// 2. Data Fetching
// ---------------------------------------------------------
async function getInvestment(id) {
  try {
    await connectDB();
    const investment = await Investment.findById(id).lean();
    if (!investment) return null;
    return {
      ...investment,
      _id: investment._id.toString(),
      createdAt: investment.createdAt?.toString(),
      updatedAt: investment.updatedAt?.toString(),
      // Ensure currentPhase exists (Default to 1 if missing)
      currentPhase: investment.currentPhase || 1, 
    };
  } catch (error) { return null; }
}

const formatMoney = (amount) => {
  if (!amount) return '---';
  return new Intl.NumberFormat('ar-DZ').format(amount) + ' دج';
};

// ---------------------------------------------------------
// 3. UI Helper Components
// ---------------------------------------------------------
const RiskBadge = ({ level }) => {
  const styles = {
    low: { bg: 'bg-green-100', text: 'text-green-700', label: 'مخاطرة منخفضة', icon: Shield },
    medium: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'مخاطرة متوسطة', icon: AlertTriangle },
    high: { bg: 'bg-red-100', text: 'text-red-700', label: 'مخاطرة عالية', icon: TrendingUp },
  };
  const current = styles[level] || styles.medium;
  const Icon = current.icon;

  return (
    <div className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm ${current.bg} ${current.text}`}>
      <Icon size={16} />
      {current.label}
    </div>
  );
};

// ---------------------------------------------------------
// 4. Main Page Component
// ---------------------------------------------------------
export default async function InvestmentDetailsPage({ params }) {
  const { id } = await params;
  const investment = await getInvestment(id);

  if (!investment) notFound();

  // Calculation for progress bar (Mock logic or real if you have `collectedAmount`)
  // Assuming totalTarget is present.
  const collectedAmount = investment.collectedAmount || (investment.totalTarget * 0.35); // Example: 35% default
  const progressPercentage = Math.min(100, Math.round((collectedAmount / investment.totalTarget) * 100));

  // Definition of Phases for the Dynamic Timeline
  const phases = [
    {
      id: 1,
      title: 'دراسة الجدوى والاستحواذ',
      date: 'جانفي 2024',
      description: 'تم الانتهاء من دراسة الأرض قانونياً وتقنياً وشراء العقار رسمياً.'
    },
    {
      id: 2,
      title: 'التراخيص والمخططات',
      date: 'مارس 2024',
      description: 'الحصول على رخصة البناء واعتماد المخططات الهندسية من المصالح التقنية.'
    },
    {
      id: 3,
      title: 'الأشغال الكبرى (Gros Œuvre)',
      date: 'جوان 2025',
      description: 'الانتهاء من الأساسات والأعمدة الخرسانية للطابق الأرضي والأول.'
    },
    {
      id: 4,
      title: 'التشطيبات النهائية',
      date: 'ديسمبر 2025',
      description: 'أعمال الطلاء، الترصيص، والكهرباء وتجهيز الوحدات للتسليم.'
    },
    {
      id: 5,
      title: 'التسليم وتوزيع الأرباح',
      date: 'مارس 2026',
      description: 'بيع الوحدات/تأجيرها وتوزيع العوائد المالية على المستثمرين.'
    }
  ];

  const currentPhase = investment.currentPhase; 

  return (
    <main className="min-h-screen bg-gray-50">
      
      {/* --- HEADER --- */}

      {/* --- HERO SECTION --- */}
      <div className="bg-[#1b3d4e] text-white pt-32 pb-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        
        <div className="container mx-auto px-6 relative z-10">
            {/* Breadcrumb & Badges */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
                <span className="bg-white/10 px-3 py-1 rounded text-xs text-gray-300">فرص استثمارية</span>
                <span className="text-gray-500">/</span>
                <span className="text-accent">{investment.city}</span>
                <div className="mr-auto">
                    <RiskBadge level={investment.riskLevel} />
                </div>
            </div>

            <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
                <div className="max-w-3xl">
                    <h1 className="text-3xl md:text-5xl font-black leading-tight mb-4">
                        {investment.title}
                    </h1>
                    <p className="text-gray-300 text-lg flex items-center gap-2">
                        <MapPin size={20} className="text-accent" />
                        {investment.address || `${investment.city}, ${investment.state}`}
                    </p>
                </div>
                
                {/* Key Metrics Cards (Overlapping) */}
                <div className="hidden lg:flex gap-4">
                    <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 text-center min-w-[140px]">
                        <p className="text-gray-300 text-xs mb-1">العائد المتوقع (ROI)</p>
                        <p className="text-3xl font-black text-green-400">{investment.expectedRoi}%</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 text-center min-w-[140px]">
                        <p className="text-gray-300 text-xs mb-1">مدة الاستثمار</p>
                        <p className="text-3xl font-black text-white">{investment.duration} <span className="text-sm font-normal">شهر</span></p>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="container mx-auto px-6 py-8 -mt-16 relative z-20">
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* --- LEFT COLUMN (CONTENT) --- */}
            <div className="lg:col-span-2 space-y-8">
                
                {/* Gallery */}
                <div className="bg-white p-2 rounded-2xl shadow-sm">
                   <PropertyGallery images={investment.images} title={investment.title} />
                </div>

                {/* Mobile Metrics (Visible only on mobile) */}
                <div className="grid grid-cols-2 gap-4 lg:hidden">
                    <div className="bg-white p-4 rounded-xl shadow-sm text-center border-t-4 border-green-500">
                        <p className="text-gray-500 text-xs">العائد المتوقع</p>
                        <p className="text-2xl font-black text-gray-800">{investment.expectedRoi}%</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm text-center border-t-4 border-blue-500">
                        <p className="text-gray-500 text-xs">المدة</p>
                        <p className="text-2xl font-black text-gray-800">{investment.duration} شهر</p>
                    </div>
                </div>

                {/* About Project */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                    <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
                        <FileText className="text-accent" /> تفاصيل المشروع
                    </h2>
                    <div className="prose max-w-none text-gray-600 leading-8 whitespace-pre-line text-lg">
                        {investment.description}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 pt-8 border-t border-gray-100">
                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                            <Building className="text-gray-400" />
                            <div>
                                <p className="text-xs text-gray-500 font-bold">نوع المشروع</p>
                                <p className="font-bold text-primary">
                                    {investment.projectType === 'residential_complex' ? 'مجمع سكني' : 
                                     investment.projectType === 'mall' ? 'مركز تجاري' : 'مشروع عقاري'}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                            <Target className="text-gray-400" />
                            <div>
                                <p className="text-xs text-gray-500 font-bold">نوع العائد</p>
                                <p className="font-bold text-primary">
                                    {investment.revenueModel === 'one_shot' ? 'أرباح بيع (رأس مال)' : 'دخل إيجاري (دوري)'}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                            <CheckCircle2 className="text-gray-400" />
                            <div>
                                <p className="text-xs text-gray-500 font-bold">حالة المشروع</p>
                                <p className="font-bold text-primary">
                                    {investment.projectStatus === 'land' ? 'أرض خام' : 
                                     investment.projectStatus === 'planning' ? 'قيد التخطيط' : 'قيد الإنشاء'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- DYNAMIC TIMELINE --- */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                    <h2 className="text-2xl font-bold text-primary mb-8 flex items-center gap-2">
                        <Clock className="text-accent" /> مراحل إنجاز المشروع
                    </h2>
                    
                    <div className="relative border-r-2 border-gray-100 mr-3 space-y-10">
                        
                        {phases.map((phase) => {
                            const isCompleted = phase.id < currentPhase;
                            const isActive = phase.id === currentPhase;
                            const isPending = phase.id > currentPhase;

                            return (
                                <div key={phase.id} className={`relative mr-8 ${isPending ? 'opacity-50' : ''}`}>
                                    
                                    {/* Icon Indicator */}
                                    <div className={`absolute -right-[41px] top-0 w-6 h-6 rounded-full border-4 border-white shadow-sm flex items-center justify-center z-10 
                                        ${isCompleted ? 'bg-green-500' : isActive ? 'bg-accent' : 'bg-gray-200'}`}>
                                        
                                        {isActive && (
                                            <div className="absolute w-full h-full bg-accent rounded-full animate-ping opacity-75 -z-10"></div>
                                        )}
                                        {isCompleted && <CheckCircle2 size={12} className="text-white" />}
                                    </div>

                                    {/* Content Card (If Active, style differently) */}
                                    {isActive ? (
                                        <div className="bg-accent/5 p-4 rounded-xl border border-accent/20">
                                            <div className="flex justify-between items-start mb-1">
                                                <h4 className="font-bold text-accent text-lg">{phase.title}</h4>
                                                <span className="bg-accent text-white text-xs px-2 py-1 rounded font-bold animate-pulse">جارية الآن</span>
                                            </div>
                                            <p className="text-gray-500 text-sm mb-2 font-medium">{phase.date}</p>
                                            <p className="text-gray-700">{phase.description}</p>
                                        </div>
                                    ) : (
                                        <div>
                                            <h4 className={`font-bold text-lg ${isCompleted ? 'text-gray-800' : 'text-gray-600'}`}>
                                                {phase.title}
                                            </h4>
                                            <p className="text-gray-400 text-sm mb-2">{phase.date}</p>
                                            <p className="text-gray-600">{phase.description}</p>
                                        </div>
                                    )}
                                </div>
                            );
                        })}

                    </div>
                </div>

            </div>

            {/* --- RIGHT COLUMN (STICKY SIDEBAR) --- */}
            <aside className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                    
                    {/* Investment Card */}
                    <div className="bg-white p-6 rounded-2xl shadow-lg border-t-4 border-accent">
                        <h3 className="text-xl font-bold text-primary mb-6">ملخص التمويل</h3>
                        
                        

                        <div className="bg-gray-50 p-4 rounded-xl mb-6 text-center">
                            <p className="text-gray-500 text-xs mb-1">أقل مبلغ للمشاركة</p>
                            <p className="text-2xl font-black text-primary">{formatMoney(investment.minInvestment)}</p>
                        </div>

                        <div className="space-y-3">
                            <a 
                                href={`https://wa.me/213555000000?text=${encodeURIComponent(`مرحباً، أنا مهتم بالاستثمار في مشروع: ${investment.title} (ID: ${investment._id})`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl"
                            >
                                <MessageCircle size={22} />
                                <span>استثمر الآن عبر واتساب</span>
                            </a>
                            <button className="w-full flex items-center justify-center gap-2 bg-white border-2 border-primary text-primary hover:bg-gray-50 py-3 rounded-xl font-bold transition-all">
                                <Phone size={20} />
                                <span>طلب موعد في المكتب</span>
                            </button>
                        </div>

                        <div className="mt-6 pt-6 border-t border-gray-100 text-center text-xs text-gray-400">
                            هذا الاستثمار يخضع لقوانين الترقية العقارية الجزائرية. <Link href="/terms" className="underline hover:text-accent">الشروط والأحكام</Link>.
                        </div>
                    </div>

                    {/* Quick Info Box */}
                    <div className="bg-[#1b3d4e] text-white p-6 rounded-2xl shadow-md">
                        <div className="flex items-start gap-4">
                            <div className="bg-white/10 p-3 rounded-full">
                                <Shield className="text-accent" size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold mb-1">استثمار آمن</h4>
                                <p className="text-sm text-gray-300 leading-relaxed">
                                    يتم إدارة هذا المشروع من قبل فريق IMB ويخضع لتدقيق مالي دوري.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </aside>

        </div>
      </div>
          </main>
  );
}