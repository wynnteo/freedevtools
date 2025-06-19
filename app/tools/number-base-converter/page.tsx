import { Metadata } from 'next';
import NumberBaseConverterClient from './NumberBaseConverterClient';

// ✅ This works because this is a SERVER component
export const metadata: Metadata = {
  title: 'Free Number Base Converter - Binary, Hex, Octal, Decimal Online | Free Developer Tools',
  description: 'Convert numbers between different bases instantly. Free online tool for binary, decimal, hexadecimal, octal conversions. Perfect for programming and math calculations.',
  keywords: [
    'number base converter',
    'binary converter',
    'hexadecimal converter',
    'octal converter',
    'decimal converter',
    'base conversion',
    'binary to decimal',
    'hex to decimal',
    'octal to decimal',
    'programming tools',
    'number system converter',
    'radix converter',
    'base 2 converter',
    'base 8 converter',
    'base 10 converter',
    'base 16 converter'
  ],
  openGraph: {
    title: 'Free Number Base Converter - Binary, Hex, Octal, Decimal Online',
    description: 'Convert numbers between different bases instantly. Free online tool for binary, decimal, hexadecimal, octal conversions. Perfect for programming and math calculations.',
    url: 'https://freedevtools.dev/tools/number-base-converter',
    siteName: 'Free Developer Tools',
    images: [
      {
        url: 'https://freedevtools.dev/og-number-base-converter.png',
        width: 1200,
        height: 630,
        alt: 'Number Base Converter Tool'
      }
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Number Base Converter - Binary, Hex, Octal, Decimal Online',
    description: 'Convert numbers between different bases instantly. Free online tool for binary, decimal, hexadecimal, octal conversions. Perfect for programming and math calculations.',
    images: ['https://freedevtools.dev/og-number-base-converter.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://freedevtools.dev/tools/number-base-converter',
  }
};

// Server component that renders the client component
export default function NumberBaseConverterPage() {
  return <NumberBaseConverterClient />;
}