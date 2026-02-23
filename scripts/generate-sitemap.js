import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { subgenres } from '../src/data/subgenres.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const toAbsolute = (p) => path.resolve(__dirname, '..', p);

const SITE_URL = 'https://sf-subgenres.serendiproducts.dev';
const lastMod = new Date().toISOString().split('T')[0];

const urls = ['/'];
for (const genre of subgenres) {
  urls.push(`/genre/${genre.id}`);
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${SITE_URL}${url}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>${url === '/' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${url === '/' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;

const distDir = toAbsolute('dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemap);
console.log('Sitemap generated at dist/sitemap.xml');
