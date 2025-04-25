import { NextResponse } from 'next/server';
import { auth, db } from '@/lib/firebase-admin';

export async function POST(request: Request) {
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

    const boardRef = await db.collection('boards').add({
      title,
      description,
      authorId: userId,
      createdAt: new Date().toISOString(),
      pins: [],
      author: {
        name: decodedToken.name || 'Anonymous',
        image: decodedToken.picture || null,
      },
    });

    const board = await boardRef.get();

    return NextResponse.json({
      id: board.id,
      ...board.data(),
    });
  } catch (error) {
    console.error('Error creating board:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const idToken = searchParams.get('idToken');
    const userId = searchParams.get('userId');

    if (!idToken) {
      return NextResponse.json(
        { error: 'No ID token provided' },
        { status: 401 }
      );
    }

    await auth.verifyIdToken(idToken);

    let boardsRef = db.collection('boards');
    
    if (userId) {
      const snapshot = await boardsRef.where('authorId', '==', userId).orderBy('createdAt', 'desc').get();
      const boards = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      console.log('Fetched boards for user:', boards);
      return NextResponse.json(boards);
    }

    const snapshot = await boardsRef.orderBy('createdAt', 'desc').get();
    const boards = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    return NextResponse.json(boards);
  } catch (error) {
    console.error('Error fetching boards:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const idToken = searchParams.get('idToken');
    const boardId = searchParams.get('boardId');

    if (!idToken || !boardId) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    const decodedToken = await auth.verifyIdToken(idToken);
    const userId = decodedToken.uid;

    // Get the board to check ownership
    const boardDoc = await db.collection('boards').doc(boardId).get();
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

    // Delete the board from Firestore
    await db.collection('boards').doc(boardId).delete();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting board:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 