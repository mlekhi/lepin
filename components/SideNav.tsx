'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { HomeIcon, BellIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { HomeIcon as HomeIconSolid, BellIcon as BellIconSolid, UserCircleIcon as UserCircleIconSolid } from '@heroicons/react/24/solid';

export default function SideNav() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <div className="fixed left-0 top-0 h-full w-20 bg-white dark:bg-black border-r border-gray-100 dark:border-gray-800 flex flex-col items-center py-4 space-y-8">
      <Link href="/" className="mb-8">
        <Image
          src="/logo.png"
          alt="Lebron Logo"
          width={24}
          height={24}
          className="w-6 h-6 object-contain"
          priority
        />
      </Link>

      <nav className="flex flex-col items-center space-y-6">
        <Link
          href="/"
          className={`w-12 h-12 flex items-center justify-center rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 ${
            isActive('/') ? 'bg-black dark:bg-white' : ''
          }`}
        >
          {isActive('/') ? (
            <HomeIconSolid className={`w-6 h-6 ${isActive('/') ? 'text-white dark:text-black' : 'text-gray-700 dark:text-gray-300'}`} />
          ) : (
            <HomeIcon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          )}
        </Link>
      </nav>
    </div>
  );
} 