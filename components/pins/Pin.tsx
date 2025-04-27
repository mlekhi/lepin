'use client';

import Image from 'next/image';
import { Pin as PinType } from '@/lib/types';

interface PinProps {
  pin: PinType;
}

export default function Pin({ pin }: PinProps) {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="relative aspect-square rounded-xl overflow-hidden">
        <Image
          src={pin.imageUrl}
          alt={pin.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="mt-4">
        <h1 className="text-2xl font-bold text-foreground">{pin.title}</h1>
        <p className="mt-2 text-muted-foreground">{pin.description}</p>
        <div className="mt-4 flex items-center gap-2">
          <div className="w-10 h-10 relative rounded-full overflow-hidden">
            <Image
              src={pin.author.image || '/default-avatar.png'}
              alt={pin.author.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="font-medium text-foreground">{pin.author.name}</p>
            <p className="text-sm text-muted-foreground">Posted on {new Date(pin.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
} 