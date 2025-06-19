import { Metadata } from 'next';
import TextJoinerClient from './TextJoinerClient';

export const metadata: Metadata = {
  title: 'Text Joiner Tool - Join Multiple Lines with Custom Separators | Free Developer Tools',
  description: 'Free online text joiner tool to combine multiple text lines or words with custom separators. Perfect for creating CSV data, concatenating lists, and formatting text output.',
  keywords: [
    'text joiner',
    'text combiner',
    'line joiner',
    'text concatenation',
    'csv creator',
    'text formatter',
    'string joiner',
    'list combiner',
    'text merger',
    'separator tool',
    'comma separator',
    'pipe separator',
    'text processing',
    'data formatting',
    'online text tools'
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
    title: 'Text Joiner Tool - Join Multiple Lines with Custom Separators',
    description: 'Free online text joiner tool to combine multiple text lines or words with custom separators. Perfect for creating CSV data and formatting text output.',
    url: 'https://freedevtools.dev/tools/text-joiner',
    siteName: 'Free Developer Tools',
    type: 'website',
    images: [
      {
        url: 'https://freedevtools.dev/images/text-joiner-og.png',
        width: 1200,
        height: 630,
        alt: 'Text Joiner Tool - Join Multiple Lines with Custom Separators',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Text Joiner Tool - Join Multiple Lines with Custom Separators',
    description: 'Free online text joiner tool to combine multiple text lines or words with custom separators. Perfect for creating CSV data and formatting text output.',
    images: ['https://freedevtools.dev/images/text-joiner-twitter.png'],
    creator: '@texttoolshub',
  },
  alternates: {
    canonical: 'https://freedevtools.dev/tools/text-joiner',
  },
  category: 'Text Processing Tools',
  classification: 'Text Tools',
  other: {
    'application-name': 'Free Developer Tools',
    'msapplication-TileColor': '#4f46e5',
    'theme-color': '#4f46e5',
  },
};

export default function TextJoinerPage() {
  return <TextJoinerClient />;
}