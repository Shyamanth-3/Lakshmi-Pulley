// Build-time prerender. Runs after `vite build` (client) and `vite build --ssr` (server bundle):
//   1. renders every public route with the real React app (StaticRouter) into static HTML,
//   2. writes the per-route head tags (src/seo.js) into each file,
//   3. writes dist/404.html, dist/sitemap.xml and dist/robots.txt,
//   4. fails the build if titles/descriptions repeat or a canonical is malformed.
// Output uses flat "<route>.html" files, which Vercel serves at clean URLs (cleanUrls: true in vercel.json).

import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = path.resolve(import.meta.dirname, '..');
const distDir = path.resolve(root, process.env.PRERENDER_DIST || 'dist');
const ssrDir = path.resolve(root, process.env.PRERENDER_SSR || 'dist-ssr');

const PLACEHOLDER_HEAD = '<!--app-head-->';
const EMPTY_ROOT = '<div id="root"></div>';

const template = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');
if (!template.includes(PLACEHOLDER_HEAD) || !template.includes(EMPTY_ROOT)) {
  throw new Error('dist/index.html is not the client build template (missing head placeholder or empty root). Run `vite build` first.');
}

const { render, getSeo, renderHead, publicRoutes, sitemapRoutes, SITE_ORIGIN } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href);

const page = (url) => template.replace(PLACEHOLDER_HEAD, renderHead(getSeo(url))).replace(EMPTY_ROOT, `<div id="root">${render(url)}</div>`);
const write = (file, content) => {
  const target = path.join(distDir, file);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, content);
};
const fileFor = (route) => (route === '/' ? 'index.html' : `${route.slice(1)}.html`);

// ---- public routes ----
const routes = publicRoutes();
const seen = { title: new Map(), description: new Map() };
const problems = [];
for (const route of routes) {
  const seo = getSeo(route);
  if (!seo.canonical) problems.push(`${route}: no canonical (unknown route in the public list)`);
  const expected = `${SITE_ORIGIN}${route}`;
  if (seo.canonical !== expected) problems.push(`${route}: canonical ${seo.canonical} should be ${expected}`);
  for (const key of ['title', 'description']) {
    if (seen[key].has(seo[key])) problems.push(`${route}: ${key} duplicates ${seen[key].get(seo[key])}`);
    seen[key].set(seo[key], route);
  }
  if (seo.description.length > 160) problems.push(`${route}: description is ${seo.description.length} characters`);
  write(fileFor(route), page(route));
}
if (problems.length) throw new Error(`Prerender metadata problems:\n - ${problems.join('\n - ')}`);

// ---- 404 ----
// "/404" is not a real page, so the router renders the catch-all NotFound route (noindex head, no canonical).
write('404.html', page('/404'));

// ---- sitemap.xml: indexable routes only (noindex pages like /enquiry/thank-you are excluded), canonical www URLs, no duplicates ----
const urls = sitemapRoutes().map((r) => getSeo(r).canonical);
if (new Set(urls).size !== urls.length) throw new Error('Duplicate URL in sitemap');
write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url>\n    <loc>${u}</loc>\n  </url>`).join('\n')}\n</urlset>\n`);

// ---- robots.txt: crawl everything public, point at the sitemap ----
write('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${SITE_ORIGIN}/sitemap.xml\n`);

console.log(`Prerendered ${routes.length} routes + 404.html, sitemap.xml (${urls.length} URLs) and robots.txt into ${path.relative(root, distDir)}/`);
