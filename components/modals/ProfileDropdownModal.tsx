'use client';

import Link from 'next/link';
import { useAuth } from '@/components/providers/AuthProvider';
import { useRouter } from 'next/navigation';

interface ProfileDropdownModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProfileDropdownModal({ isOpen, onClose }: ProfileDropdownModalProps) {
  const { signOut } = useAuth();
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
      <div className="absolute right-0 top-16 w-48 bg-background rounded-lg shadow-lg border border-border">
        <div className="py-1">
          <Link 
            href="/profile/boards"
            className="block px-4 py-2 text-sm text-foreground hover:bg-secondary"
            onClick={onClose}
          >
            Your Boards
          </Link>
          <Link 
            href="/settings"
            className="block px-4 py-2 text-sm text-foreground hover:bg-secondary"
            onClick={onClose}
          >
            Settings
          </Link>
          <button
            onClick={handleSignOut}
            className="block w-full text-left px-4 py-2 text-sm text-foreground hover:bg-secondary"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
} 