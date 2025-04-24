'use client';

import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';

export default function SignIn() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto text-center">
        <h1 className="text-3xl font-bold mb-6">Welcome to Pinterest Clone</h1>
        <p className="text-gray-600 mb-8">
          Sign in to discover and save creative ideas
        </p>
        <Button
          onClick={() => signIn('google', { callbackUrl: '/' })}
          className="w-full"
        >
          Sign in with Google
        </Button>
      </div>
    </div>
  );
} 