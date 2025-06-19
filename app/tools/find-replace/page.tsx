// app/tools/find-replace/page.tsx
import { Metadata } from 'next';
import FindReplaceClient from './FindReplaceClient';

export const metadata: Metadata = {
  title: 'Free Find & Replace Tool - Search and Replace Text Online | Free Developer Tools',
  description: 'Find and replace text with support for regex patterns, case-sensitive search, and bulk operations. Free online text search and replace tool with real-time preview.',
  keywords: [
    'find replace tool',
    'search replace text',
    'text find replace',
    'regex find replace',
    'bulk text replace',
    'search and replace online',
    'text editor find replace',
    'free find replace tool',
    'online text search',
    'pattern replace tool'
  ],
  openGraph: {
    title: 'Free Find & Replace Tool - Search and Replace Text Online',
    description: 'Find and replace text with support for regex patterns, case-sensitive search, and bulk operations. Free online text search and replace tool with real-time preview.',
    url: 'https://freedevtools.dev/tools/find-replace',
    siteName: 'Free Developer Tools',
    images: [
      {
        url: 'https://freedevtools.dev/og-find-replace.png',
        width: 1200,
        height: 630,
        alt: 'Find & Replace Tool'
      }
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Find & Replace Tool - Search and Replace Text Online',
    description: 'Find and replace text with support for regex patterns, case-sensitive search, and bulk operations. Free online text search and replace tool with real-time preview.',
    images: ['https://freedevtools.dev/og-find-replace.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://freedevtools.dev/tools/find-replace',
  }
};

export default function FindReplacePage() {
  return <FindReplaceClient />;
}