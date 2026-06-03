import type { Metadata, Viewport } from 'next';
import { cookies, headers } from 'next/headers';
import { BlogHeader } from '@/components/layout/BlogHeader';
import { BlogFooter } from '@/components/layout/BlogFooter';
import { getVerticalConfig } from '@/lib/vertical-config';
import './globals.css';

const VERTICAL = 'realestate';

export async function generateMetadata(): Promise<Metadata> {
  const config = getVerticalConfig(VERTICAL);

  return {
    title: {
      default: `${config.name} — ${config.tagline}`,
      template: `%s — ${config.name}`,
    },
    description: `Your trusted source for the latest ${config.tagline.toLowerCase()} on ${config.name}.`,
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL || 'https://realestate-blog.gmoplus.com',
    ),
    icons: {
      icon: '/favicon.ico',
      apple: '/logo.png',
    },
    openGraph: {
      siteName: config.name,
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#EA580C',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const headersList = await headers();
  const language = headersList.get('x-language') || cookieStore.get('language')?.value;

  return (
    <html lang={language || 'tr'}>
      <body className="bg-gray-50 text-gray-900 min-h-screen flex flex-col">
        <BlogHeader vertical={VERTICAL} language={language} />
        <main className="flex-1">{children}</main>
        <BlogFooter language={language} />
      </body>
    </html>
  );
}