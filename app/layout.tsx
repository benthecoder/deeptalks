import './globals.css';
import styles from '@/styles/styles.module.css';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { LanguageProvider } from './LanguageContext';
import { SITE_METADATA } from '@/lib/constants';

const inter = Inter({ subsets: ['latin'] });

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata = {
  title: SITE_METADATA.title,
  description: SITE_METADATA.description,
  metadataBase: new URL(SITE_METADATA.url),
  openGraph: {
    title: SITE_METADATA.title,
    description: SITE_METADATA.description,
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
    title: SITE_METADATA.title,
    description: SITE_METADATA.description,
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
        <LanguageProvider>
          {children}
          <Analytics />
        </LanguageProvider>
      </body>
    </html>
  );
}
