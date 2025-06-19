import { Metadata } from 'next';
import MockJsonGeneratorClient from './MockJsonGeneratorClient';

export const metadata: Metadata = {
  title: 'Free Mock JSON API Generator - Create Test Data from Schema | Free Developer Tools',
  description: 'Generate realistic mock JSON data from schemas instantly. Perfect for API testing, development, and prototyping with customizable fake data generation.',
  keywords: [
    'mock json generator',
    'json mock data',
    'fake json data',
    'json schema generator',
    'api mock generator',
    'test data generator',
    'json faker',
    'mock api data',
    'json test data',
    'api testing tools',
    'development mock data',
    'json schema to data'
  ],
  openGraph: {
    title: 'Free Mock JSON API Generator - Create Test Data from Schema',
    description: 'Generate realistic mock JSON data from schemas instantly. Perfect for API testing, development, and prototyping with customizable fake data generation.',
    url: 'https://freedevtools.dev/tools/mock-json-generator',
    siteName: 'Free Developer Tools',
    images: [
      {
        url: 'https://freedevtools.dev/og-mock-json-generator.png',
        width: 1200,
        height: 630,
        alt: 'Mock JSON API Generator Tool'
      }
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Mock JSON API Generator - Create Test Data from Schema',
    description: 'Generate realistic mock JSON data from schemas instantly. Perfect for API testing, development, and prototyping with customizable fake data generation.',
    images: ['https://freedevtools.dev/og-mock-json-generator.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://freedevtools.dev/tools/mock-json-generator',
  }
};

// Server component that renders the client component
export default function MockJsonGeneratorPage() {
  return <MockJsonGeneratorClient />;
}