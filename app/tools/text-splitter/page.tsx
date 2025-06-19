import { Metadata } from 'next';
import TextSplitterClient from './TextSplitterClient';

// ✅ This works because this is a SERVER component
export const metadata: Metadata = {
  title: 'Free Text Splitter - Split Text by Delimiter, Lines & Words | Free Developer Tools',
  description: 'Split text into parts using custom delimiters, lines, words, or characters. Perfect for data processing, CSV handling, and text analysis with customizable options.',
  keywords: [
    'text splitter',
    'split text',
    'text split tool',
    'delimiter splitter',
    'CSV splitter',
    'line splitter',
    'word splitter',
    'character splitter',
    'online text splitter',
    'free text splitter',
    'text processing tool'
  ],
  openGraph: {
    title: 'Free Text Splitter - Split Text by Delimiter, Lines & Words',
    description: 'Split text into parts using custom delimiters, lines, words, or characters. Perfect for data processing, CSV handling, and text analysis with customizable options.',
    url: 'https://freedevtools.dev/tools/text-splitter',
    siteName: 'Free Developer Tools',
    images: [
      {
        url: 'https://freedevtools.dev/og-text-splitter.png',
        width: 1200,
        height: 630,
        alt: 'Text Splitter Tool'
      }
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Text Splitter - Split Text by Delimiter, Lines & Words',
    description: 'Split text into parts using custom delimiters, lines, words, or characters. Perfect for data processing, CSV handling, and text analysis with customizable options.',
    images: ['https://freedevtools.dev/og-text-splitter.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://freedevtools.dev/tools/text-splitter',
  }
};

// Server component that renders the client component
export default function TextSplitterPage() {
  return <TextSplitterClient />;
}