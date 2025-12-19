import mongoose from 'mongoose';

const InvestmentSchema = new mongoose.Schema({
    title: String,
    description: String,
    address: String,
    city: String,
    state: String, // الولاية
    images: [], // يمكنك تحديدها كـ [String] لتعريف أدق
    projectStatus: String,
    revenueModel: String,
    projectType: String,
    minInvestment: String, // أقل مبلغ للدخول
    totalTarget: String, // المبلغ الإجمالي المطلوب
    expectedRoi: String, // نسبة الربح المتوقعة
    duration: String, // مدة المشروع
    riskLevel: String, // low, medium, high
    user: {
        name: String,
        id: String
    }
}, {
    timestamps: true
});

// الإصلاح الهام هنا:
// 1. نتحقق هل الموديل معرف مسبقاً في mongoose.models لتجنب الخطأ أثناء التطوير
// 2. نستخدم اسم 'Property' (مفرد وبحرف كبير) كمعيار قياسي
const Investment = mongoose.models.Investment || mongoose.model('Investment', InvestmentSchema);

export default Investment;