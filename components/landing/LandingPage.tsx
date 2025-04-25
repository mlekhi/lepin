'use client';

import { MagnifyingGlassIcon, UserGroupIcon, BookmarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

interface LandingPageProps {
  onSignIn: () => void;
}

export default function LandingPage({ onSignIn }: LandingPageProps) {
  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory bg-background relative">

      {/* Hero Section */}
      <section className="h-screen w-full flex items-center justify-center px-4 snap-start">
        <div className="text-center max-w-3xl relative">
          {/* Glowy border effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-secondary/30 to-primary/30 blur-2xl opacity-50 -z-10" />
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-primary animate-gradient">
            Scroll. Pin. Praise the King.
          </h1>
          <p className="text-xl md:text-2xl text-foreground/80 mb-12 leading-relaxed">
            LePin is a Pinterest-style tribute board dedicated entirely to the myth, the man, the moment: LeBron James.
          </p>
          <button
            onClick={onSignIn}
            className="group relative px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary rounded-full blur group-hover:blur-xl transition-all duration-300" />
            <div className="relative bg-background/90 backdrop-blur-sm hover:bg-background/80 text-foreground px-8 py-4 rounded-full transition-all duration-300">
              Get Started
            </div>
          </button>
        </div>
      </section>

      {/* Image Grid Preview */}
      <section className="h-screen w-full flex items-stretch snap-start backdrop-blur-sm bg-secondary/10">
        <div className="w-1/2 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary p-[1px]">
            <div className="relative h-full w-full">
              <Image
                src="/images/lebron-1.jpg"
                alt="LeBron James"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
        <div className="w-1/2 flex items-center px-12">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-primary">
              Start Your Collection
            </h2>
            <p className="text-xl text-foreground/80 mb-12 leading-relaxed">
              Curate your personal gallery of the King's greatest moments. From championship celebrations to iconic dunks, build a collection that tells the story of greatness.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="h-screen w-full flex items-center px-4 snap-start relative">
        {/* Blurred background layer */}
        <div className="absolute inset-x-0 bottom-0 h-[80%] w-full">
          <Image
            src="/lebron-landing.png"
            alt="Background"
            fill
            className="object-contain object-bottom blur-3xl opacity-50 scale-110"
            priority
          />
        </div>
        {/* Main image layer */}
        <div className="absolute inset-x-0 bottom-0 h-[80%] w-full">
          <Image
            src="/lebron-landing.png"
            alt="LeBron James Lakers"
            fill
            className="object-contain object-bottom"
            priority
          />
        </div>
        <div className="max-w-4xl mx-auto text-center relative">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-primary">
            Ready to Build Your Lebron Collection?
          </h2>
          <p className="text-xl text-foreground/80 mb-12 leading-relaxed">
            Join thousands of fans who use Lepin to celebrate the King's legacy.
          </p>
          <button
            onClick={onSignIn}
            className="group relative px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary rounded-full blur group-hover:blur-xl transition-all duration-300" />
            <div className="relative bg-background/90 backdrop-blur-sm hover:bg-background/80 text-foreground px-8 py-4 rounded-full transition-all duration-300">
              Sign Up Now
            </div>
          </button>
        </div>
      </section>
    </div>
  );
} 