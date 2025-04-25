'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { MagnifyingGlassIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { useAuth } from '@/components/providers/AuthProvider';
import ProfileDropdownModal from './modals/ProfileDropdownModal';

export default function Searchbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    setIsMobileSearchOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-background">
      <div className="flex items-center gap-2 h-16 pt-10 px-8 pb-8">
        {/* Search bar - hidden on mobile, visible on md+ */}
        <div className="hidden md:block flex-1 max-w-[1200px]">
          <form onSubmit={handleSearch} className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search for pins, boards, or users"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-secondary/50 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:bg-secondary"
            />
          </form>
        </div>

        {/* Mobile search icon - visible on mobile, hidden on md+ */}
        <button
          onClick={() => setIsMobileSearchOpen(true)}
          className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl hover:bg-secondary/80 transition-colors"
          aria-label="Open search"
        >
          <MagnifyingGlassIcon className="h-5 w-5 text-muted-foreground" />
        </button>

        {/* Profile section */}
        <div className="flex items-center ml-auto">
          <Link
            href="/profile"
            className="px-2 py-1.5 rounded-xl hover:bg-secondary/80 transition-colors"
          >
            <div className="relative w-8 h-8 rounded-full overflow-hidden">
              <Image
                src={user?.photoURL || '/default-avatar.png'}
                alt={user?.displayName || 'Profile'}
                fill
                className="object-cover"
              />
            </div>
          </Link>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="p-2 rounded-full hover:bg-secondary/80 transition-colors"
            aria-label="Open profile menu"
          >
            <ChevronDownIcon className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Mobile search modal */}
      {isMobileSearchOpen && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
          <div className="fixed inset-x-0 top-0 p-4 bg-background border-b border-border">
            <form onSubmit={handleSearch} className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search for pins, boards, or users"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-secondary/50 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:bg-secondary"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setIsMobileSearchOpen(false)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      <ProfileDropdownModal 
        isOpen={isDropdownOpen} 
        onClose={() => setIsDropdownOpen(false)} 
      />
    </nav>
  );
} 