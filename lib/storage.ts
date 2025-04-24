import { storage } from './firebase';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

export async function uploadFile(file: File, path: string): Promise<string> {
  try {
    const storageRef = ref(storage, path);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
}

export async function deleteFile(url: string): Promise<void> {
  try {
    const storageRef = ref(storage, url);
    await deleteObject(storageRef);
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
}

export function getFileExtension(filename: string): string {
  return filename.split('.').pop() || '';
}

export function generateUniqueFilename(originalFilename: string, userId: string): string {
  const extension = getFileExtension(originalFilename);
  const timestamp = Date.now();
  return `users/${userId}/${timestamp}.${extension}`;
} 