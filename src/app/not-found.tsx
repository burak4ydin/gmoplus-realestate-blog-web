export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <p className="text-5xl font-black text-emerald-600 mb-4">404</p>
      <h1 className="text-2xl font-bold text-gray-900 mb-3">Sayfa Bulunamadı</h1>
      <p className="text-gray-500 mb-8">Aradığınız sayfa mevcut değil veya taşınmış olabilir.</p>
      <a
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors"
      >
        ← Ana Sayfaya Dön
      </a>
    </div>
  );
}
