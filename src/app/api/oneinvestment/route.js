import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Investment from '@/models/Investment';

// ... دالة GET التي كتبتها سابقاً تبقى كما...
export async function GET(request) {
    try {
        await connectDB();
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ message: 'يجب توفير معرف العقار' }, { status: 400 });
        }

        const properties = await Investment.findById(id)
        return NextResponse.json(properties, { status: 200 });
    } catch (error) {
        console.error('Database Error:', error);
        return NextResponse.json({ message: 'Error fetching properties' }, { status: 500 });
    }
}

