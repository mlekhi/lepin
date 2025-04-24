'use client';

import Image from 'next/image';
import { PencilIcon, PlusIcon } from '@heroicons/react/24/outline';

interface ProfileHeaderProps {
  username: string;
  fullName: string;
  bio: string;
  avatarUrl: string;
  followers: number;
  following: number;
  pins: number;
}

export default function ProfileHeader({
  username,
  fullName,
  bio,
  avatarUrl,
  followers,
  following,
  pins,
}: ProfileHeaderProps) {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="relative w-32 h-32 md:w-40 md:h-40">
          <Image
            src={avatarUrl}
            alt={username}
            fill
            className="rounded-full object-cover"
          />
        </div>
        
        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
            <h1 className="text-2xl font-bold">{username}</h1>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded-full text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-700">
                <PencilIcon className="h-4 w-4 inline-block mr-1" />
                Edit Profile
              </button>
              <button className="px-4 py-2 bg-red-600 text-white rounded-full text-sm font-medium hover:bg-red-700">
                <PlusIcon className="h-4 w-4 inline-block mr-1" />
                Create Pin
              </button>
            </div>
          </div>
          
          <div className="flex justify-center md:justify-start gap-6 mb-4">
            <div className="text-center">
              <span className="block font-bold">{pins}</span>
              <span className="text-gray-600 dark:text-gray-400">Pins</span>
            </div>
            <div className="text-center">
              <span className="block font-bold">{followers}</span>
              <span className="text-gray-600 dark:text-gray-400">Followers</span>
            </div>
            <div className="text-center">
              <span className="block font-bold">{following}</span>
              <span className="text-gray-600 dark:text-gray-400">Following</span>
            </div>
          </div>
          
          <div className="text-center md:text-left">
            <h2 className="font-semibold">{fullName}</h2>
            <p className="text-gray-600 dark:text-gray-400">{bio}</p>
          </div>
        </div>
      </div>
    </div>
  );
} 