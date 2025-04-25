'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

interface PinPageClientProps {
  pin: {
    id: string;
    title: string;
    description: string | null;
    imageUrl: string;
    authorId: string;
    author: {
      name: string | null;
      image: string | null;
    };
  };
  currentUser: any;
}

export default function PinPageClient({ pin, currentUser }: PinPageClientProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const isAuthor = currentUser?.id === pin.authorId;

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this pin?')) {
      return;
    }

    setIsDeleting(true);

    try {
      const response = await fetch(`/api/pins/${pin.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete pin');
      }

      router.push('/');
    } catch (error) {
      console.error('Failed to delete pin', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative aspect-square">
            <Image
              src={pin.imageUrl}
              alt={pin.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-2">{pin.title}</h1>
            {pin.description && (
              <p className="text-gray-600 mb-4">{pin.description}</p>
            )}
            <div className="flex items-center gap-2 mb-6">
              {pin.author.image && (
                <Image
                  src={pin.author.image}
                  alt={pin.author.name || 'Author'}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              )}
              <span className="font-medium">
                {pin.author.name || 'Anonymous'}
              </span>
            </div>
            {isAuthor && (
              <div className="flex gap-2">
                <button
                  onClick={() => router.push(`/pin/${pin.id}/edit`)}
                  className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg border border-input hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors disabled:opacity-50"
                >
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 