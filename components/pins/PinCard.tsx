'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { HeartIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import Image from "next/image";
import Link from "next/link";
import { Pin } from '@/lib/types';

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
    <div className="pin-item">
      <Link href={`/pin/${pin.id}`}>
        <div className="relative group">
          <div className="aspect-square relative rounded-xl overflow-hidden">
            <Image
              src={pin.imageUrl}
              alt={pin.title}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-semibold text-foreground">{pin.title}</h3>
              <p className="text-sm text-muted-foreground mt-2">{pin.description}</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 relative rounded-full overflow-hidden">
                <Image
                  src={pin.author.image || '/default-avatar.png'}
                  alt={pin.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-sm text-foreground">{pin.author.name}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
} 