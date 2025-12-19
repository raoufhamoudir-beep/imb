import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache'; // استيراد دالة تحديث الكاش
import connectDB from '@/lib/db';
import Property from '@/models/Property';

// ... دالة GET التي كتبتها سابقاً تبقى كما هي ...
export async function GET(request) {
    try {
        await connectDB();
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ message: 'يجب توفير معرف العقار' }, { status: 400 });
        }

        const properties = await Property.findById(id)
        return NextResponse.json(properties, { status: 200 });
    } catch (error) {
        console.error('Database Error:', error);
        return NextResponse.json({ message: 'Error fetching properties' }, { status: 500 });
    }
}

