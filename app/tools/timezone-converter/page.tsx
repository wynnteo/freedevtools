import { Metadata } from 'next';
import TimeZoneConverterClient from './TimeZoneConverterClient';

export const metadata: Metadata = {
  title: 'Free Time Zone Converter - World Clock & Epoch Time Converter Online | Free Developer Tools',
  description: 'Convert time zones instantly with our free online tool. World clock, epoch timestamp converter, and meeting time planner for remote teams and global collaboration.',
  keywords: [
    'time zone converter',
    'world clock',
    'epoch time converter',
    'timestamp converter',
    'UTC converter',
    'meeting time planner',
    'timezone tool',
    'global time',
    'remote team tools',
    'time conversion',
    'unix timestamp',
    'epoch timestamp',
    'world time zones',
    'international time',
    'scheduling tool',
    'time calculator'
  ],
  openGraph: {
    title: 'Free Time Zone Converter - World Clock & Epoch Time Converter Online',
    description: 'Convert time zones instantly with our free online tool. World clock, epoch timestamp converter, and meeting time planner for remote teams and global collaboration.',
    url: 'https://freedevtools.dev/tools/timezone-converter',
    siteName: 'Free Developer Tools',
    images: [
      {
        url: 'https://freedevtools.dev/og-timezone-converter.png',
        width: 1200,
        height: 630,
        alt: 'Time Zone Converter Tool'
      }
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Time Zone Converter - World Clock & Epoch Time Converter Online',
    description: 'Convert time zones instantly with our free online tool. World clock, epoch timestamp converter, and meeting time planner for remote teams and global collaboration.',
    images: ['https://freedevtools.dev/og-timezone-converter.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://freedevtools.dev/tools/timezone-converter',
  }
};

// Server component that renders the client component
export default function TimeZoneConverterPage() {
  return <TimeZoneConverterClient />;
}