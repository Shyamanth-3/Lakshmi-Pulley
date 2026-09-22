// Route metadata for every page: <title>, description, canonical, Open Graph, Twitter and JSON-LD.
// One deterministic source used three ways:
//   - scripts/prerender.mjs writes the head tags into each prerendered HTML file (renderHead),
//   - Layout keeps the tags in step on client-side navigation (applySeo),
//   - the sitemap is built from the same route list (publicRoutes) and canonical URLs.
// Everything is derived from the canonical data (products, site, company); nothing is invented.

import { products, getProduct } from './data/products.js';
import { site } from './data/site.js';
import { companyData } from './data/company.js';

// Canonical origin: HTTPS on the www host (the apex host redirects to it).
export const SITE_ORIGIN = 'https://www.lakshmipulley.com';

const BRAND = 'Lakshmi Pulley';
// The only brand image available today (a 2031x1644 logo). Product-specific share images and a proper
// 1200x630 image need JPG/PNG exports that do not exist yet.
const IMAGE = { url: `${SITE_ORIGIN}/Assets/Main_Logo.jpg`, width: 2031, height: 1644, alt: `${BRAND} logo` };

const couplings = products.filter((p) => p.category === 'couplings').length;
const pulleys = products.filter((p) => p.category === 'pulleys').length;

const clip = (text, max = 160) => (text.length <= max ? text : `${text.slice(0, max - 1).replace(/\s+\S*$/, '')}…`);

function normalizePath(pathname) {
  const path = `/${String(pathname).split(/[?#]/)[0].replace(/^\/+/, '')}`;
  return path.length > 1 ? path.replace(/\/+$/, '') : path;
}

// Labels match the visible breadcrumbs on each page.
const PAGES = {
  '/': {
    title: `Couplings and Pulleys Manufacturer in Hyderabad | ${BRAND}`,
    description: `${BRAND} manufactures couplings and pulleys in Hyderabad, India: ${couplings} coupling types and ${pulleys} pulley types, with catalogues and technical details.`,
    jsonLd: ['organization'],
  },
  '/about': {
    title: `About ${site.name} | ${BRAND}`,
    description: `${site.name} (${BRAND}) makes mechanical power transmission components in Hyderabad. Technical lead: ${companyData.leadership.name}.`,
    crumb: 'About Us',
    jsonLd: ['organization', 'breadcrumbs'],
  },
  '/products': {
    title: `Couplings and Pulleys | ${BRAND} Products`,
    description: `All ${products.length} ${BRAND} products: ${couplings} couplings and ${pulleys} pulleys, with technical details and catalogue downloads.`,
    crumb: 'Products',
    jsonLd: ['breadcrumbs'],
  },
  '/enquiry': {
    title: `Request a Quote | ${BRAND}`,
    description: `Request a quotation from ${BRAND}. Tell us the product, quantity and your power, speed and shaft details, and our team will get back to you.`,
    crumb: 'Request Enquiry',
    jsonLd: ['breadcrumbs'],
  },
  '/contact': {
    title: `Contact ${BRAND} | Kukatpally, Hyderabad`,
    description: `Contact ${site.name} (${BRAND}) in Kukatpally, Hyderabad, by phone, by email or through the online enquiry form.`,
    crumb: 'Contact Us',
    jsonLd: ['breadcrumbs'],
  },
  // Post-submission confirmation, not a marketing page: noindex, no OG/Twitter/JSON-LD (see headTags).
  '/enquiry/thank-you': {
    title: `Enquiry Submitted | ${BRAND}`,
    description: `Your enquiry to ${BRAND} was submitted.`,
    noindex: true,
    jsonLd: [],
  },
};

const NOT_FOUND = {
  title: `Page Not Found | ${BRAND}`,
  description: `The page you asked for does not exist or has moved. Browse ${BRAND} couplings and pulleys or request a quote.`,
  noindex: true,
};

// Only facts already published on the site: no address (conflicting values), no founding year, no ratings.
const organization = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: site.name,
  alternateName: BRAND,
  url: `${SITE_ORIGIN}/`,
  logo: IMAGE.url,
  email: site.contact.emails.find((e) => e.endsWith('@lakshmipulley.com')),
});

const breadcrumbList = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: `${SITE_ORIGIN}${c.path}` })),
});

// Every route that gets a prerendered HTML file (so direct links/refreshes work on Vercel).
// Product routes come from the canonical product data. Includes noindex utility pages (thank-you).
export const publicRoutes = () => [
  '/', '/about', '/products', ...products.map((p) => `/products/${p.slug}`), '/enquiry', '/contact', '/enquiry/thank-you',
];

// The indexable subset that belongs in the sitemap — excludes noindex pages like the thank-you page.
export const sitemapRoutes = () => publicRoutes().filter((path) => !getSeo(path).noindex);

export function getSeo(pathname) {
  const path = normalizePath(pathname);
  const product = path.startsWith('/products/') ? getProduct(path.slice('/products/'.length)) : undefined;
  let page = PAGES[path];
  let crumbs;
  if (product) {
    page = { title: `${product.name} | ${BRAND}`, description: clip(product.summary), jsonLd: ['breadcrumbs'] };
    crumbs = [{ name: 'Products', path: '/products' }, { name: product.name, path }];
  } else if (page?.crumb) {
    crumbs = [{ name: page.crumb, path }];
  }
  if (!page) return NOT_FOUND;

  const jsonLd = page.jsonLd.map((kind) => (kind === 'organization'
    ? organization()
    : breadcrumbList([{ name: 'Home', path: '/' }, ...crumbs])));
  return {
    title: page.title,
    description: page.description,
    canonical: `${SITE_ORIGIN}${path === '/' ? '/' : path}`,
    jsonLd,
    ...(page.noindex ? { noindex: true } : {}),
  };
}

// Head tags as data, so the prerenderer and the browser produce exactly the same set.
export function headTags(seo) {
  const meta = (attrs) => ({ tag: 'meta', attrs });
  const tags = [meta({ name: 'description', content: seo.description })];
  if (seo.noindex) return [...tags, meta({ name: 'robots', content: 'noindex' })];
  tags.push(
    { tag: 'link', attrs: { rel: 'canonical', href: seo.canonical } },
    meta({ property: 'og:type', content: 'website' }),
    meta({ property: 'og:site_name', content: BRAND }),
    meta({ property: 'og:locale', content: 'en_IN' }),
    meta({ property: 'og:url', content: seo.canonical }),
    meta({ property: 'og:title', content: seo.title }),
    meta({ property: 'og:description', content: seo.description }),
    meta({ property: 'og:image', content: IMAGE.url }),
    meta({ property: 'og:image:width', content: String(IMAGE.width) }),
    meta({ property: 'og:image:height', content: String(IMAGE.height) }),
    meta({ property: 'og:image:alt', content: IMAGE.alt }),
    // "summary" (small image): the logo is nearly square, so a large 2:1 card would crop it.
    meta({ name: 'twitter:card', content: 'summary' }),
    meta({ name: 'twitter:title', content: seo.title }),
    meta({ name: 'twitter:description', content: seo.description }),
    meta({ name: 'twitter:image', content: IMAGE.url }),
    meta({ name: 'twitter:image:alt', content: IMAGE.alt }),
  );
  for (const data of seo.jsonLd) tags.push({ tag: 'script', attrs: { type: 'application/ld+json' }, json: data });
  return tags;
}

const escapeAttr = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const escapeText = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// The HTML that scripts/prerender.mjs puts in <head>. Every tag carries data-seo so the browser can replace them.
export function renderHead(seo) {
  const lines = [`<title>${escapeText(seo.title)}</title>`];
  for (const t of headTags(seo)) {
    if (t.tag === 'script') {
      lines.push(`<script type="application/ld+json" data-seo>${JSON.stringify(t.json).replace(/</g, '\\u003c')}</script>`);
    } else {
      const attrs = Object.entries(t.attrs).map(([k, v]) => `${k}="${escapeAttr(v)}"`).join(' ');
      lines.push(`<${t.tag} ${attrs} data-seo>`);
    }
  }
  return lines.join('\n    ');
}

// Browser only (called from an effect). Keeps the tags correct after client-side navigation.
export function applySeo(seo) {
  const canonical = document.head.querySelector('link[rel="canonical"]');
  if (document.title === seo.title && (canonical?.getAttribute('href') ?? null) === (seo.canonical ?? null)) return; // prerendered head is already right
  document.title = seo.title;
  document.head.querySelectorAll('[data-seo]').forEach((el) => el.remove());
  for (const t of headTags(seo)) {
    const el = document.createElement(t.tag);
    for (const [k, v] of Object.entries(t.attrs)) el.setAttribute(k, v);
    if (t.json) el.textContent = JSON.stringify(t.json);
    el.setAttribute('data-seo', '');
    document.head.appendChild(el);
  }
}
