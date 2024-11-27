import './globals.css';
import styles from './styles.module.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Reflections | Elevate Your Conversations',
  description:
    'Discover profound questions that spark meaningful dialogues and deep self-reflection.',
  openGraph: {
    title: 'Reflections | Elevate Your Conversations',
    description:
      'Discover profound questions that spark meaningful dialogues and deep self-reflection.',
    images: [{ url: '/og-image.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reflections | Elevate Your Conversations',
    description:
      'Discover profound questions that spark meaningful dialogues and deep self-reflection.',
    images: ['/og-image.png'],
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
      </body>
    </html>
  );
}
