import { Metadata } from 'next';
import HtmlEncoderDecoderClient from './HtmlEncoderDecoderClient';

export const metadata: Metadata = {
  title: 'Free HTML Encoder/Decoder - Encode & Decode HTML Entities Online | Free Developer Tools',
  description: 'Encode and decode HTML entities for safe web content display. Free online HTML encoder/decoder with formatting options for developers and content creators.',
  keywords: [
    'html encoder',
    'html decoder',
    'html entity encoder',
    'html entity decoder',
    'html entities',
    'html escape',
    'html unescape',
    'web security',
    'xss prevention',
    'html formatter',
    'html beautifier',
    'html minifier'
  ],
  openGraph: {
    title: 'Free HTML Encoder/Decoder - Encode & Decode HTML Entities Online',
    description: 'Encode and decode HTML entities for safe web content display. Free online HTML encoder/decoder with formatting options for developers and content creators.',
    url: 'https://freedevtools.dev/tools/html-encoder-decoder',
    siteName: 'Free Developer Tools',
    images: [
      {
        url: 'https://freedevtools.dev/og-html-encoder-decoder.png',
        width: 1200,
        height: 630,
        alt: 'HTML Encoder/Decoder Tool'
      }
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free HTML Encoder/Decoder - Encode & Decode HTML Entities Online',
    description: 'Encode and decode HTML entities for safe web content display. Free online HTML encoder/decoder with formatting options for developers and content creators.',
    images: ['https://freedevtools.dev/og-html-encoder-decoder.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://freedevtools.dev/tools/html-encoder-decoder',
  }
};

export default function HtmlEncoderDecoderPage() {
  return <HtmlEncoderDecoderClient />;
}