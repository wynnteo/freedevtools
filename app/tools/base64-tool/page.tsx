import { Metadata } from 'next';
import Base64ToolClient from './Base64ToolClient';

export const metadata: Metadata = {
  title: 'Free Base64 Encoder Decoder - Convert Text & Files Online | Free Developer Tools',
  description: 'Free online Base64 encoder and decoder tool. Convert text to Base64, decode Base64 strings, and handle file uploads with UTF-8 and ASCII support. No registration required.',
  keywords: [
    'base64 encoder',
    'base64 decoder',
    'base64 converter',
    'encode base64',
    'decode base64',
    'base64 tool',
    'file to base64',
    'base64 to file',
    'utf-8 base64',
    'ascii base64',
    'online base64',
    'base64 generator'
  ],
  openGraph: {
    title: 'Free Base64 Encoder Decoder - Convert Text & Files Online',
    description: 'Free online Base64 encoder and decoder tool. Convert text to Base64, decode Base64 strings, and handle file uploads with UTF-8 and ASCII support. No registration required.',
    url: 'https://freedevtools.dev/tools/base64-tool',
    siteName: 'Free Developer Tools',
    images: [
      {
        url: 'https://freedevtools.dev/og-base64-tool.png',
        width: 1200,
        height: 630,
        alt: 'Base64 Encoder Decoder Tool'
      }
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Base64 Encoder Decoder - Convert Text & Files Online',
    description: 'Free online Base64 encoder and decoder tool. Convert text to Base64, decode Base64 strings, and handle file uploads with UTF-8 and ASCII support. No registration required.',
    images: ['https://freedevtools.dev/og-base64-tool.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://freedevtools.dev/tools/base64-tool',
  }
};

// Server component that renders the client component
export default function Base64ToolPage() {
  return <Base64ToolClient />;
}