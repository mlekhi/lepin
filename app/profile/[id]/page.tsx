'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/components/providers/AuthProvider';
import PinGrid from '@/components/pins/PinGrid';
import { Pin } from '@/lib/dummy-data';
import Image from 'next/image';

interface ProfilePageProps {
  params: {
    id: string;
  };
}

export default function ProfilePage({ params }: ProfilePageProps) {
  const { user } = useAuth();
  const [profilePins, setProfilePins] = useState<Pin[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [profileUser, setProfileUser] = useState<any>(null);

  useEffect(() => {
    if (user) {
      user.getIdToken().then(idToken => {
        // Fetch user profile data
        fetch(`/api/users/${params.id}?idToken=${idToken}`)
          .then(res => res.json())
          .then(data => {
            setProfileUser(data);
            // Fetch user's pins
            return fetch(`/api/users/${params.id}/pins?idToken=${idToken}`);
          })
          .then(res => res.json())
          .then(data => {
            setProfilePins(data);
            setIsLoading(false);
          })
          .catch(error => {
            console.error('Error fetching profile data:', error);
            setIsLoading(false);
          });
      });
    }
  }, [user, params.id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!profileUser) {
    return <div>User not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="mb-8 text-center">
        {profileUser.photoURL && (
          <Image
            src={profileUser.photoURL}
            alt={profileUser.displayName || 'Profile'}
            width={100}
            height={100}
            className="mx-auto mb-4 rounded-full"
          />
        )}
        <h1 className="text-2xl font-bold">{profileUser.displayName}</h1>
        <p className="text-gray-600">{profileUser.email}</p>
      </div>

      {/* Pins Grid */}
      <h2 className="text-3xl font-bold mb-8">Pins</h2>
      <PinGrid pins={profilePins} />
    </div>
  );
} 