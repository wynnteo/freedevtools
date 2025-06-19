import { Metadata } from 'next';
import UrlEncoderDecoderClient from './UrlEncoderDecoderClient';

export const metadata: Metadata = {
  title: 'Free URL Encoder/Decoder - Encode & Decode URLs Online | Free Developer Tools',
  description: 'Encode and decode URLs for proper web transmission and display with our free online tool. Supports encodeURI, encodeURIComponent, and handles special characters safely.',
  keywords: [
    'url encoder',
    'url decoder',
    'url encoding',
    'url decoding',
    'percent encoding',
    'uri encoder',
    'uri decoder',
    'encodeURIComponent',
    'encodeURI',
    'online url encoder',
    'free url encoder',
    'url encode decode tool'
  ],
  openGraph: {
    title: 'Free URL Encoder/Decoder - Encode & Decode URLs Online',
    description: 'Encode and decode URLs for proper web transmission and display with our free online tool. Supports encodeURI, encodeURIComponent, and handles special characters safely.',
    url: 'https://freedevtools.dev/tools/url-encoder-decoder',
    siteName: 'Free Developer Tools',
    images: [
      {
        url: 'https://freedevtools.dev/og-url-encoder-decoder.png',
        width: 1200,
        height: 630,
        alt: 'URL Encoder/Decoder Tool'
      }
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free URL Encoder/Decoder - Encode & Decode URLs Online',
    description: 'Encode and decode URLs for proper web transmission and display with our free online tool. Supports encodeURI, encodeURIComponent, and handles special characters safely.',
    images: ['https://freedevtools.dev/og-url-encoder-decoder.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://freedevtools.dev/tools/url-encoder-decoder',
  }
};

export default function UrlEncoderDecoderPage() {
  return <UrlEncoderDecoderClient />;
}