'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/components/providers/AuthProvider';
import { useRouter } from 'next/navigation';

interface ProfileDropdownModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProfileDropdownModal({ isOpen, onClose }: ProfileDropdownModalProps) {
  const { signOut, user } = useAuth();
  const router = useRouter();

  if (!isOpen) return null;

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="fixed inset-0 z-50" onClick={onClose}>
      <div className="absolute right-0 top-16 w-72 bg-background/95 backdrop-blur-sm rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] animate-in fade-in slide-in-from-top-2">
        <div className="p-4 border-b border-border/50">
          <div className="flex items-center gap-3">
            <div className="relative h-12 w-12 rounded-full overflow-hidden bg-secondary">
              {user?.photoURL ? (
                <Image
                  src={user.photoURL}
                  alt={user.displayName || 'Profile'}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-lg font-medium text-foreground/50">
                  {user?.displayName?.[0] || user?.email?.[0] || '?'}
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-foreground truncate">
                {user?.displayName || 'User'}
              </h3>
              <p className="text-sm text-muted-foreground truncate">
                {user?.email || 'No email'}
              </p>
            </div>
          </div>
        </div>
        <div className="py-2">
          <Link 
            href="/profile/boards"
            className="block px-4 py-3 text-sm text-foreground hover:bg-secondary/50 transition-colors"
            onClick={onClose}
          >
            Your Boards
          </Link>
          <button
            onClick={handleSignOut}
            className="block w-full text-left px-4 py-3 text-sm text-foreground hover:bg-secondary/50 transition-colors last:rounded-b-2xl"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
} 