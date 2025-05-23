'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { HomeIcon, MapIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import { HomeIcon as HomeIconSolid, MapIcon as MapIconSolid, Cog6ToothIcon as Cog6ToothIconSolid } from '@heroicons/react/24/solid';
import SettingsModal from './modals/SettingsModal';

export default function SideNav() {
  const pathname = usePathname();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  return (
    <div className="fixed left-0 top-0 h-full w-20 bg-background border-r border-border flex flex-col items-center z-50">
      <div className="h-16 flex items-center justify-center">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="LePin Logo"
            width={24}
            height={24}
            className="w-6 h-6 object-contain"
            priority
          />
        </Link>
      </div>

      <nav className="flex flex-col items-center gap-8 mt-8">
        <Link
          href="/"
          className="w-10 h-10 flex items-center justify-center rounded-xl transition-colors hover:bg-secondary"
        >
          {isActive('/') ? (
            <HomeIconSolid className="w-6 h-6 text-foreground" />
          ) : (
            <HomeIcon className="w-6 h-6 text-muted-foreground" />
          )}
        </Link>

        <Link
          href="/search"
          className="w-10 h-10 flex items-center justify-center rounded-xl transition-colors hover:bg-secondary"
        >
          {isActive('/search') ? (
            <MapIconSolid className="w-6 h-6 text-foreground" />
          ) : (
            <MapIcon className="w-6 h-6 text-muted-foreground" />
          )}
        </Link>
      </nav>

      <div className="mt-auto mb-4">
        <button
          onClick={() => setIsSettingsOpen(true)}
          className="w-10 h-10 flex items-center justify-center rounded-xl transition-colors hover:bg-secondary"
          aria-label="Open settings"
        >
          {isSettingsOpen ? (
            <Cog6ToothIconSolid className="w-6 h-6 text-foreground" />
          ) : (
            <Cog6ToothIcon className="w-6 h-6 text-muted-foreground" />
          )}
        </button>
      </div>

      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
      />
    </div>
  );
} 