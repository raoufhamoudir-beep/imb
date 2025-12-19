import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export async function GET() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('token');

        if (!token) {
            return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
        }

        const secret = process.env.JWT_SECRET;
        const decoded = jwt.verify(token.value, secret);

        return NextResponse.json({
            user: { id: decoded.userId, name: decoded.name, email: decoded.email, role: decoded.role }
        });

    } catch (error) {
        return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }
}