'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { HeartIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import Image from "next/image";
import Link from "next/link";
import { Pin } from '@/lib/dummy-data';

interface PinCardProps {
  pin: Pin & {
    author: {
      name: string | null;
      image: string | null;
    };
  };
}

export default function PinCard({ pin }: PinCardProps) {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div
      className="relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => router.push(`/pin/${pin.id}`)}
    >
      {/* Image */}
      <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
        <Image
          src={pin.imageUrl}
          alt={pin.title}
          fill
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Hover Overlay */}
        <div
          className={`absolute inset-0 bg-black bg-opacity-30 transition-opacity duration-200 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Actions */}
          <div className="absolute top-4 right-4 flex space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsLiked(!isLiked);
              }}
              className="p-2 rounded-full bg-white hover:bg-gray-100 transition-colors"
            >
              {isLiked ? (
                <HeartIconSolid className="w-5 h-5 text-red-500" />
              ) : (
                <HeartIcon className="w-5 h-5 text-gray-700" />
              )}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                // Add comment functionality
              }}
              className="p-2 rounded-full bg-white hover:bg-gray-100 transition-colors"
            >
              <ChatBubbleLeftIcon className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>
      </div>

      {/* Pin Info */}
      <div className="mt-2">
        <h3 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2">
          {pin.title}
        </h3>
        {pin.author && (
          <div className="flex items-center mt-1">
            <Image
              src={pin.author.image || 'https://via.placeholder.com/24'}
              alt={pin.author.name || 'Author'}
              width={24}
              height={24}
              className="w-6 h-6 rounded-full mr-2"
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {pin.author.name}
            </span>
          </div>
        )}
      </div>
    </div>
  );
} 