import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "GMOPlus Emlak Blog", template: "%s | GMOPlus Emlak Blog" },
  description: "GMOPlus Emlak Blog — Gayrimenkul haberleri, ev satın alma rehberleri, piyasa analizleri ve daha fazlası",
  openGraph: { siteName: "GMOPlus Emlak Blog", type: "website" },
  robots: { index: true, follow: true },
};

const LANGS = [
  { code: "tr", label: "TR" },
  { code: "en", label: "EN" },
  { code: "de", label: "DE" },
  { code: "fr", label: "FR" },
  { code: "es", label: "ES" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body className="bg-white text-gray-900 antialiased">
        <header className="border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur-sm z-40">
          <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
            <a href="/" className="font-bold text-lg text-gray-900 flex items-center gap-2">
              <span className="w-7 h-7 bg-emerald-600 rounded-lg flex items-center justify-center text-white text-xs font-black">E</span>
              GMOPlus <span className="text-emerald-600">Emlak Blog</span>
            </a>
            <nav className="flex items-center gap-4 text-sm text-gray-600">
              <a href="/" className="hover:text-gray-900 transition-colors">Ana Sayfa</a>
              <a href="/kategoriler" className="hover:text-gray-900 transition-colors">Kategoriler</a>
              <a href="https://realestate.gmoplus.com" className="hover:text-emerald-600 transition-colors text-emerald-500 font-medium">← Emlak</a>
              <div className="flex items-center gap-0 border border-gray-200 rounded-lg overflow-hidden">
                {LANGS.map((l) => (
                  <a
                    key={l.code}
                    href={`/?lang=${l.code}`}
                    className="px-2.5 py-1 text-xs font-medium hover:bg-emerald-50 hover:text-emerald-600 transition-colors border-r border-gray-100 last:border-0"
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            </nav>
          </div>
        </header>
        <main className="min-h-screen">{children}</main>
        <footer className="border-t border-gray-100 py-8 mt-16">
          <div className="max-w-5xl mx-auto px-4 text-center text-sm text-gray-400">
            © {new Date().getFullYear()} GMOPlus Emlak Blog ·{" "}
            <a href="https://realestate.gmoplus.com" className="hover:text-emerald-600 transition-colors">realestate.gmoplus.com</a>
          </div>
        </footer>
      </body>
    </html>
  );
}