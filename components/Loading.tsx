'use client';

import { useAuth } from '@/components/providers/AuthProvider';

interface LoadingProps {
  className?: string;
}

export default function Loading({ className = '' }: LoadingProps) {
  const { loading } = useAuth();

  if (!loading) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center bg-white transition-opacity duration-1000 ease-in-out dark:bg-black ${className}`}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin text-5xl" style={{ animationDuration: '1s' }}>
          🏀
        </div>
      </div>
    </div>
  );
} 