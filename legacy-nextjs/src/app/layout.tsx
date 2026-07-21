import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Cursor from '@/components/ui/Cursor';
import LoadingScreen from '@/components/ui/LoadingScreen';

export const metadata: Metadata = {
  title: 'Bhoomik Sevta | AI-ML Developer & Full-Stack Engineer',
  description:
    'Portfolio of Bhoomik Sevta — an AI-ML Developer and Full-Stack Engineer building intelligent systems and immersive web experiences.',
  keywords: ['Bhoomik Sevta', 'AI Developer', 'ML Engineer', 'Full-Stack', 'Portfolio', 'React', 'Next.js'],
  authors: [{ name: 'Bhoomik Sevta' }],
  openGraph: {
    title: 'Bhoomik Sevta | AI-ML Developer & Full-Stack Engineer',
    description: 'Building intelligent systems and immersive web experiences.',
    type: 'website',
    siteName: 'Bhoomik Sevta Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bhoomik Sevta | AI-ML Developer',
    description: 'Building intelligent systems and immersive web experiences.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="theme-color" content="#080B14" />
        {/* Stealth Umami Analytics Script */}
        <script
          defer
          src="/api/metrics/script.js"
          data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
        ></script>
      </head>
      <body>
        <LoadingScreen />
        <div className="bg-grid" aria-hidden="true" />
        <div className="bg-noise" aria-hidden="true" />
        <Cursor />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
