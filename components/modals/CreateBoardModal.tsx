import { useState } from 'react';
import { useAuth } from '@/components/providers/AuthProvider';

interface Board {
  id: string;
  title: string;
  description: string;
  authorId: string;
  createdAt: string;
  pins: string[];
  author: {
    name: string;
    image: string | null;
  };
}

interface CreateBoardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBoardCreated: (board: Board) => void;
}

export default function CreateBoardModal({ isOpen, onClose, onBoardCreated }: CreateBoardModalProps) {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const idToken = await user.getIdToken();
      const response = await fetch('/api/boards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idToken,
          title,
          description,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create board');
      }

      const newBoard: Board = await response.json();
      onBoardCreated(newBoard);
      onClose();
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Error creating board:', error);
      setError(error instanceof Error ? error.message : 'Failed to create board');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50">
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-background p-6 rounded-xl shadow-lg">
        <h3 className="text-2xl font-medium mb-4">Create New Board</h3>
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="mb-4 p-4 bg-destructive/10 text-destructive rounded-xl text-sm">
              {error}
            </div>
          )}
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-normal mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 bg-secondary/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
              required
              disabled={isSubmitting}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="description" className="block text-sm font-normal mb-1">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 bg-secondary/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
              rows={3}
              disabled={isSubmitting}
            />
          </div>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-secondary text-secondary-foreground rounded-full hover:bg-secondary/80 transition-colors"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating...' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 