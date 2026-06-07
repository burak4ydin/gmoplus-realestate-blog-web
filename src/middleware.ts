import { NextRequest, NextResponse } from 'next/server';

const SUPPORTED_LANGS = ['tr', 'en', 'de', 'fr', 'es', 'ru'];

export function middleware(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const langParam = searchParams.get('language');

  // If ?language= query param present, set cookie and redirect without param
  if (langParam !== null) {
    const lang = SUPPORTED_LANGS.includes(langParam) ? langParam : '';
    const url = request.nextUrl.clone();
    url.searchParams.delete('language');
    const response = NextResponse.redirect(url);
    if (lang) {
      response.cookies.set('language', lang, {
        maxAge: 60 * 60 * 24 * 365, // 1 year
        path: '/',
        sameSite: 'lax',
      });
    } else {
      response.cookies.delete('language');
    }
    return response;
  }

  // Pass x-language header from cookie for server components
  const cookieLang = request.cookies.get('language')?.value;
  if (cookieLang && SUPPORTED_LANGS.includes(cookieLang)) {
    const response = NextResponse.next();
    response.headers.set('x-language', cookieLang);
    return response;
  }

  // Auto-detect from Accept-Language header as fallback
  const acceptLang = request.headers.get('accept-language') || '';
  const detected = SUPPORTED_LANGS.find(l => acceptLang.toLowerCase().includes(l));

  if (detected) {
    const response = NextResponse.next();
    response.headers.set('x-language', detected);
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|logo.png|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
