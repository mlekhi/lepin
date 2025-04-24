import { NextResponse } from 'next/server';
import { getAllPins, getAllBoards } from '@/lib/dummy-data';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q')?.toLowerCase();

    if (!query) {
      return NextResponse.json({ error: 'Search query is required' }, { status: 400 });
    }

    // Get all pins and boards
    const allPins = getAllPins();
    const allBoards = getAllBoards();

    // Search through pins
    const matchingPins = allPins.filter(pin => {
      const titleMatch = pin.title?.toLowerCase().includes(query);
      const descriptionMatch = pin.description?.toLowerCase().includes(query);
      const authorMatch = pin.author?.name?.toLowerCase().includes(query);
      return titleMatch || descriptionMatch || authorMatch;
    });

    // Search through boards
    const matchingBoards = allBoards.filter(board => {
      const titleMatch = board.title?.toLowerCase().includes(query);
      const descriptionMatch = board.description?.toLowerCase().includes(query);
      const authorMatch = board.author?.name?.toLowerCase().includes(query);
      return titleMatch || descriptionMatch || authorMatch;
    });

    return NextResponse.json({
      pins: matchingPins,
      boards: matchingBoards
    });

  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Failed to perform search' },
      { status: 500 }
    );
  }
} 