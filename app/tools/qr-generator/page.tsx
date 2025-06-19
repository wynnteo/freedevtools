import { Metadata } from 'next';
import QrGeneratorClient from './QrGeneratorClient';

export const metadata: Metadata = {
  title: 'Free QR Code Generator - Create Custom QR Codes Online | Free Developer Tools',
  description: 'Generate custom QR codes for URLs, text, WiFi, and more with our free online QR code generator. Customizable colors, sizes, and error correction levels.',
  keywords: [
    'qr code generator',
    'qr generator',
    'create qr code',
    'qr code maker',
    'qr scanner',
    'qr code creator',
    'custom qr code',
    'wifi qr code',
    'url qr code',
    'vcard qr code',
    'free qr generator',
    'online qr generator'
  ],
  openGraph: {
    title: 'Free QR Code Generator - Create Custom QR Codes Online',
    description: 'Generate custom QR codes for URLs, text, WiFi, and more with our free online QR code generator. Customizable colors, sizes, and error correction levels.',
    url: 'https://freedevtools.dev/tools/qr-generator',
    siteName: 'Free Developer Tools',
    images: [
      {
        url: 'https://freedevtools.dev/og-qr-generator.png',
        width: 1200,
        height: 630,
        alt: 'QR Code Generator Tool'
      }
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free QR Code Generator - Create Custom QR Codes Online',
    description: 'Generate custom QR codes for URLs, text, WiFi, and more with our free online QR code generator. Customizable colors, sizes, and error correction levels.',
    images: ['https://freedevtools.dev/og-qr-generator.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://freedevtools.dev/tools/qr-generator',
  }
};

export default function QrGeneratorPage() {
  return <QrGeneratorClient />;
}