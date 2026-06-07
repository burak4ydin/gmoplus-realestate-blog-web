import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { BlogHeader } from '@/components/layout/BlogHeader';
import { BlogFooter } from '@/components/layout/BlogFooter';
import { getVerticalConfig } from '@/lib/vertical-config';

const VERTICAL = 'realestate';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const config = getVerticalConfig(VERTICAL);

  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL || 'https://realestate.gmoplus.com'
    ),
    title: {
      default: `${config.name} — ${config.tagline}`,
      template: `%s — ${config.name}`,
    },
    description: `Your trusted source for the latest ${config.tagline.toLowerCase()} on ${config.name}.`,
    icons: {
      icon: '/favicon.ico',
      apple: '/logo.png',
    },
    openGraph: {
      siteName: config.name,
      locale: locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://realestate.gmoplus.com'}/${locale}`,
      languages: Object.fromEntries(
        routing.locales.map((l) => [
          l,
          `${process.env.NEXT_PUBLIC_SITE_URL || 'https://realestate.gmoplus.com'}/${l}`,
        ])
      ),
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <BlogHeader vertical={VERTICAL} language={locale} />
      <main className="flex-1">{children}</main>
      <BlogFooter language={locale} />
    </NextIntlClientProvider>
  );
}