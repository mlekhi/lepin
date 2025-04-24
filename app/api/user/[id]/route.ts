import { NextResponse } from 'next/server';
import { getUser, getUserBoards, getUserPins } from '@/lib/dummy-data';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = getUser(params.id);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const userBoards = getUserBoards(params.id);
    const userPins = getUserPins(params.id);

    return NextResponse.json({
      ...user,
      boards: userBoards,
      pins: userPins,
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 