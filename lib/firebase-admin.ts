import * as admin from 'firebase-admin';

// Check if we have all required environment variables
const requiredEnvVars = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY,
};

// Validate environment variables
Object.entries(requiredEnvVars).forEach(([key, value]) => {
  if (!value) {
    throw new Error(`Missing required Firebase Admin environment variable: ${key}`);
  }
});

// Initialize Firebase Admin if not already initialized
if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        // Handle both JSON escaped and raw private key formats
        privateKey: process.env.FIREBASE_PRIVATE_KEY!.includes('\\n')
          ? process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n')
          : process.env.FIREBASE_PRIVATE_KEY!,
      }),
    });
    console.log('Firebase Admin initialized successfully');
  } catch (error) {
    console.error('Error initializing Firebase Admin:', error);
    throw error;
  }
}

const auth = admin.auth();
const db = admin.firestore();
const storage = admin.storage();

export { auth, db, storage }; 