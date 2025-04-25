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
  const router = useRouter();
  const { user } = useAuth();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  return (
    <nav className="sticky top-0 z-50 bg-background">
      <div className="flex items-center gap-2 h-16 pt-10 px-8 pb-8">
        {/* Search bar */}
        <div className="flex-1 max-w-[1200px]">
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

        {/* Profile section */}
        <div className="flex items-center">
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

      <ProfileDropdownModal 
        isOpen={isDropdownOpen} 
        onClose={() => setIsDropdownOpen(false)} 
      />
    </nav>
  );
} 