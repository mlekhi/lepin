import { useState, useEffect } from 'react';
import { auth, FirebaseUser, signInWithGoogle, signOutUser } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export function useAuth() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return {
    user,
    loading,
    signIn: signInWithGoogle,
    signOut: signOutUser,
  };
} 