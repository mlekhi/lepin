'use client';

import { useState } from 'react';
import Image from 'next/image';
import { HeartIcon, ShareIcon, BookmarkIcon } from '@heroicons/react/24/outline';

interface PinProps {
  imageUrl: string;
  title: string;
  description?: string;
  author: string;
}

export default function Pin({ imageUrl, title, description, author }: PinProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="pin-item relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <Image
          src={imageUrl}
          alt={title}
          width={500}
          height={750}
          className="pin-image"
        />
        
        {isHovered && (
          <div className="absolute inset-0 bg-black bg-opacity-40 rounded-xl flex flex-col justify-between p-4">
            <div className="flex justify-end space-x-2">
              <button className="p-2 bg-white rounded-full hover:bg-gray-100">
                <HeartIcon className="h-5 w-5 text-gray-700" />
              </button>
              <button className="p-2 bg-white rounded-full hover:bg-gray-100">
                <ShareIcon className="h-5 w-5 text-gray-700" />
              </button>
              <button className="p-2 bg-white rounded-full hover:bg-gray-100">
                <BookmarkIcon className="h-5 w-5 text-gray-700" />
              </button>
            </div>
            
            <div className="text-white">
              <h3 className="font-semibold text-lg">{title}</h3>
              {description && <p className="text-sm mt-1">{description}</p>}
              <p className="text-sm mt-2">by {author}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 