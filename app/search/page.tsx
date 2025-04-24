import { Suspense } from 'react';
import { Pin, Board } from '@/lib/dummy-data';
import PinGrid from '@/components/pins/PinGrid';
import BoardGrid from '@/components/boards/BoardGrid';

async function getSearchResults(query: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/search?q=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error('Failed to fetch search results');
  return res.json();
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  const query = searchParams.q;
  
  if (!query) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Please enter a search term</h1>
      </div>
    );
  }

  const { pins, boards } = await getSearchResults(query);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Search results for "{query}"</h1>
      
      {/* Boards Section */}
      {boards.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Boards</h2>
          <Suspense fallback={<div>Loading boards...</div>}>
            <BoardGrid boards={boards} />
          </Suspense>
        </div>
      )}

      {/* Pins Section */}
      {pins.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Pins</h2>
          <Suspense fallback={<div>Loading pins...</div>}>
            <PinGrid pins={pins} />
          </Suspense>
        </div>
      )}

      {/* No Results */}
      {pins.length === 0 && boards.length === 0 && (
        <p className="text-gray-600 dark:text-gray-400">
          No results found for "{query}". Try a different search term.
        </p>
      )}
    </div>
  );
} 