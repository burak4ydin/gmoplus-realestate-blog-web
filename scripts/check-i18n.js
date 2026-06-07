const fs = require('fs');
const path = require('path');

const trPath = path.join(__dirname, '../messages/tr.json');
const tr = JSON.parse(fs.readFileSync(trPath, 'utf8'));
const locales = ['de', 'en', 'es', 'fr', 'ru'];

function flatKeys(obj, prefix = '') {
  return Object.keys(obj).flatMap((k) => {
    const key = prefix ? `${prefix}.${k}` : k;
    return typeof obj[k] === 'object' && !Array.isArray(obj[k])
      ? flatKeys(obj[k], key)
      : [key];
  });
}

const trKeys = new Set(flatKeys(tr));
let hasError = false;

for (const locale of locales) {
  const langPath = path.join(__dirname, `../messages/${locale}.json`);
  const lang = JSON.parse(fs.readFileSync(langPath, 'utf8'));
  const langKeys = new Set(flatKeys(lang));
  const missing = [...trKeys].filter((k) => !langKeys.has(k));
  if (missing.length) {
    console.error(
      `[${locale}] ${missing.length} eksik key: ${missing.slice(0, 5).join(', ')}${missing.length > 5 ? '...' : ''}`
    );
    hasError = true;
  } else {
    console.log(`[${locale}] OK - Eksiksiz`);
  }
}

if (hasError) process.exit(1);
console.log('\nTum dil dosyalari eksiksiz');