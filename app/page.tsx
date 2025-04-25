'use client';

import { useAuth } from '@/components/providers/AuthProvider';
import PinGrid from "@/components/pins/PinGrid";
import LandingPage from "@/components/landing/LandingPage";
import { useEffect, useState } from 'react';
import { Pin } from '@/lib/dummy-data';

export default function Home() {
  const { user, signIn } = useAuth();
  const [pins, setPins] = useState<Pin[]>([]);

  useEffect(() => {
    if (user) {
      user.getIdToken().then(idToken => {
        fetch(`/api/pins?idToken=${idToken}`)
          .then(res => res.json())
          .then(data => setPins(data))
          .catch(error => console.error('Error fetching pins:', error));
      });
    }
  }, [user]);

  if (!user) {
    return <LandingPage onSignIn={signIn} />;
  }

  return (
    <div className="min-h-screen bg-background">
          <main className="ml-20 container mx-auto px-4">
            <PinGrid pins={pins} />
          </main>
    </div>
  );
}
