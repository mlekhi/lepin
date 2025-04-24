'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

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
}

export default function PinPageClient({ pin }: PinPageClientProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const { toast } = useToast();

  const isAuthor = session?.user?.id === pin.authorId;

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

      toast({
        title: 'Success',
        description: 'Pin deleted successfully',
      });

      router.push('/');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete pin',
        variant: 'destructive',
      });
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
                <Button
                  variant="outline"
                  onClick={() => router.push(`/pin/${pin.id}/edit`)}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleDelete}
                  disabled={isDeleting}
                >
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 