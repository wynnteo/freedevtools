import { Metadata } from 'next';
import CssFormatterClient from './CssFormatterClient';

export const metadata: Metadata = {
  title: 'Free CSS Formatter & Beautifier - Format, Minify & Validate CSS Online | Free Developer Tools',
  description: 'Free online CSS formatter, beautifier, and minifier. Format CSS code, minify for production, validate syntax, and improve code readability with syntax highlighting.',
  keywords: [
    'css formatter',
    'css beautifier',
    'css minifier',
    'css validator',
    'css compressor',
    'css optimizer',
    'css parser',
    'css syntax checker',
    'online css formatter',
    'free css formatter',
    'css pretty print',
    'css code formatter'
  ],
  openGraph: {
    title: 'Free CSS Formatter & Beautifier - Format, Minify & Validate CSS Online',
    description: 'Free online CSS formatter, beautifier, and minifier. Format CSS code, minify for production, validate syntax, and improve code readability with syntax highlighting.',
    url: 'https://freedevtools.dev/tools/css-formatter',
    siteName: 'Free Developer Tools',
    images: [
      {
        url: 'https://freedevtools.dev/og-css-formatter.png',
        width: 1200,
        height: 630,
        alt: 'CSS Formatter Tool'
      }
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free CSS Formatter & Beautifier - Format, Minify & Validate CSS Online',
    description: 'Free online CSS formatter, beautifier, and minifier. Format CSS code, minify for production, validate syntax, and improve code readability with syntax highlighting.',
    images: ['https://freedevtools.dev/og-css-formatter.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://freedevtools.dev/tools/css-formatter',
  }
};

// Server component that renders the client component
export default function CssFormatterPage() {
  return <CssFormatterClient />;
}