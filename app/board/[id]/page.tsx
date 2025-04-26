'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/components/providers/AuthProvider';
import Image from 'next/image';
import PinGrid from '@/components/pins/PinGrid';
import { useRouter } from 'next/navigation';

interface Pin {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  authorId: string;
  createdAt: string;
  author?: {
    name: string;
    image: string | null;
  };
}

interface Board {
  id: string;
  title: string;
  description: string;
  authorId: string;
  createdAt: string;
  pins: string[];
  author: {
    name: string;
    image: string | null;
  };
}

export default function BoardPage({ params }: { params: { id: string } }) {
  const { user } = useAuth();
  const router = useRouter();
  const [board, setBoard] = useState<Board | null>(null);
  const [boardPins, setBoardPins] = useState<Pin[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBoardData = async () => {
      if (!user) return;

      try {
        setIsLoading(true);
        const idToken = await user.getIdToken();
        
        // Fetch board data
        const boardRes = await fetch(`/api/boards/${params.id}?idToken=${idToken}`);
        
        if (!boardRes.ok) {
          if (boardRes.status === 404) {
            setError('Board not found');
          } else {
            setError('Failed to load board');
          }
          setIsLoading(false);
          return;
        }
        
        const boardData = await boardRes.json();
        setBoard(boardData);
        
        // If the board has pins, fetch their details
        if (boardData.pins && boardData.pins.length > 0) {
          // For now, we'll fetch all pins and filter
          // In a real app, you'd want a dedicated endpoint for this
          const pinsRes = await fetch(`/api/pins?idToken=${idToken}`);
          const allPins = await pinsRes.json();
          
          // Filter pins that belong to this board
          const relevantPins = allPins.filter((pin: Pin) => 
            boardData.pins.includes(pin.id)
          );
          
          setBoardPins(relevantPins);
        }
      } catch (error) {
        console.error('Error fetching board data:', error);
        setError('An error occurred while loading the board');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBoardData();
  }, [user, params.id]);

  if (isLoading) {
    return (
      <div className="max-w-[1600px] mx-auto px-8 py-12 flex justify-center">
        <div className="animate-pulse">Loading board...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-[1600px] mx-auto px-8 py-12">
        <div className="bg-destructive/10 text-destructive p-6 rounded-xl">
          <h2 className="text-xl font-medium mb-2">Error</h2>
          <p>{error}</p>
          <button 
            className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-full"
            onClick={() => router.back()}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!board) {
    return (
      <div className="max-w-[1600px] mx-auto px-8 py-12">
        <div className="bg-secondary/50 p-6 rounded-xl">
          <h2 className="text-xl font-medium mb-2">Board not found</h2>
          <p>The board you're looking for doesn't exist or you don't have permission to view it.</p>
          <button 
            className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-full"
            onClick={() => router.back()}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1600px] mx-auto px-8 py-12">
      <div className="mb-8">
        <div className="mb-6">
          <h1 className="text-3xl font-medium mb-2">{board.title}</h1>
          {board.description && (
            <p className="text-muted-foreground mb-4">{board.description}</p>
          )}
          
          {/* Profile info moved below description - only showing profile picture */}
          <div className="mb-6">
            <Image
              src={board.author?.image || '/default-avatar.png'}
              alt="Board Creator"
              width={32}
              height={32}
              className="rounded-full"
            />
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-medium">{boardPins.length} pins</h2>
          {user && board.authorId === user.uid && (
            <button className="w-10 h-10 flex items-center justify-center bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
              </svg>
            </button>
          )}
        </div>
      </div>
      
      {/* Display pins */}
      {boardPins.length > 0 ? (
        <PinGrid pins={boardPins} />
      ) : (
        <div className="w-full py-12 flex flex-col items-center justify-center bg-secondary/20 rounded-xl">
          <p className="text-muted-foreground mb-4">No pins in this board yet</p>
          {user && board.authorId === user.uid && (
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors">
              Add your first pin
            </button>
          )}
        </div>
      )}
    </div>
  );
} 