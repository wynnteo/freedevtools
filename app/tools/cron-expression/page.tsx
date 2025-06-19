import { Metadata } from 'next';
import CronExpressionClient from './CronExpressionClient';

export const metadata: Metadata = {
  title: 'Free Cron Expression Builder - Visual Cron Generator Online | Free Developer Tools',
  description: 'Create and validate cron expressions with our free visual builder. Generate cron schedules for automated tasks, jobs, and system administration with real-time validation.',
  keywords: [
    'cron expression builder',
    'cron generator',
    'cron scheduler',
    'visual cron builder',
    'cron validator',
    'cron expression generator',
    'task scheduler',
    'automated jobs',
    'system administration',
    'unix cron',
    'linux cron',
    'cron tab',
    'job scheduler',
    'time-based scheduler'
  ],
  openGraph: {
    title: 'Free Cron Expression Builder - Visual Cron Generator Online',
    description: 'Create and validate cron expressions with our free visual builder. Generate cron schedules for automated tasks, jobs, and system administration with real-time validation.',
    url: 'https://freedevtools.dev/tools/cron-builder',
    siteName: 'Free Developer Tools',
    images: [
      {
        url: 'https://freedevtools.dev/og-cron-builder.png',
        width: 1200,
        height: 630,
        alt: 'Cron Expression Builder Tool'
      }
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Cron Expression Builder - Visual Cron Generator Online',
    description: 'Create and validate cron expressions with our free visual builder. Generate cron schedules for automated tasks, jobs, and system administration with real-time validation.',
    images: ['https://freedevtools.dev/og-cron-builder.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://freedevtools.dev/tools/cron-builder',
  }
};

// Server component that renders the client component
export default function CronBuilderPage() {
  return <CronExpressionClient />;
}