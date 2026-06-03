export interface VerticalConfig {
  key: string;
  name: string;
  tagline: string;
  color: string;        // Tailwind class suffix (e.g. 'blue'  text-blue-600)
  colorHex: string;     // Hex for dynamic styles
  mainSiteUrl: string;  // Main site URL for this vertical
  navLinks: { label: string; href: string }[];
}

export const VERTICALS: Record<string, VerticalConfig> = {
  auto: {
    key: 'auto',
    name: 'GMOPlus Auto',
    tagline: 'Automotive News, Reviews & Tips',
    color: 'blue',
    colorHex: '#2563EB',
    mainSiteUrl: 'https://auto.gmoplus.com',
    navLinks: [
      { label: 'Reviews', href: '/category/car-reviews' },
      { label: 'News', href: '/category/industry-news' },
      { label: 'Guides', href: '/category/buying-guides' },
      { label: 'EV', href: '/category/electric-vehicles' },
      { label: 'Tips', href: '/category/maintenance-tips' },
      { label: 'Motorsport', href: '/category/motorsport' },
    ],
  },
  store: {
    key: 'store',
    name: 'GMOPlus Store',
    tagline: 'Shopping Guides & Product Reviews',
    color: 'green',
    colorHex: '#16A34A',
    mainSiteUrl: 'https://store.gmoplus.com',
    navLinks: [
      { label: 'Guides', href: '/category/buying-guides' },
      { label: 'Deals', href: '/category/deals' },
      { label: 'Reviews', href: '/category/product-reviews' },
    ],
  },
  online: {
    key: 'online',
    name: 'GMOPlus Blog',
    tagline: 'Platform News & Updates',
    color: 'brand',
    colorHex: '#2563EB',
    mainSiteUrl: 'https://online.gmoplus.com',
    navLinks: [
      { label: 'News', href: '/category/industry-news' },
      { label: 'GMOPLUSJET', href: '/category/gmoplusjet' },
      { label: 'Updates', href: '/category/platform-updates' },
    ],
  },
  social: {
    key: 'social',
    name: 'GMOPlus Social',
    tagline: 'Social Network Insights',
    color: 'purple',
    colorHex: '#9333EA',
    mainSiteUrl: 'https://gmoplusx.com',
    navLinks: [
      { label: 'Tips', href: '/category/social-tips' },
      { label: 'Updates', href: '/category/platform-updates' },
    ],
  },
  realestate: {
    key: 'realestate',
    name: 'GMOPlus Real Estate',
    tagline: 'Property News & Market Analysis',
    color: 'orange',
    colorHex: '#EA580C',
    mainSiteUrl: 'https://realestate.gmoplus.com',
    navLinks: [
      { label: 'Market', href: '/category/market-analysis' },
      { label: 'Guides', href: '/category/buying-guides' },
      { label: 'Tips', href: '/category/property-tips' },
    ],
  },
  jobs: {
    key: 'jobs',
    name: 'GMOPlus Jobs',
    tagline: 'Career Advice & Industry Insights',
    color: 'teal',
    colorHex: '#0D9488',
    mainSiteUrl: 'https://jobs.gmoplus.com',
    navLinks: [
      { label: 'Career', href: '/category/career-advice' },
      { label: 'Industry', href: '/category/industry-insights' },
    ],
  },
  booking: {
    key: 'booking',
    name: 'GMOPlus Booking',
    tagline: 'Travel & Hospitality Insights',
    color: 'sky',
    colorHex: '#0284C7',
    mainSiteUrl: 'https://booking.gmoplus.com',
    navLinks: [
      { label: 'Travel', href: '/category/travel-guides' },
      { label: 'Tips', href: '/category/booking-tips' },
    ],
  },
  academy: {
    key: 'academy',
    name: 'GMOPlus Academy',
    tagline: 'Learning & Education',
    color: 'indigo',
    colorHex: '#4F46E5',
    mainSiteUrl: 'https://academy.gmoplus.com',
    navLinks: [
      { label: 'Courses', href: '/category/courses' },
      { label: 'Tutorials', href: '/category/tutorials' },
    ],
  },
  franchise: {
    key: 'franchise',
    name: 'GMOPlus Franchise',
    tagline: 'Business & Franchise Opportunities',
    color: 'amber',
    colorHex: '#D97706',
    mainSiteUrl: 'https://franchise.gmoplus.com',
    navLinks: [
      { label: 'Business', href: '/category/business-tips' },
      { label: 'Franchise', href: '/category/franchise-news' },
    ],
  },
  global: {
    key: 'global',
    name: 'GMOPlus Global',
    tagline: 'International Trade & Business',
    color: 'slate',
    colorHex: '#0F172A',
    mainSiteUrl: 'https://global.gmoplus.com',
    navLinks: [
      { label: 'Trade', href: '/category/trade-news' },
      { label: 'Markets', href: '/category/markets' },
    ],
  },
  mobil: {
    key: 'mobil',
    name: 'GMOPlus Mobil',
    tagline: 'Mobile & App Insights',
    color: 'orange',
    colorHex: '#F97316',
    mainSiteUrl: 'https://mobil.gmoplus.com',
    navLinks: [
      { label: 'Apps', href: '/category/apps' },
      { label: 'Reviews', href: '/category/reviews' },
    ],
  },
  general: {
    key: 'general',
    name: 'GMOPlus Blog',
    tagline: 'Ecosystem News & Cross-Vertical Insights',
    color: 'brand',
    colorHex: '#2563EB',
    mainSiteUrl: 'https://gmoplus.com',
    navLinks: [
      { label: 'News', href: '/category/news' },
      { label: 'Updates', href: '/category/platform-updates' },
    ],
  },
  gmoplusx: {
    key: 'gmoplusx',
    name: 'GMOPlus X',
    tagline: 'Social Hub News & Features',
    color: 'purple',
    colorHex: '#6366F1',
    mainSiteUrl: 'https://gmoplusx.com',
    navLinks: [
      { label: 'Features', href: '/category/features' },
      { label: 'Community', href: '/category/community' },
    ],
  },
};

export function getVerticalConfig(vertical?: string): VerticalConfig {
  return VERTICALS[vertical || 'online'] || VERTICALS.online;
}
