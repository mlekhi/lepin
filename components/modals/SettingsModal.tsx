'use client';

import Link from 'next/link';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50" onClick={onClose}>
      <div 
        className="absolute left-24 bottom-8 w-64 bg-background rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] animate-in slide-in-from-left-2"
        onClick={e => e.stopPropagation()}
      >
        <div className="py-2">
          <a 
            href="mailto:maya.lekhi1@gmail.com?subject=LePin%20Beta%20Tester"
            className="flex items-center justify-between px-4 py-3 text-sm text-foreground hover:bg-secondary/50 transition-colors"
          >
            <span>Be a beta tester</span>
            <ArrowTopRightOnSquareIcon className="w-4 h-4 text-muted-foreground" />
          </a>
          
          <a 
            href="mailto:maya.lekhi1@gmail.com?subject=LePin%20Feedback"
            className="flex items-center justify-between px-4 py-3 text-sm text-foreground hover:bg-secondary/50 transition-colors"
          >
            <span>Share feedback</span>
            <ArrowTopRightOnSquareIcon className="w-4 h-4 text-muted-foreground" />
          </a>
        </div>
      </div>
    </div>
  );
} 