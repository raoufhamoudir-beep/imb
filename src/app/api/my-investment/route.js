import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Investment from '@/models/Investment';
import { revalidateTag } from 'next/cache';

export async function GET(request) {
    try {
        await connectDB();

        // Extract ID from URL
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
        }

        // Search directly in DB for properties belonging to this user
        // Assuming your schema saves user like: user: { id: "...", name: "..." }
        const myProperties = await Investment.find({ 'user.id': id }).sort({ createdAt: -1 });

        return NextResponse.json(myProperties, { status: 200 });
    } catch (error) {
        console.error('Database Error:', error);
        return NextResponse.json({ message: 'Error fetching properties' }, { status: 500 });
    }
}


export async function PUT(request) {
    try {
        await connectDB();

        // Extract ID from URL
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        const body = await request.json();

        if (!id) {
            return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
        }

        // Search directly in DB for properties belonging to this user
        // Assuming your schema saves user like: user: { id: "...", name: "..." }
        revalidateTag('Investment-list');

        const myProperties = await Investment.findByIdAndUpdate(id, body).sort({ createdAt: -1 });

        return NextResponse.json(myProperties, { status: 200 });
    } catch (error) {
        console.error('Database Error:', error);
        return NextResponse.json({ message: 'Error fetching properties' }, { status: 500 });
    }
}