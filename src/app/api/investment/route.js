import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache'; // استيراد دالة تحديث الكاش
import connectDB from '@/lib/db';
import Investment from '@/models/Investment';

// ... دالة GET التي كتبتها سابقاً تبقى كما هي ...
export async function GET(request) {
    try {
        await connectDB();
        const properties = await Investment.find().sort({ createdAt: -1 }).limit(6); // الأحدث أولاً
        return NextResponse.json(properties, { status: 200 });
    } catch (error) {
        console.error('Database Error:', error);
        return NextResponse.json({ message: 'Error fetching properties' }, { status: 500 });
    }
}

// دالة POST لإنشاء عقار جديد
export async function POST(request) {
    try {
        await connectDB();

        // 1. استقبال البيانات من الـ Frontend
        const body = await request.json();

        // 2. إنشاء العقار في قاعدة البيانات
        // Mongoose سيقوم بالتحقق من البيانات بناءً على الـ Schema تلقائياً
        const newProperty = await Investment.create(body);

        // 3. (مهم جداً) مسح الكاش القديم
        // هذا يجبر Next.js على جلب القائمة الجديدة فوراً في الصفحة الرئيسية وصفحة العقارات
        revalidateTag('Investment-list');

        return NextResponse.json(
            { message: 'تم إنشاء العقار بنجاح', data: newProperty },
            { status: 201 }
        );

    } catch (error) {
        console.error('Create Investment Error:', error);
        return NextResponse.json(
            { message: 'فشل إنشاء العقار', error: error.message },
            { status: 500 }
        );
    }
}

export async function DELETE(request) {
    try {
        await connectDB();

        // استخراج الـ ID من معلمات الرابط (URL Parameters)
        // مثال: /api/investments?id=123
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ message: 'يجب توفير معرف العقار' }, { status: 400 });
        }

        const deletedProperty = await Investment.findByIdAndDelete(id);

        if (!deletedProperty) {
            return NextResponse.json({ message: 'العقار غير موجود' }, { status: 404 });
        }

        // مسح الكاش لإزالة العقار من القوائم المعروضة فوراً
        revalidateTag('properties-list');

        return NextResponse.json(
            { message: 'تم حذف العقار بنجاح' },
            { status: 200 }
        );

    } catch (error) {
        console.error('Delete Investment Error:', error);
        return NextResponse.json(
            { message: 'فشل حذف العقار', error: error.message },
            { status: 500 }
        );
    }
}