import { Metadata } from 'next';
import ColorConverterClient from './ColorConverterClient';

export const metadata: Metadata = {
  title: 'Free Color Converter - HEX, RGB, HSL, CMYK Converter | Free Developer Tools',
  description: 'Convert colors between HEX, RGB, HSL, and CMYK formats instantly with our free online color converter. Perfect for web designers, developers, and graphic artists.',
  keywords: [
    'color converter',
    'hex to rgb',
    'rgb to hex',
    'hsl converter',
    'cmyk converter',
    'color format converter',
    'web color tool',
    'color picker',
    'color code converter',
    'hex color picker',
    'rgb color converter',
    'design tools'
  ],
  openGraph: {
    title: 'Free Color Converter - HEX, RGB, HSL, CMYK Converter',
    description: 'Convert colors between HEX, RGB, HSL, and CMYK formats instantly with our free online color converter. Perfect for web designers, developers, and graphic artists.',
    url: 'https://freedevtools.dev/tools/color-converter',
    siteName: 'Free Developer Tools',
    images: [
      {
        url: 'https://freedevtools.dev/og-color-converter.png',
        width: 1200,
        height: 630,
        alt: 'Color Converter Tool'
      }
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Color Converter - HEX, RGB, HSL, CMYK Converter',
    description: 'Convert colors between HEX, RGB, HSL, and CMYK formats instantly with our free online color converter. Perfect for web designers, developers, and graphic artists.',
    images: ['https://freedevtools.dev/og-color-converter.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://freedevtools.dev/tools/color-converter',
  }
};

// Server component that renders the client component
export default function ColorConverterPage() {
  return <ColorConverterClient />;
}