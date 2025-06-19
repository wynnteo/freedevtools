import { Metadata } from 'next';
import CaseConverterClient from './CaseConverterClient';

export const metadata: Metadata = {
  title: 'Free Case Converter - Transform Text Case Online | Free Developer Tools',
  description: 'Convert text between different cases instantly: uppercase, lowercase, title case, camelCase, snake_case, kebab-case, PascalCase and more. Free online case converter tool.',
  keywords: [
    'case converter',
    'text case converter',
    'uppercase converter',
    'lowercase converter',
    'title case converter',
    'camelCase converter',
    'snake_case converter',
    'kebab-case converter',
    'PascalCase converter',
    'text transformation',
    'case changer',
    'text formatter',
    'online case converter',
    'free case converter'
  ],
  openGraph: {
    title: 'Free Case Converter - Transform Text Case Online',
    description: 'Convert text between different cases instantly: uppercase, lowercase, title case, camelCase, snake_case, kebab-case, PascalCase and more. Free online case converter tool.',
    url: 'https://freedevtools.dev/tools/case-converter',
    siteName: 'Free Developer Tools',
    images: [
      {
        url: 'https://freedevtools.dev/og-case-converter.png',
        width: 1200,
        height: 630,
        alt: 'Case Converter Tool'
      }
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Case Converter - Transform Text Case Online',
    description: 'Convert text between different cases instantly: uppercase, lowercase, title case, camelCase, snake_case, kebab-case, PascalCase and more. Free online case converter tool.',
    images: ['https://freedevtools.dev/og-case-converter.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://freedevtools.dev/tools/case-converter',
  }
};

// Server component that renders the client component
export default function CaseConverterPage() {
  return <CaseConverterClient />;
}