import { Metadata } from 'next';
import DiffCheckerClient from './DiffCheckerClient';

export const metadata: Metadata = {
  title: 'Free Text Diff Checker - Compare Two Texts Online | Free Developer Tools',
  description: 'Compare two texts and highlight differences instantly with our free online diff checker. Perfect for code changes, document revisions, and content updates with character or line-level precision.',
  keywords: [
    'text diff checker',
    'compare text',
    'text comparison tool',
    'diff tool',
    'text difference checker',
    'code diff',
    'document comparison',
    'online diff checker',
    'free text diff',
    'text merge tool'
  ],
  openGraph: {
    title: 'Free Text Diff Checker - Compare Two Texts Online',
    description: 'Compare two texts and highlight differences instantly with our free online diff checker. Perfect for code changes, document revisions, and content updates with character or line-level precision.',
    url: 'https://freedevtools.dev/tools/diff-checker',
    siteName: 'Free Developer Tools',
    images: [
      {
        url: 'https://freedevtools.dev/og-diff-checker.png',
        width: 1200,
        height: 630,
        alt: 'Text Diff Checker Tool'
      }
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Text Diff Checker - Compare Two Texts Online',
    description: 'Compare two texts and highlight differences instantly with our free online diff checker. Perfect for code changes, document revisions, and content updates with character or line-level precision.',
    images: ['https://freedevtools.dev/og-diff-checker.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://freedevtools.dev/tools/diff-checker',
  }
};

// Server component that renders the client component
export default function DiffCheckerPage() {
  return <DiffCheckerClient />;
}