import { Metadata } from 'next';
import TextReverserClient from './TextReverserClient';

// ✅ This works because this is a SERVER component
export const metadata: Metadata = {
  title: 'Free Text Reverser - Reverse Text, Words & Lines Online | Free Developer Tools',
  description: 'Reverse text, words, or lines instantly with our free online text reverser tool. Perfect for creative writing, text manipulation, and coding puzzles with customizable options.',
  keywords: [
    'text reverser',
    'reverse text',
    'text reverse tool',
    'reverse words',
    'reverse lines',
    'text manipulation',
    'string reverser',
    'online text reverser',
    'free text reverser',
    'backwards text generator'
  ],
  openGraph: {
    title: 'Free Text Reverser - Reverse Text, Words & Lines Online',
    description: 'Reverse text, words, or lines instantly with our free online text reverser tool. Perfect for creative writing, text manipulation, and coding puzzles with customizable options.',
    url: 'https://freedevtools.dev/tools/text-reverser',
    siteName: 'Free Developer Tools',
    images: [
      {
        url: 'https://freedevtools.dev/og-text-reverser.png',
        width: 1200,
        height: 630,
        alt: 'Text Reverser Tool'
      }
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Text Reverser - Reverse Text, Words & Lines Online',
    description: 'Reverse text, words, or lines instantly with our free online text reverser tool. Perfect for creative writing, text manipulation, and coding puzzles with customizable options.',
    images: ['https://freedevtools.dev/og-text-reverser.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://freedevtools.dev/tools/text-reverser',
  }
};

// Server component that renders the client component
export default function TextReverserPage() {
  return <TextReverserClient />;
}