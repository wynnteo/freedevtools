import { Metadata } from 'next';
import JsonFormatterClient from './JsonFormatterClient';

export const metadata: Metadata = {
  title: 'Free JSON Formatter & Validator - Format, Validate & Convert JSON Online | Free Developer Tools',
  description: 'Free online JSON formatter, validator, and converter. Format JSON, convert to YAML/CSV, validate syntax, and beautify JSON data with syntax highlighting.',
  keywords: [
    'json formatter',
    'json validator',
    'json beautifier',
    'json to yaml',
    'json to csv',
    'json converter',
    'json parser',
    'json minifier',
    'json syntax checker',
    'online json formatter',
    'free json formatter',
    'json pretty print'
  ],
  openGraph: {
    title: 'Free JSON Formatter & Validator - Format, Validate & Convert JSON Online',
    description: 'Free online JSON formatter, validator, and converter. Format JSON, convert to YAML/CSV, validate syntax, and beautify JSON data with syntax highlighting.',
    url: 'https://freedevtools.dev/tools/json-formatter',
    siteName: 'Free Developer Tools',
    images: [
      {
        url: 'https://freedevtools.dev/og-json-formatter.png',
        width: 1200,
        height: 630,
        alt: 'JSON Formatter Tool'
      }
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free JSON Formatter & Validator - Format, Validate & Convert JSON Online',
    description: 'Free online JSON formatter, validator, and converter. Format JSON, convert to YAML/CSV, validate syntax, and beautify JSON data with syntax highlighting.',
    images: ['https://freedevtools.dev/og-json-formatter.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://freedevtools.dev/tools/json-formatter',
  }
};

// Server component that renders the client component
export default function JsonFormatterPage() {
  return <JsonFormatterClient />;
}