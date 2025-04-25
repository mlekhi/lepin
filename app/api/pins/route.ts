import { NextResponse } from 'next/server';
import { auth, db, storage } from '@/lib/firebase-admin';

export async function GET() {
  try {
    const pinsRef = db.collection('pins');
    const snapshot = await pinsRef.get();
    const pins = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return NextResponse.json(pins);
  } catch (error) {
    console.error('Error fetching pins:', error);
    return NextResponse.json({ error: 'Failed to fetch pins' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { title, description, imageUrl, authorId } = await request.json();

    const pinRef = await db.collection('pins').add({
      title,
      description,
      imageUrl,
      authorId,
      createdAt: new Date().toISOString(),
    });

    const pin = await pinRef.get();

    return NextResponse.json({
      id: pin.id,
      ...pin.data()
    });
  } catch (error) {
    console.error('Error creating pin:', error);
    return NextResponse.json({ error: 'Failed to create pin' }, { status: 500 });
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