import { Metadata } from 'next';
import LoremIpsumClient from './LoremIpsumClient';

// ✅ This works because this is a SERVER component
export const metadata: Metadata = {
  title: 'Free Lorem Ipsum Generator - Placeholder Text Generator Online | Free Developer Tools',
  description: 'Generate Lorem Ipsum placeholder text for your design and development projects. Customize paragraph count and get randomized text instantly with our free online tool.',
  keywords: [
    'lorem ipsum generator',
    'placeholder text',
    'dummy text generator',
    'lorem ipsum',
    'text placeholder',
    'design text',
    'filler text',
    'online lorem ipsum',
    'free lorem ipsum',
    'paragraph generator'
  ],
  openGraph: {
    title: 'Free Lorem Ipsum Generator - Placeholder Text Generator Online',
    description: 'Generate Lorem Ipsum placeholder text for your design and development projects. Customize paragraph count and get randomized text instantly with our free online tool.',
    url: 'https://freedevtools.dev/tools/lorem-ipsum',
    siteName: 'Free Developer Tools',
    images: [
      {
        url: 'https://freedevtools.dev/og-lorem-ipsum.png',
        width: 1200,
        height: 630,
        alt: 'Lorem Ipsum Generator Tool'
      }
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Lorem Ipsum Generator - Placeholder Text Generator Online',
    description: 'Generate Lorem Ipsum placeholder text for your design and development projects. Customize paragraph count and get randomized text instantly with our free online tool.',
    images: ['https://freedevtools.dev/og-lorem-ipsum.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://freedevtools.dev/tools/lorem-ipsum',
  }
};

// Server component that renders the client component
export default function LoremIpsumPage() {
  return <LoremIpsumClient />;
}