import { NextResponse } from 'next/server';
import { auth, db } from '@/lib/firebase-admin';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const idToken = searchParams.get('idToken');

    if (!idToken) {
      return NextResponse.json(
        { error: 'No ID token provided' },
        { status: 401 }
      );
    }

    await auth.verifyIdToken(idToken);
    
    const boardDoc = await db.collection('boards').doc(params.id).get();
    
    if (!boardDoc.exists) {
      return NextResponse.json(
        { error: 'Board not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      id: boardDoc.id,
      ...boardDoc.data()
    });
  } catch (error) {
    console.error('Error fetching board:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { idToken, title, description } = await request.json();
    
    if (!idToken) {
      return NextResponse.json(
        { error: 'No ID token provided' },
        { status: 401 }
      );
    }
    
    const decodedToken = await auth.verifyIdToken(idToken);
    const userId = decodedToken.uid;
    
    // Get the board to check ownership
    const boardRef = db.collection('boards').doc(params.id);
    const boardDoc = await boardRef.get();
    const board = boardDoc.data();
    
    if (!board) {
      return NextResponse.json(
        { error: 'Board not found' },
        { status: 404 }
      );
    }
    
    if (board.authorId !== userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }
    
    // Update board details
    await boardRef.update({
      title,
      description,
      updatedAt: new Date().toISOString()
    });
    
    // Get updated board
    const updatedBoardDoc = await boardRef.get();
    
    return NextResponse.json({
      id: updatedBoardDoc.id,
      ...updatedBoardDoc.data()
    });
  } catch (error) {
    console.error('Error updating board:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 