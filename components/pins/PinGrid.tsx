'use client';

import { Pin } from '@/lib/dummy-data';
import PinCard from "./PinCard";

interface PinGridProps {
  pins?: (Pin & {
    author: {
      name: string | null;
      image: string | null;
    };
  })[];
}

export default function PinGrid({ pins = [] }: PinGridProps) {
  if (!Array.isArray(pins)) {
    return null;
  }

  return (
    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4">
      {pins.map((pin) => (
        <div key={pin.id} className="mb-4 break-inside-avoid">
          <PinCard pin={pin} />
        </div>
      ))}
    </div>
  );
} 