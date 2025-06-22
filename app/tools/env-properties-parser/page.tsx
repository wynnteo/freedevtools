import { Metadata } from 'next';
import EnvPropertiesParserClient from './EnvPropertiesParserClient';

export const metadata: Metadata = {
  title: 'Free .env & Properties Parser - Convert Environment Variables & Java Properties | Free Developer Tools',
  description: 'Parse and convert .env files and Java properties files between JSON, YAML, and key-value formats. Free online tool to validate environment variables and configuration files with auto-detection.',
  keywords: [
    'env parser',
    'properties parser',
    'env formatter',
    'java properties',
    'environment variables',
    'env to json',
    'properties to json',
    'env to yaml',
    'properties to yaml',
    'dotenv parser',
    'config parser',
    'environment file converter',
    'properties file converter',
    'env file validator',
    'properties file validator',
    'java config parser',
    'application properties',
    'free env tool',
    'free properties tool',
    'config file converter'
  ],
  openGraph: {
    title: 'Free .env & Properties Parser - Convert Environment Variables & Java Properties',
    description: 'Parse and convert .env files and Java properties files between JSON, YAML, and key-value formats. Free online tool with auto-detection and validation.',
    url: 'https://freedevtools.dev/tools/env-properties-parser',
    siteName: 'Free Developer Tools',
    images: [
      {
        url: 'https://freedevtools.dev/og-env-parser.png',
        width: 1200,
        height: 630,
        alt: 'Env & Properties Parser Tool'
      }
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free .env & Properties Parser - Convert Environment Variables & Java Properties',
    description: 'Parse and convert .env files and Java properties files between JSON, YAML, and key-value formats. Free online tool with auto-detection and validation.',
    images: ['https://freedevtools.dev/og-env-parser.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://freedevtools.dev/tools/env-properties-parser',
  }
};

// Server component that renders the client component
export default function EnvParserPage() {
  return <EnvPropertiesParserClient />;
}