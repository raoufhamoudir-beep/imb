import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import connectDB from '@/lib/db';
import User from '@/models/User';

export async function POST(request) {
    try {
        const { email, password } = await request.json();

        await connectDB();

        // 1. البحث عن المستخدم
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: 'بيانات الدخول غير صحيحة' }, { status: 400 });
        }

        // 2. التحقق من كلمة المرور
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json({ message: 'بيانات الدخول غير صحيحة' }, { status: 400 });
        }
 
        // 3. إنشاء التوكن (JWT)
        const secret = process.env.JWT_SECRET;
        const token = jwt.sign(
            { userId: user._id, email: user.email, role: user.role, name: user.name },
            secret,
            { expiresIn: '7d' } // صالح لمدة 7 أيام
        );

        // 4. تعيين الكوكيز (HttpOnly Cookies)
        const cookieStore = await cookies();
        cookieStore.set('token', token, {
            httpOnly: true, // لا يمكن الوصول إليه عبر JavaScript (حماية من XSS)
            secure: process.env.NODE_ENV === 'production', // يعمل فقط على HTTPS في الإنتاج
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 7, // 7 أيام
            path: '/',
        });     
        return NextResponse.json({
            message: 'تم تسجيل الدخول بنجاح',
            user: { id: user._id, name: user.name, email: user.email, role: user.role }
        });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'حدث خطأ في السيرفر' }, { status: 500 });
    }
}