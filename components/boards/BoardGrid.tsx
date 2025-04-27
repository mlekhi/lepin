import Link from 'next/link';
import Image from 'next/image';
import { Board } from '@/lib/types';

// Define Pin type for boards display
interface PinPreview {
  id: string;
  title: string;
  imageUrl: string;
}

// Omit the pins array from Board and add our own extended version
interface BoardGridProps {
  boards: Array<Omit<Board, 'pins'> & {
    pins: PinPreview[];
  }>;
}

export default function BoardGrid({ boards }: BoardGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {boards.map((board) => (
        <Link
          key={board.id}
          href={`/board/${board.id}`}
          className="group relative bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <div className="aspect-square relative overflow-hidden rounded-t-lg">
            {board.pins && board.pins.length > 0 ? (
              <div className="grid grid-cols-2 gap-1 p-1">
                {board.pins.slice(0, 4).map((pin, index) => (
                  <div key={pin.id} className="aspect-square relative">
                    <Image
                      src={pin.imageUrl}
                      alt={pin.title || ''}
                      fill
                      className="object-cover rounded"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <span className="text-gray-500 dark:text-gray-400">No pins yet</span>
              </div>
            )}
          </div>
          
          <div className="p-4">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate">
              {board.title}
            </h3>
            {board.description && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                {board.description}
              </p>
            )}
            <div className="flex items-center mt-2">
              {board.author?.image ? (
                <Image
                  src={board.author.image}
                  alt={board.author.name || ''}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
              ) : (
                <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded-full" />
              )}
              <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                {board.author?.name}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
} 