'use client';

import { Pin } from '@/lib/types';
import PinCard from './PinCard';

interface PinGridProps {
  pins?: Pin[];
}

export default function PinGrid({ pins = [] }: PinGridProps) {
  if (!Array.isArray(pins)) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
      {pins.map((pin) => (
        <PinCard key={pin.id} pin={pin} />
      ))}
    </div>
  );
} 