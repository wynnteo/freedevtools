import { Metadata } from 'next';
import ApiCodeGeneratorClient from './ApiCodeGeneratorClient';

// ✅ This works because this is a SERVER component
export const metadata: Metadata = {
  title: 'Free API Code Generator - Generate HTTP Request Code Snippets | Free Developer Tools',
  description: 'Generate ready-to-use API request code snippets in 10+ programming languages. Includes authentication, error handling, and TypeScript support. Free online tool for developers.',
  keywords: [
    'api code generator',
    'http request code',
    'api request generator',
    'code snippet generator',
    'rest api code',
    'fetch api code',
    'axios code generator',
    'curl generator',
    'python requests code',
    'javascript fetch',
    'typescript api',
    'api client code'
  ],
  openGraph: {
    title: 'Free API Code Generator - Generate HTTP Request Code Snippets',
    description: 'Generate ready-to-use API request code snippets in 10+ programming languages. Includes authentication, error handling, and TypeScript support. Free online tool for developers.',
    url: 'https://freedevtools.dev/tools/api-code-generator',
    siteName: 'Free Developer Tools',
    images: [
      {
        url: 'https://freedevtools.dev/og-api-code-generator.png',
        width: 1200,
        height: 630,
        alt: 'API Code Generator Tool'
      }
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free API Code Generator - Generate HTTP Request Code Snippets',
    description: 'Generate ready-to-use API request code snippets in 10+ programming languages. Includes authentication, error handling, and TypeScript support.',
    images: ['https://freedevtools.dev/og-api-code-generator.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://freedevtools.dev/tools/api-code-generator',
  }
};

// Server component that renders the client component
export default function ApiCodeGeneratorPage() {
  return <ApiCodeGeneratorClient />;
}