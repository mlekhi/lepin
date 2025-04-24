'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MagnifyingGlassIcon, PlusIcon, BellIcon, ChatBubbleLeftIcon, UserCircleIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { useAuth } from '@/components/providers/AuthProvider';
import Image from 'next/image';

export default function Searchbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  const { user, signOut } = useAuth();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleSignOut = async () => {
    setIsDropdownOpen(false);
    await signOut();
    router.push('/');
  };

  return (
    <nav className="bg-white dark:bg-black h-16">
      <div className="h-full flex items-center justify-between max-w-[1200px] mx-auto px-4">
        {/* Left section - empty for spacing */}
        <div className="w-10"></div>

        {/* Center section - search form */}
        <form onSubmit={handleSearch} className="flex-1 max-w-[800px] px-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
            </div>
            <input
              type="text"
              className="block w-full pl-11 pr-4 py-3 bg-[#e9e9e9] dark:bg-gray-800 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white text-gray-900 dark:text-gray-100 placeholder-gray-600 dark:placeholder-gray-400"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>

        {/* Right section - profile buttons */}
        <div className="flex items-center gap-2">
          {/* Profile picture button */}
          <Link 
            href={`/profile/${user?.uid}`}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {user?.photoURL ? (
              <Image
                src={user.photoURL}
                alt={user.displayName || 'Profile'}
                width={28}
                height={28}
                className="rounded-full"
              />
            ) : (
              <UserCircleIcon className="h-7 w-7 text-gray-600 dark:text-gray-300" />
            )}
          </Link>

          {/* Account dropdown button */}
          <div className="relative">
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <ChevronDownIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-1 z-50">
                <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{user?.displayName || 'User'}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
                </div>
                <Link 
                  href="/profile/boards"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Your Boards
                </Link>
                <Link 
                  href="/settings"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Settings
                </Link>
                <button
                  onClick={handleSignOut}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
} 