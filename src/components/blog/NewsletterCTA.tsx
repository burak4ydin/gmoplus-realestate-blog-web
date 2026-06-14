'use client';

import { useState } from 'react';
import { t } from '@/lib/translations';

export function NewsletterCTA({ variant = 'sidebar', language }: { variant?: 'sidebar' | 'inline'; language?: string }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || loading) return;
    setLoading(true);
    try {
      await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  if (variant === 'inline') {
    return (
      <section className="relative bg-gradient-to-r from-brand-600 to-brand-800 rounded-2xl overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 400 200" fill="none"><circle cx="350" cy="30" r="100" fill="white"/><circle cx="50" cy="170" r="80" fill="white"/></svg>
        </div>
        <div className="relative px-6 py-10 sm:px-10 sm:py-12 text-center">
          <div className="inline-flex items-center gap-1.5 text-brand-200 text-xs font-semibold uppercase tracking-widest mb-3">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
            {t(language ?? 'tr', 'newsletter')}
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">{t(language ?? 'tr', 'stayAhead')}</h2>
          <p className="text-brand-200 text-sm sm:text-base mb-6 max-w-md mx-auto">
            {t(language ?? 'tr', 'weeklyInsights')}
          </p>
          {submitted ? (
            <div className="inline-flex items-center gap-2 text-white font-medium bg-white/15 backdrop-blur-sm px-6 py-3 rounded-xl">
              <svg className="w-5 h-5 text-green-300" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              {t(language ?? 'tr', 'subscribed')}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-brand-300 focus:outline-none focus:ring-2 focus:ring-white/40 text-sm"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-white text-brand-700 rounded-xl font-semibold text-sm hover:bg-brand-50 transition-colors shrink-0"
              >
                {t(language ?? 'tr', 'subscribe')}
              </button>
            </form>
          )}
          <p className="text-[11px] text-brand-300 mt-3">{t(language ?? 'tr', 'noSpam')}</p>
        </div>
      </section>
    );
  }

  // Sidebar variant
  return (
    <div className="bg-gradient-to-br from-brand-600 to-brand-700 rounded-xl p-5 text-white">
      <div className="flex items-center gap-2 mb-2">
        <svg className="w-5 h-5 text-brand-200" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
        <h3 className="text-base font-bold">{t(language ?? 'tr', 'newsletter')}</h3>
      </div>
      <p className="text-brand-100 text-sm mb-4 leading-relaxed">
        {t(language ?? 'tr', 'sidebarNewsletter')}
      </p>
      {submitted ? (
        <div className="flex items-center gap-2 text-sm text-white/90 bg-white/10 rounded-lg px-3 py-2">
          <svg className="w-4 h-4 text-green-300" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
          {t(language ?? 'tr', 'subscribed')}
        </div>
      ) : (
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-brand-200 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm"
          />
          <button
            type="submit"
            className="w-full py-2.5 bg-white text-brand-700 rounded-lg font-semibold text-sm hover:bg-brand-50 transition-colors"
          >
            {t(language ?? 'tr', 'subscribe')}
          </button>
        </form>
      )}
    </div>
  );
}
