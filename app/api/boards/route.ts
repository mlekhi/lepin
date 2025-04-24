import { NextResponse } from 'next/server';
import { getAuth } from 'firebase-admin/auth';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore, CollectionReference } from 'firebase-admin/firestore';

// Initialize Firebase Admin
if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

const adminAuth = getAuth();
const db = getFirestore();

export async function POST(request: Request) {
  try {
    const { idToken, title, description } = await request.json();
    
    if (!idToken) {
      return NextResponse.json(
        { error: 'No ID token provided' },
        { status: 401 }
      );
    }

    const decodedToken = await adminAuth.verifyIdToken(idToken);
    const userId = decodedToken.uid;

    const boardRef = await db.collection('boards').add({
      title,
      description,
      authorId: userId,
      createdAt: new Date(),
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

    await adminAuth.verifyIdToken(idToken);

    let query: CollectionReference = db.collection('boards');
    
    if (userId) {
      query = query.where('authorId', '==', userId) as CollectionReference;
    }

    const boardsSnapshot = await query.orderBy('createdAt', 'desc').get();
    
    const boards = boardsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
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

    const decodedToken = await adminAuth.verifyIdToken(idToken);
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