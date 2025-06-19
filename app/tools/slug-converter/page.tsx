import { Metadata } from 'next';
import SlugConverterClient from './SlugConverterClient';

// ✅ This works because this is a SERVER component
export const metadata: Metadata = {
  title: 'Free Slug Converter - Create SEO-Friendly URL Slugs Online | Free Developer Tools',
  description: 'Convert text to SEO-friendly URL slugs instantly with our free online slug converter. Handle special characters, choose separators, and create perfect URLs for your content.',
  keywords: [
    'slug converter',
    'url slug generator',
    'seo url creator',
    'text to slug',
    'url friendly text',
    'slug generator',
    'permalink generator',
    'url slug tool',
    'seo slug converter',
    'web development tools'
  ],
  openGraph: {
    title: 'Free Slug Converter - Create SEO-Friendly URL Slugs Online',
    description: 'Convert text to SEO-friendly URL slugs instantly with our free online slug converter. Handle special characters, choose separators, and create perfect URLs for your content.',
    url: 'https://freedevtools.dev/tools/slug-converter',
    siteName: 'Free Developer Tools',
    images: [
      {
        url: 'https://freedevtools.dev/og-slug-converter.png',
        width: 1200,
        height: 630,
        alt: 'Slug Converter Tool'
      }
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Slug Converter - Create SEO-Friendly URL Slugs Online',
    description: 'Convert text to SEO-friendly URL slugs instantly with our free online slug converter. Handle special characters, choose separators, and create perfect URLs for your content.',
    images: ['https://freedevtools.dev/og-slug-converter.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://freedevtools.dev/tools/slug-converter',
  }
};

// Server component that renders the client component
export default function SlugConverterPage() {
  return <SlugConverterClient />;
}