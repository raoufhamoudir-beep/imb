import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/db';
import User from '@/models/User';

export async function POST(request) {
    try {
        const { name, email, password, phone, role } = await request.json();

        await connectDB();

        // 1. التحقق من وجود المستخدم مسبقاً
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { message: 'البريد الإلكتروني مسجل بالفعل' },
                { status: 400 }
            );
        }

        // 2. تشفير كلمة المرور
        const hashedPassword = await bcrypt.hash(password, 10);

        // 3. إنشاء المستخدم
        await User.create({
            name,
            email,
            password: hashedPassword,
            phone,
            role: role || 'client',
        });

        return NextResponse.json({ message: 'تم إنشاء الحساب بنجاح' }, { status: 201 });

    } catch (error) {
        return NextResponse.json({ message: 'حدث خطأ في السيرفر' }, { status: 500 });
    }
}