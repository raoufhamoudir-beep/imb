import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
    title: String,
    description: String,
    address: String,
    city: String,
    state: String, // الولاية
    // Step 2
    type: String, // sale | rent
    propertyType: String, // apartment, villa...
    price: Number,
    area: Number,
    rooms: Number,
    bathrooms: Number,
    features: [], // Array to store selected features
    // Step 3
    images: [],
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
const Property = mongoose.models.Property || mongoose.model('Property', propertySchema);

export default Property;