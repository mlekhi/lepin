'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/components/providers/AuthProvider';
import PinGrid from '@/components/pins/PinGrid';
import Image from 'next/image';
import CreateBoardModal from '@/components/modals/CreateBoardModal';

interface Board {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  pins: string[];
}

export default function ProfilePage() {
  const { user } = useAuth();
  const [profilePins, setProfilePins] = useState<any[]>([]);
  const [boards, setBoards] = useState<Board[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [profileUser, setProfileUser] = useState<any>(null);
  const [isCreatingBoard, setIsCreatingBoard] = useState(false);
  const [activeTab, setActiveTab] = useState<'pins' | 'boards'>('boards');

  const fetchUserData = async () => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      console.log('Profile - Current user:', user.uid);
      
      const idToken = await user.getIdToken();
      
      // Fetch user profile data
      const userRes = await fetch(`/api/users?idToken=${idToken}&userId=${user.uid}`);
      console.log('Profile - API Response status:', userRes.status);
      
      const userData = await userRes.json();
      console.log('Profile - API Response data:', userData);
      
      if (userData.error) {
        console.error('Profile Error - API returned error:', userData.error);
        return;
      }
      
      setProfileUser(userData);
      
      // Fetch user's pins
      const pinsRes = await fetch(`/api/pins?idToken=${idToken}&userId=${user.uid}`);
      const pinsData = await pinsRes.json();
      
      if (Array.isArray(pinsData)) {
        setProfilePins(pinsData);
      } else {
        setProfilePins([]);
      }
      
      // Fetch user's boards using the board IDs from the user object
      if (userData.boards && Array.isArray(userData.boards) && userData.boards.length > 0) {
        // Fetch details for each board
        const boardPromises = userData.boards.map((boardId: string) => 
          fetch(`/api/boards/${boardId}?idToken=${idToken}`).then(res => res.json())
        );
        
        const boardsData = await Promise.all(boardPromises);
        console.log('Boards data:', boardsData);
        setBoards(boardsData.filter(board => !board.error));
      } else {
        // Fall back to fetching all user's boards if no board references exist
        const boardsRes = await fetch(`/api/boards?idToken=${idToken}&userId=${user.uid}`);
        const boardsData = await boardsRes.json();
        console.log('Boards data from fallback:', boardsData);
        
        if (Array.isArray(boardsData)) {
          setBoards(boardsData);
        } else {
          setBoards([]);
        }
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
      setBoards([]);
      setProfilePins([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [user]);

  const handleBoardCreated = (newBoard: Board) => {
    setBoards(prev => [...prev, newBoard]);
    // Re-fetch user data to get updated board references
    fetchUserData();
  };

  if (isLoading) {
    return <div></div>;
  }

  if (!profileUser) {
    return <div>User not found</div>;
  }

  return (
    <div className="max-w-[1600px] mx-auto px-8 py-8">
      <div className="flex items-center justify-between mb-12">
        <h1 className="text-4xl font-medium">Your saved ideas</h1>
        <div className="flex items-center gap-3">
          <Image
            src={profileUser.photoURL || '/default-avatar.png'}
            alt={profileUser.displayName || 'Profile'}
            width={48}
            height={48}
            className="rounded-full"
          />
          <div>
            <h2 className="font-normal">{profileUser.displayName}</h2>
            <p className="text-sm text-muted-foreground">{profileUser.following?.length || 0} following</p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex gap-8 items-center justify-between">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab('pins')}
              className={`pb-4 px-4 font-normal relative ${
                activeTab === 'pins'
                  ? 'text-foreground after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:bg-foreground after:rounded-full'
                  : 'text-muted-foreground'
              }`}
            >
              Pins
            </button>
            <button
              onClick={() => setActiveTab('boards')}
              className={`pb-4 px-4 font-normal relative ${
                activeTab === 'boards'
                  ? 'text-foreground after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:bg-foreground after:rounded-full'
                  : 'text-muted-foreground'
              }`}
            >
              Boards
            </button>
          </div>
          {activeTab === 'boards' && user?.uid === profileUser.uid && (
            <button
              onClick={() => setIsCreatingBoard(true)}
              className="w-10 h-10 flex items-center justify-center bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {activeTab === 'boards' ? (
        <>
          <CreateBoardModal
            isOpen={isCreatingBoard}
            onClose={() => setIsCreatingBoard(false)}
            onBoardCreated={handleBoardCreated}
          />

          {/* Boards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.isArray(boards) && boards.length > 0 ? (
              boards.map((board) => (
                <div
                  key={board.id}
                  className="aspect-[4/3] p-6 bg-secondary/50 rounded-xl hover:bg-secondary/80 transition-colors"
                >
                  <h3 className="font-semibold mb-2">{board.title}</h3>
                  {board.description && (
                    <p className="text-sm text-muted-foreground mb-2">{board.description}</p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    {board.pins?.length || 0} pins
                  </p>
                </div>
              ))
            ) : (
              <div
                onClick={() => setIsCreatingBoard(true)}
                className="aspect-[4/3] p-6 bg-secondary/50 rounded-xl hover:bg-secondary/80 transition-colors cursor-pointer flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-muted-foreground">
                  <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
        </>
      ) : (
        <PinGrid pins={profilePins} />
      )}
    </div>
  );
} 