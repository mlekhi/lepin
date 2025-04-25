import { NextResponse } from 'next/server';
import { auth, db } from '@/lib/firebase-admin';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const idToken = searchParams.get('idToken');
    const userId = searchParams.get('userId');

    console.log('API Request - userId:', userId);

    if (!idToken) {
      console.log('API Error - No ID token provided');
      return NextResponse.json(
        { error: 'No ID token provided' },
        { status: 401 }
      );
    }

    await auth.verifyIdToken(idToken);

    if (userId) {
      // Handle individual user request
      console.log('API - Fetching user document for ID:', userId);
      const userDoc = await db.collection('users').doc(userId).get();

      if (!userDoc.exists) {
        console.log('API Error - User document not found for ID:', userId);
        return NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        );
      }

      const userData = {
        id: userDoc.id,
        ...userDoc.data()
      };
      console.log('API Success - Found user data:', userData);
      return NextResponse.json(userData);
    } else {
      // Handle general users request
      const usersSnapshot = await db.collection('users').get();
      const users = usersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      return NextResponse.json(users);
    }
  } catch (error) {
    console.error('API Error - Error fetching users:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const idToken = searchParams.get('idToken');

    if (!idToken) {
      return NextResponse.json(
        { error: 'No ID token provided' },
        { status: 401 }
      );
    }

    const decodedToken = await auth.verifyIdToken(idToken);
    const userId = decodedToken.uid;
    const { username, displayName, photoURL } = await request.json();

    const userRef = db.collection('users').doc(userId);
    await userRef.set({
      username,
      displayName,
      photoURL,
      createdAt: new Date().toISOString()
    });

    return NextResponse.json({
      id: userId,
      username,
      displayName,
      photoURL
    });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 