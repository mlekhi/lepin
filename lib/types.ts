export interface Pin {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  authorId: string;
  createdAt: string;
  author: {
    name: string;
    image: string | null;
  };
}

export interface Board {
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

// Firebase auth user with additional fields from our database
export interface User {
  id: string;            // User ID (same as Firebase Auth UID)
  username?: string;     // Username for the profile
  displayName: string;   // Display name (typically from OAuth provider)
  photoURL: string;      // Profile picture URL
  email?: string;        // User's email
  createdAt: string;     // When the user account was created
  updatedAt?: string;    // When the user profile was last updated
  boards?: string[];     // Array of board IDs created by this user
  savedPins?: string[];  // Array of pin IDs saved by this user
  following?: string[];  // Array of user IDs this user is following
  followers?: number;    // Count of followers
}

// Simplified type for Auth context
export interface AuthUser {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  getIdToken: () => Promise<string>;
} 