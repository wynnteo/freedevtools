import { Metadata } from 'next';
import PasswordGeneratorClient from './PasswordGeneratorClient';

export const metadata: Metadata = {
  title: 'Free Password Generator - Create Secure Random Passwords | Free Developer Tools',
  description: 'Generate strong, secure passwords instantly with our free online password generator. Customize length, character sets, and create uncrackable passwords for maximum security.',
  keywords: [
    'password generator',
    'secure password',
    'random password',
    'strong password generator',
    'password creator',
    'secure password generator',
    'online password tool',
    'free password generator'
  ],
  openGraph: {
    title: 'Free Password Generator - Create Secure Random Passwords',
    description: 'Generate strong, secure passwords instantly with our free online password generator. Customize length, character sets, and create uncrackable passwords for maximum security.',
    url: 'https://freedevtools.dev/tools/password-generator',
    siteName: 'Free Developer Tools',
    images: [
      {
        url: 'https://freedevtools.dev/og-password-generator.png',
        width: 1200,
        height: 630,
        alt: 'Password Generator Tool'
      }
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Password Generator - Create Secure Random Passwords',
    description: 'Generate strong, secure passwords instantly with our free online password generator. Customize length, character sets, and create uncrackable passwords for maximum security.',
    images: ['https://freedevtools.dev/og-password-generator.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://freedevtools.dev/tools/password-generator',
  }
};

// Server component that renders the client component
export default function PasswordGeneratorPage() {
  return <PasswordGeneratorClient />;
}