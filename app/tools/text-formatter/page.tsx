import { Metadata } from 'next';
import TextFormatterClient from './TextFormatterClient';

export const metadata: Metadata = {
  title: 'Text Formatter Tool - Format Text Case, Clean & Transform | Free Developer Tools',
  description: 'Free online text formatter to convert case, remove extra spaces, add line numbers, sort lines, reverse text, and apply multiple text transformations instantly.',
  keywords: [
    'text formatter',
    'case converter',
    'text transformer',
    'uppercase converter',
    'lowercase converter',
    'title case converter',
    'sentence case',
    'text cleaner',
    'remove extra spaces',
    'line numbers',
    'sort text',
    'reverse text',
    'text processing',
    'text editor',
    'string formatter',
    'text manipulation',
    'clean text',
    'format text online',
    'text beautifier',
    'duplicate remover'
  ],
  authors: [{ name: 'Free Developer Tools' }],
  creator: 'Free Developer Tools',
  publisher: 'Free Developer Tools',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Text Formatter Tool - Format Text Case, Clean & Transform',
    description: 'Free online text formatter to convert case, remove extra spaces, add line numbers, sort lines, reverse text, and apply multiple text transformations instantly.',
    url: 'https://freedevtools.dev/tools/text-formatter',
    siteName: 'Free Developer Tools',
    type: 'website',
    images: [
      {
        url: 'https://freedevtools.dev/images/text-formatter-og.png',
        width: 1200,
        height: 630,
        alt: 'Text Formatter Tool - Format Text Case, Clean & Transform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Text Formatter Tool - Format Text Case, Clean & Transform',
    description: 'Free online text formatter to convert case, remove extra spaces, add line numbers, sort lines, reverse text, and apply multiple text transformations instantly.',
    images: ['https://freedevtools.dev/images/text-formatter-twitter.png'],
    creator: '@texttoolshub',
  },
  alternates: {
    canonical: 'https://freedevtools.dev/tools/text-formatter',
  },
  category: 'Text Processing Tools',
  classification: 'Text Tools',
  other: {
    'application-name': 'Free Developer Tools',
    'msapplication-TileColor': '#4f46e5',
    'theme-color': '#4f46e5',
  },
};

export default function TextFormatterPage() {
  return <TextFormatterClient />;
}