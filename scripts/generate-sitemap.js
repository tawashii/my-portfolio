import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = 'https://your-portfolio-domain.com'; // あなたのサイトのURLに変更してください

// サイトのルート
const routes = [
  '/',
  '/about',
  '/projects',
  '/skills',
  '/experience',
  '/contact'
];

// XML生成
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${routes
    .map(route => `
    <url>
      <loc>${SITE_URL}${route}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>${route === '/' ? '1.0' : '0.8'}</priority>
    </url>
  `).join('')}
</urlset>`;

// robots.txt生成
const robots = `User-agent: *
Allow: /
Sitemap: ${SITE_URL}/sitemap.xml`;

// ディレクトリが存在しない場合は作成
const publicDir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}

// ファイル書き込み
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
fs.writeFileSync(path.join(publicDir, 'robots.txt'), robots);

console.log('Sitemap and robots.txt generated successfully!');
