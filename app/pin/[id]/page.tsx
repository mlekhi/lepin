import { notFound } from 'next/navigation';
import PinPageClient from './PinPageClient';
import { getPin } from '@/lib/dummy-data';

interface PinPageProps {
  params: {
    id: string;
  };
}

export default async function PinPage({ params }: PinPageProps) {
  const pin = getPin(params.id);

  if (!pin) {
    notFound();
  }

  return <PinPageClient pin={pin} />;
} 