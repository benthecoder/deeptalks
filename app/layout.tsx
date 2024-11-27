import './globals.css';
import styles from './styles.module.css';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'deeptalks',
  description:
    'Discover profound questions that spark meaningful dialogues and deep self-reflection.',
  metadataBase: new URL('https://deeptalks.vercel.app'),
  openGraph: {
    title: 'deeptalks',
    description:
      'Discover profound questions that spark meaningful dialogues and deep self-reflection.',
    type: 'website',
    locale: 'en_US',
    url: 'https://deeptalks.vercel.app',
    siteName: 'deeptalks',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'deeptalks',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'deeptalks',
    description:
      'Discover profound questions that spark meaningful dialogues and deep self-reflection.',
    creator: '@benxneo',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'deeptalks',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${styles.defaultBackground}`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
