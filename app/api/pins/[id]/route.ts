import { NextResponse } from 'next/server';
import { getPin, deletePin, updatePin } from '@/lib/dummy-data';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const pin = getPin(params.id);

    if (!pin) {
      return NextResponse.json(
        { error: 'Pin not found' },
        { status: 404 }
      );
    }

    // Get userId from request headers or query params
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId || userId !== pin.authorId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const success = deletePin(params.id);
    if (!success) {
      return NextResponse.json(
        { error: 'Failed to delete pin' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting pin:', error);
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
    const pin = getPin(params.id);

    if (!pin) {
      return NextResponse.json(
        { error: 'Pin not found' },
        { status: 404 }
      );
    }

    // Get userId from request headers or query params
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId || userId !== pin.authorId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { title, description, imageUrl } = await request.json();

    const updatedPin = updatePin(params.id, {
      title,
      description,
      imageUrl,
    });

    if (!updatedPin) {
      return NextResponse.json(
        { error: 'Failed to update pin' },
        { status: 500 }
      );
    }

    return NextResponse.json(updatedPin);
  } catch (error) {
    console.error('Error updating pin:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const pin = getPin(params.id);

    if (!pin) {
      return NextResponse.json(
        { error: 'Pin not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(pin);
  } catch (error) {
    console.error('Error fetching pin:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 