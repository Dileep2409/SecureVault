import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/mongodb';
import VaultItem from '@/models/VaultItem';

// GET all vault items for the authenticated user
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const items = await VaultItem.find({ userId: session.user.id }).sort({ updatedAt: -1 });

    return NextResponse.json({ items }, { status: 200 });
  } catch (error) {
    console.error('Get vault items error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST create a new vault item
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { encryptedData, iv } = await req.json();

    if (!encryptedData || !iv) {
      return NextResponse.json(
        { error: 'Encrypted data and IV are required' },
        { status: 400 }
      );
    }

    await dbConnect();

    const item = await VaultItem.create({
      userId: session.user.id,
      encryptedData,
      iv,
    });

    return NextResponse.json({ item }, { status: 201 });
  } catch (error) {
    console.error('Create vault item error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
