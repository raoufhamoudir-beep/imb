import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function PUT(request) {
    try {
        await connectDB();

        // Extract ID from URL
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        
        // Extract data from Body
        const { name, currentPassword, newPassword } = await request.json();

        if (!id) {
            return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
        }

        // 1. Find the User
        const user = await User.findById(id);

        if (!user) {
            return NextResponse.json({ message: 'المستخدم غير موجود' }, { status: 404 });
        }

        // 2. Update Name
        if (name) {
            user.name = name;
        }

        // 3. Update Password (Logic)
        if (newPassword) {
            // Check if current password is provided
            if (!currentPassword) {
                return NextResponse.json({ message: 'يجب إدخال كلمة المرور الحالية' }, { status: 400 });
            }

            // Check if current password matches DB
            const isMatch = await bcrypt.compare(currentPassword, user.password);
            if (!isMatch) {
                return NextResponse.json({ message: 'كلمة المرور الحالية غير صحيحة' }, { status: 400 });
            }

            // Hash the new password and save
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(newPassword, salt);
        }

        // 4. Save Changes
        await user.save();

        // Return updated user (excluding password)
        return NextResponse.json({
            _id: user._id,
            name: user.name,
            email: user.email,
        }, { status: 200 });

    } catch (error) {
        console.error('Update User Error:', error);
        return NextResponse.json({ message: 'فشل تحديث البيانات' }, { status: 500 });
    }
}