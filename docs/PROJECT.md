# gmoplus-realestate-blog-web

## What It Does
Static blog frontend for the GMOPlus Real Estate vertical. Displays property market news, buying/renting guides, investment analysis, and neighborhood spotlights published via the shared gmoplus-blog-api. Read-only; drives SEO traffic to realestate.gmoplus.com.

## Who Uses It
- Public readers (buyers, renters, investors) arriving from search engines
- Editorial team publishes via admin panel; content appears here automatically

## Key Features
- Multilingual (TR/EN) via next-intl
- Article listing with category, tag, and author pages
- Full-text search
- DOMPurify-sanitized HTML rendering
- @tailwindcss/typography styled prose

## Business Flow
1. Editor publishes property market article in admin panel
2. Article served from blog-api
3. Reader arrives from search or realestate.gmoplus.com blog link
4. CTAs link back to realestate.gmoplus.com listings and guides

## Success Criteria
- Article pages indexed by search engines (sitemap, meta tags present)
- No unsanitized HTML in DOM
- Port conflict with realestate-web resolved (both cannot run on 3013)