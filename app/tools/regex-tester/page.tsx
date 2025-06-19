import { Metadata } from 'next';
import RegexTesterClient from './RegexTesterClient';

export const metadata: Metadata = {
  title: 'Free Regex Tester & Debugger - Test Regular Expressions Online | Free Developer Tools',
  description: 'Test and debug regular expressions with real-time matching, explanations, and common patterns. Free online regex tester with support for multiple flags and detailed match analysis.',
  keywords: [
    'regex tester',
    'regular expression tester',
    'regex debugger',
    'regex validator',
    'pattern matching',
    'regular expressions',
    'regex online tool',
    'regex match tester',
    'free regex tester',
    'regex pattern tester'
  ],
  openGraph: {
    title: 'Free Regex Tester & Debugger - Test Regular Expressions Online',
    description: 'Test and debug regular expressions with real-time matching, explanations, and common patterns. Free online regex tester with support for multiple flags and detailed match analysis.',
    url: 'https://freedevtools.dev/tools/regex-tester',
    siteName: 'Free Developer Tools',
    images: [
      {
        url: 'https://freedevtools.dev/og-regex-tester.png',
        width: 1200,
        height: 630,
        alt: 'Regex Tester & Debugger Tool'
      }
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Regex Tester & Debugger - Test Regular Expressions Online',
    description: 'Test and debug regular expressions with real-time matching, explanations, and common patterns. Free online regex tester with support for multiple flags and detailed match analysis.',
    images: ['https://freedevtools.dev/og-regex-tester.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://freedevtools.dev/tools/regex-tester',
  }
};

// Server component that renders the client component
export default function RegexTesterPage() {
  return <RegexTesterClient />;
}