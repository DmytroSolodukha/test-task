import { NextResponse } from 'next/server';
import { getUser } from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = getUser(params.id);
    
    if (!user) {
      return new NextResponse('User not found', { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error reading user:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 