import { Metadata } from 'next';
import BcryptToolClient from './BcryptToolClient';

export const metadata: Metadata = {
  title: 'Free Bcrypt Hash Generator & Verifier - Secure Password Hashing | Free Developer Tools',
  description: 'Generate and verify secure bcrypt hashes for password protection. Free online bcrypt tool with customizable salt rounds and real-time hash generation.',
  keywords: [
    'bcrypt hash generator',
    'password hash generator',
    'bcrypt verifier',
    'secure password hashing',
    'bcrypt online tool',
    'password encryption',
    'hash generator',
    'bcrypt salt rounds',
    'password security',
    'bcrypt hash tool'
  ],
  openGraph: {
    title: 'Free Bcrypt Hash Generator & Verifier - Secure Password Hashing',
    description: 'Generate and verify secure bcrypt hashes for password protection. Free online bcrypt tool with customizable salt rounds and real-time hash generation.',
    url: 'https://freedevtools.dev/tools/bcrypt-tool',
    siteName: 'Free Developer Tools',
    images: [
      {
        url: 'https://freedevtools.dev/og-bcrypt-tool.png',
        width: 1200,
        height: 630,
        alt: 'Bcrypt Hash Generator Tool'
      }
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Bcrypt Hash Generator & Verifier - Secure Password Hashing',
    description: 'Generate and verify secure bcrypt hashes for password protection. Free online bcrypt tool with customizable salt rounds and real-time hash generation.',
    images: ['https://freedevtools.dev/og-bcrypt-tool.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://freedevtools.dev/tools/bcrypt-tool',
  }
};

// Server component that renders the client component
export default function BcryptToolPage() {
  return <BcryptToolClient />;
}