'use client';

import Image from 'next/image';
import { useAuth } from '@/components/providers/AuthProvider';

interface LoadingProps {
  className?: string;
}

export default function Loading({ className = '' }: LoadingProps) {
  const { loading } = useAuth();

  if (!loading) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center bg-background transition-opacity duration-1000 ease-in-out ${className}`}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin" style={{ animationDuration: '1s' }}>
          <Image
            src="/logo.png"
            alt="Loading"
            width={48}
            height={48}
            className="w-12 h-12 object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
} 