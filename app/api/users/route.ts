import { NextResponse } from 'next/server';
import { auth, db } from '@/lib/firebase-admin';

export async function POST(request: Request) {
  try {
    const { idToken } = await request.json();

    if (!idToken) {
      return NextResponse.json(
        { error: 'No ID token provided' },
        { status: 401 }
      );
    }

    const decodedToken = await auth.verifyIdToken(idToken);
    const userId = decodedToken.uid;

    // Check if user already exists
    const userDoc = await db.collection('users').doc(userId).get();
    
    if (userDoc.exists) {
      return NextResponse.json({
        id: userId,
        ...userDoc.data()
      });
    }

    // Create new user document
    const userData = {
      uid: userId,
      email: decodedToken.email,
      displayName: decodedToken.name,
      photoURL: decodedToken.picture,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      boards: [],
      followers: [],
      following: []
    };

    await db.collection('users').doc(userId).set(userData);

    return NextResponse.json(userData);
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const idToken = searchParams.get('idToken');

    if (!idToken) {
      return NextResponse.json(
        { error: 'No ID token provided' },
        { status: 401 }
      );
    }

    await auth.verifyIdToken(idToken);

    if (!userId) {
      return NextResponse.json(
        { error: 'No user ID provided' },
        { status: 400 }
      );
    }

    const userDoc = await db.collection('users').doc(userId).get();

    if (!userDoc.exists) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      id: userDoc.id,
      ...userDoc.data()
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 