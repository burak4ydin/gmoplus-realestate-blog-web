import Link from 'next/link';
import { t } from '@/lib/translations';

const ECOSYSTEM_LINKS = [
  { label: 'GMOPlus Auto', href: 'https://auto.gmoplus.com' },
  { label: 'GMOPlus Jobs', href: 'https://jobs.gmoplus.com' },
  { label: 'GMOPlus Real Estate', href: 'https://realestate.gmoplus.com' },
  { label: 'GMOPlus Store', href: 'https://store.gmoplus.com' },
  { label: 'GMOPlus Academy', href: 'https://academy.gmoplus.com' },
];

const LEGAL_LINKS = [
  { labelKey: 'privacy', href: '/privacy' },
  { labelKey: 'terms', href: '/terms' },
  { labelKey: 'cookiePolicy', href: '/cookie-policy' },
  { labelKey: 'kvkk', href: '/kvkk' },
  { labelKey: 'security', href: '/security' },
];

export function BlogFooter({ language }: { language?: string }) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-400 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <img src="/logo.png" alt="GMOPlus" className="w-7 h-7" />
              <span className="font-bold text-white text-sm">GMOPlus Gayrimenkul Blog</span>
            </div>
            <p className="text-sm leading-relaxed">
              {t(language, 'blogDescription')}
            </p>
          </div>

          {/* Ecosystem */}
          <div>
            <h3 className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-4">
              {t(language, 'ecosystem')}
            </h3>
            <ul className="space-y-2">
              {ECOSYSTEM_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-4">
              {t(language, 'legal')}
            </h3>
            <ul className="space-y-2">
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {t(language, link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <span>© {year} GMOPlus Gayrimenkul Blog · {t(language, 'allRightsReserved')}</span>
          <a href="https://gmoplus.com" className="hover:text-white transition-colors">
            gmoplus.com
          </a>
        </div>
      </div>
    </footer>
  );
}