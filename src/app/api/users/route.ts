import { NextResponse } from 'next/server';
import { readDB } from '@/lib/db';

export async function GET() {
  try {
    const db = readDB();
    return NextResponse.json(db.users);
  } catch (error) {
    console.error('Error reading users:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 