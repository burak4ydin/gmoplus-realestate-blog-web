import { blogApi } from "@/lib/api";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kategoriler",
  description: "GMOPlus Emlak Blog kategorileri",
};

export const revalidate = 300;

export default async function KategorilerPage() {
  let categories: any[] = [];
  try {
    categories = await blogApi.getCategories();
  } catch {}

  return (
    <div className="max-w-3xl mx-realestate px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Kategoriler</h1>
      {categories.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-2xl mb-2">🗂️</p>
          <p>Henüz kategori yok</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {categories.map((cat: any) => (
            <Link
              key={cat._id}
              href={`/?category=${cat._id}`}
              className="block p-4 rounded-xl border border-gray-100 hover:border-emerald-200 hover:bg-emerald-50 transition-colors group"
            >
              <p className="font-semibold text-gray-800 group-hover:text-emerald-700 mb-1">{cat.name}</p>
              {cat.description && <p className="text-xs text-gray-500 line-clamp-2">{cat.description}</p>}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}