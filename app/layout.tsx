import type { Metadata, Viewport } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { site } from '@/lib/site';
import { Providers } from '@/components/Providers';
import { BrandBackdrop } from '@/components/BrandBackdrop';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { Cursor } from '@/components/ui/Cursor';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: '%s — Arkar',
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    'software studio',
    'business systems',
    'CRM',
    'booking system',
    'automatic follow-ups',
    'custom software',
    'SaaS development',
    'Next.js',
    'Laravel',
    'UK software agency',
  ],
  openGraph: {
    type: 'website',
    siteName: site.name,
    locale: 'en_GB',
    url: site.url,
    title: site.title,
    description: site.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: site.title,
    description: site.description,
  },
  robots: { index: true, follow: true },
  alternates: { canonical: '/' },
};

export const viewport: Viewport = {
  themeColor: '#F0EDE8',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="min-h-dvh font-sans text-ink antialiased">
        <Providers>
          <a
            href="#main"
            className="sr-only z-[100] rounded-full bg-ink px-4 py-2 text-sm font-semibold text-cream focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
          >
            Skip to content
          </a>
          <BrandBackdrop />
          <Cursor />
          <Nav />
          <div className="relative z-10 flex min-h-dvh flex-col">
            <main id="main" className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
