import { NextResponse } from 'next/server';
import { getAuth } from 'firebase-admin/auth';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';

// Initialize Firebase Admin
if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  });
}

const adminAuth = getAuth();
const db = getFirestore();
const storage = getStorage();

export async function POST(request: Request) {
  try {
    const { idToken, title, description, imageUrl } = await request.json();
    
    if (!idToken) {
      return NextResponse.json(
        { error: 'No ID token provided' },
        { status: 401 }
      );
    }

    const decodedToken = await adminAuth.verifyIdToken(idToken);
    const userId = decodedToken.uid;

    // Create pin in Firestore
    const pinRef = await db.collection('pins').add({
      title,
      description,
      imageUrl,
      authorId: userId,
      createdAt: new Date(),
      author: {
        name: decodedToken.name || 'Anonymous',
        image: decodedToken.picture || null,
      },
    });

    const pin = await pinRef.get();

    return NextResponse.json({
      id: pin.id,
      ...pin.data(),
    });
  } catch (error) {
    console.error('Error creating pin:', error);
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

    if (!idToken) {
      return NextResponse.json(
        { error: 'No ID token provided' },
        { status: 401 }
      );
    }

    await adminAuth.verifyIdToken(idToken);

    const pinsSnapshot = await db.collection('pins')
      .orderBy('createdAt', 'desc')
      .get();
    
    const pins = pinsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(pins);
  } catch (error) {
    console.error('Error fetching pins:', error);
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
    const pinId = searchParams.get('pinId');

    if (!idToken || !pinId) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    const decodedToken = await adminAuth.verifyIdToken(idToken);
    const userId = decodedToken.uid;

    // Get the pin to check ownership
    const pinDoc = await db.collection('pins').doc(pinId).get();
    const pin = pinDoc.data();

    if (!pin) {
      return NextResponse.json(
        { error: 'Pin not found' },
        { status: 404 }
      );
    }

    if (pin.authorId !== userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }

    // Delete the image from Firebase Storage if it exists
    if (pin.imageUrl) {
      try {
        const imageRef = storage.bucket().file(pin.imageUrl);
        await imageRef.delete();
      } catch (error) {
        console.error('Error deleting image:', error);
      }
    }

    // Delete the pin from Firestore
    await db.collection('pins').doc(pinId).delete();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting pin:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 