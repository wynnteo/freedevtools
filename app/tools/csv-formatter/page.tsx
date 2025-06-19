import { Metadata } from 'next';
import CsvFormatterClient from './CsvFormatterClient';

export const metadata: Metadata = {
  title: 'Free CSV Formatter & Converter - Format, Validate & Convert CSV Online | Free Developer Tools',
  description: 'Free online CSV formatter, validator, and converter. Format CSV data, convert to JSON/TSV, validate syntax, and process spreadsheet data with custom delimiters.',
  keywords: [
    'csv formatter',
    'csv validator',
    'csv converter',
    'csv to json',
    'csv to tsv',
    'csv parser',
    'csv processor',
    'spreadsheet formatter',
    'data converter',
    'online csv formatter',
    'free csv formatter',
    'csv syntax checker',
    'delimiter converter',
    'csv beautifier'
  ],
  openGraph: {
    title: 'Free CSV Formatter & Converter - Format, Validate & Convert CSV Online',
    description: 'Free online CSV formatter, validator, and converter. Format CSV data, convert to JSON/TSV, validate syntax, and process spreadsheet data with custom delimiters.',
    url: 'https://freedevtools.dev/tools/csv-formatter',
    siteName: 'Free Developer Tools',
    images: [
      {
        url: 'https://freedevtools.dev/og-csv-formatter.png',
        width: 1200,
        height: 630,
        alt: 'CSV Formatter Tool'
      }
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free CSV Formatter & Converter - Format, Validate & Convert CSV Online',
    description: 'Free online CSV formatter, validator, and converter. Format CSV data, convert to JSON/TSV, validate syntax, and process spreadsheet data with custom delimiters.',
    images: ['https://freedevtools.dev/og-csv-formatter.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://freedevtools.dev/tools/csv-formatter',
  }
};

// Server component that renders the client component
export default function CsvFormatterPage() {
  return <CsvFormatterClient />;
}