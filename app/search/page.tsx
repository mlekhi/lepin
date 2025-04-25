'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Searchbar from '@/components/Searchbar';
import SideNav from '@/components/SideNav';
import PinGrid from '@/components/pins/PinGrid';
import BoardGrid from '@/components/boards/BoardGrid';
import { useEffect, useState } from 'react';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<{ pins: any[]; boards: any[]; }>({ pins: [], boards: [] });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchResults() {
      if (!query) {
        setResults({ pins: [], boards: [] });
        return;
      }

      setIsLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        if (!res.ok) throw new Error('Failed to fetch search results');
        const data = await res.json();
        setResults(data);
      } catch (error) {
        console.error('Search error:', error);
        setResults({ pins: [], boards: [] });
      } finally {
        setIsLoading(false);
      }
    }

    fetchResults();
  }, [query]);

  return (
    <>
      <SideNav />
      <Searchbar />
      <div className="min-h-screen bg-background pl-20">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
              <h1 className="text-2xl font-bold text-foreground mb-4 text-center">Search</h1>
                {!query && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">
                      Start typing to search for pins and boards
                    </p>
                  </div>
                )}
          </div>
        </div>
      </div>
    </>
  );
} 