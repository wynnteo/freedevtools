import { Metadata } from 'next';
import WordCounterClient from './WordCounterClient';

export const metadata: Metadata = {
  title: 'Free Word Counter - Count Words, Characters & Reading Time | Free Developer Tools',
  description: 'Free online word counter tool to count words, characters, sentences, paragraphs and calculate reading time. Perfect for writers, students, and content creators with detailed text analysis.',
  keywords: [
    'word counter',
    'character counter',
    'text counter',
    'word count tool',
    'character count',
    'reading time calculator',
    'text analysis',
    'sentence counter',
    'paragraph counter',
    'online word counter',
    'free word counter',
    'text statistics'
  ],
  openGraph: {
    title: 'Free Word Counter - Count Words, Characters & Reading Time',
    description: 'Free online word counter tool to count words, characters, sentences, paragraphs and calculate reading time. Perfect for writers, students, and content creators with detailed text analysis.',
    url: 'https://freedevtools.dev/tools/word-counter',
    siteName: 'Free Developer Tools',
    images: [
      {
        url: 'https://freedevtools.dev/og-word-counter.png',
        width: 1200,
        height: 630,
        alt: 'Word Counter Tool'
      }
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Word Counter - Count Words, Characters & Reading Time',
    description: 'Free online word counter tool to count words, characters, sentences, paragraphs and calculate reading time. Perfect for writers, students, and content creators with detailed text analysis.',
    images: ['https://freedevtools.dev/og-word-counter.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://freedevtools.dev/tools/word-counter',
  }
};

// Server component that renders the client component
export default function WordCounterPage() {
  return <WordCounterClient />;
}