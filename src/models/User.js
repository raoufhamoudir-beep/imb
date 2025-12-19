import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'الاسم مطلوب'],
    },
    email: {
        type: String,
        required: [true, 'البريد الإلكتروني مطلوب'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'كلمة المرور مطلوبة'],
    },
    phone: {
        type: String,
        required: [true, 'رقم الهاتف مطلوب'],
    },
    role: {
        type: String,
        enum: ['client', 'investor', 'admin'],
        default: 'client',
    },
}, {
    timestamps: true,
});

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;