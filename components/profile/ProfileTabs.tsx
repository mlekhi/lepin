'use client';

import { useState } from 'react';
import { PhotoIcon, FolderIcon, HeartIcon } from '@heroicons/react/24/outline';

interface ProfileTabsProps {
  onTabChange: (tab: string) => void;
}

export default function ProfileTabs({ onTabChange }: ProfileTabsProps) {
  const [activeTab, setActiveTab] = useState('pins');

  const tabs = [
    { id: 'pins', label: 'Pins', icon: PhotoIcon },
    { id: 'boards', label: 'Boards', icon: FolderIcon },
    { id: 'saved', label: 'Saved', icon: HeartIcon },
  ];

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    onTabChange(tabId);
  };

  return (
    <div className="border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-4xl mx-auto px-4">
        <nav className="flex space-x-8" aria-label="Tabs">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`
                  flex items-center px-1 py-4 text-sm font-medium border-b-2
                  ${activeTab === tab.id
                    ? 'border-red-600 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                  }
                `}
              >
                <Icon className="h-5 w-5 mr-2" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
} 