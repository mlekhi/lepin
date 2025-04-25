'use client';

import { MagnifyingGlassIcon, UserGroupIcon, BookmarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

interface LandingPageProps {
  onSignIn: () => void;
}

export default function LandingPage({ onSignIn }: LandingPageProps) {
  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory">
      {/* Hero Section */}
      <section className="h-screen w-full flex items-center justify-center px-4 snap-start bg-background">
        <div className="text-center max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground">
            Scroll. Pin. Praise the King.
          </h1>
          <p className="text-xl md:text-2xl text-foreground/80 mb-8">
          LePin is a Pinterest-style tribute board dedicated entirely to the myth, the man, the moment: LeBron James. 
          </p>
          <button
            onClick={onSignIn}
            className="bg-primary text-primary-foreground px-8 py-4 rounded-full text-lg font-semibold hover:bg-primary/90 transition-all duration-300"
          >
            Get Started
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="h-screen w-full flex items-center px-4 snap-start bg-background">
        <div className="max-w-6xl mx-auto w-full">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            Why Lepin?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-6">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                <MagnifyingGlassIcon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Discover Highlights</h3>
              <p className="text-foreground/80">
                Find and save your favorite Lebron moments, from game-winning shots to iconic dunks.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                <BookmarkIcon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Organize Collections</h3>
              <p className="text-foreground/80">
                Create boards for different aspects of Lebron's career - championships, milestones, and more.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                <UserGroupIcon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Join the Community</h3>
              <p className="text-foreground/80">
              From his high school days in Akron to his late-game dagger threes in year 21, every post captures a different version of LeBron.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Image Grid Preview */}
      <section className="h-screen w-full flex items-center px-4 snap-start bg-secondary">
        <div className="max-w-6xl mx-auto w-full">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            Start Your Collection
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square relative rounded-lg overflow-hidden">
                <Image
                  src={`/images/lebron-${i}.jpg`}
                  alt={`Lebron James ${i}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="h-screen w-full flex items-center px-4 snap-start bg-background">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
            Ready to Build Your Lebron Collection?
          </h2>
          <p className="text-xl text-foreground/80 mb-8">
            Join thousands of fans who use Lepin to celebrate the King's legacy.
          </p>
          <button
            onClick={onSignIn}
            className="bg-primary text-primary-foreground px-8 py-4 rounded-full text-lg font-semibold hover:bg-primary/90 transition-all duration-300"
          >
            Sign Up Now
          </button>
        </div>
      </section>
    </div>
  );
} 