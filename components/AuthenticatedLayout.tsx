'use client';

import { useAuth } from "@/components/providers/AuthProvider";
import SideNav from "@/components/SideNav";
import Searchbar from "@/components/Searchbar";

export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  if (!user) {
    return children;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed top-0 left-0 h-full">
        <SideNav />
      </div>
      <div className="pl-20">
        <div className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <Searchbar />
        </div>
        {children}
      </div>
    </div>
  );
} 