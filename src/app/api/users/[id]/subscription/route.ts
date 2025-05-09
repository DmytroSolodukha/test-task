import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { User } from '@/types';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { plan } = await request.json();
    const filePath = path.join(process.cwd(), 'db.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(fileContents);

    const userIndex = data.users.findIndex((user: User) => user.id === params.id);
    if (userIndex === -1) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    data.users[userIndex].plan = plan;
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));

    return NextResponse.json(data.users[userIndex]);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update subscription' },
      { status: 500 }
    );
  }
} 