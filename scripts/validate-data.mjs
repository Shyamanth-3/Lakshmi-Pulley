// Integrity checks for the canonical data layer (src/data). Run with: node scripts/validate-data.mjs
// Fails (throws) if a product, document, image or table reference is broken, if a figure is not numeric,
// or if a product name is hard-coded outside src/data.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { products, categories, getProductByName } from '../src/data/products.js';
import { documents, getDocument } from '../src/data/documents.js';
import { enquiryProductOptions, productLinks, site } from '../src/data/site.js';

const root = fileURLToPath(new URL('..', import.meta.url));
const errors = [];
const check = (cond, msg) => { if (!cond) errors.push(msg); };
const exists = (publicPath) => fs.existsSync(path.join(root, 'public', publicPath));
const isNum = (n) => typeof n === 'number' && Number.isFinite(n);

// The eight canonical slugs are public URLs and must not change.
const EXPECTED_SLUGS = [
  'flexible-jaw-couplings', 'flexible-pin-bush-couplings', 'flexible-tyre-couplings', 'gear-couplings',
  'v-pulleys', 'lhrc-couplings', 'easyfit-timing-pulleys', 'resilient-grid-couplings',
];
const REQUIRED = ['slug', 'name', 'category', 'summary', 'features', 'specifications', 'variants', 'customOptions',
  'documentIds', 'applications', 'images', 'relatedSlugs', 'rfq', 'dataSource'];
const RFQ_FIELDS = ['coupling', 'v-pulley', 'timing-pulley', 'bush'];

// ---- products ----
check(products.length === 8, `expected 8 products, found ${products.length}`);
check(JSON.stringify(products.map((p) => p.slug).sort()) === JSON.stringify([...EXPECTED_SLUGS].sort()), 'product slugs differ from the eight canonical slugs');
check(new Set(products.map((p) => p.slug)).size === products.length, 'duplicate slug');
check(new Set(products.map((p) => p.name)).size === products.length, 'duplicate product name');

for (const p of products) {
  const at = `[${p.slug}]`;
  for (const k of REQUIRED) check(p[k] !== undefined, `${at} missing ${k}`);
  check(/^[a-z0-9]+(-[a-z0-9]+)*$/.test(p.slug), `${at} slug format`);
  check(categories.some((c) => c.id === p.category), `${at} unknown category ${p.category}`);
  check(typeof p.summary === 'string' && p.summary.length > 0, `${at} empty summary`);
  check(Array.isArray(p.features) && p.features.length > 0, `${at} no features`);
  check(RFQ_FIELDS.includes(p.rfq?.fields), `${at} rfq.fields "${p.rfq?.fields}"`);
  check(typeof p.dataSource?.ownerVerified === 'boolean' && Array.isArray(p.dataSource?.sources) && p.dataSource.sources.length > 0, `${at} dataSource incomplete`);
  for (const r of p.relatedSlugs) check(products.some((x) => x.slug === r), `${at} relatedSlug ${r} unknown`);
  for (const o of p.customOptions) check(o.label && ['current-site', 'old-site-scrape'].includes(o.origin), `${at} customOption needs label and origin`);

  // documents resolve, both directions
  for (const id of p.documentIds) {
    const d = getDocument(id);
    check(d, `${at} documentId ${id} does not resolve`);
    if (d) check(d.productSlugs.includes(p.slug), `${at} document ${id} does not list this product`);
  }

  // images: every advertised width exists as webp and avif
  check(p.images.length > 0, `${at} no images`);
  for (const img of p.images) {
    check(img.alt && isNum(img.width) && isNum(img.height) && img.widths.includes(img.defaultWidth), `${at} image metadata`);
    for (const w of img.widths) for (const ext of ['webp', 'avif']) check(exists(`${img.src}-${w}.${ext}`), `${at} missing image ${img.src}-${w}.${ext}`);
  }

  // ranges are numeric
  const numericLeaves = (o, where) => {
    for (const [k, v] of Object.entries(o)) {
      if (['unit', 'label'].includes(k)) check(typeof v === 'string', `${where}.${k} must be a string`);
      else if (typeof v === 'object') numericLeaves(v, `${where}.${k}`);
      else check(isNum(v) || k === 'decimals', `${where}.${k} must be a number, got ${JSON.stringify(v)}`);
    }
  };
  if (p.specifications.range) numericLeaves(p.specifications.range, `${at} range`);

  // variants and tables
  const tables = p.specifications.tables ?? [];
  check(new Set(tables.map((t) => t.id)).size === tables.length, `${at} duplicate table id`);
  for (const v of p.variants) {
    check(tables.some((t) => t.id === v.tableId && t.variantId === v.id), `${at} variant ${v.id}: tableId does not resolve`);
    check(isNum(v.publishedSizeCount), `${at} variant ${v.id}: publishedSizeCount`);
    numericLeaves(v.range, `${at} variant ${v.id} range`);
  }
  for (const v of p.rfq.spacerVariants ?? []) check(p.variants.some((x) => x.id === v), `${at} rfq.spacerVariants ${v} unknown`);
  for (const t of tables) {
    const tat = `${at} table ${t.id}`;
    check(['published', 'draft'].includes(t.status), `${tat} status`);
    check(t.source?.origin, `${tat} source.origin`);
    const keys = t.columns.map((c) => c.key);
    check(new Set(keys).size === keys.length, `${tat} duplicate column key`);
    t.rows.forEach((row, i) => {
      for (const k of Object.keys(row)) check(keys.includes(k) || t.columns.some((c) => c.rangeKey === k), `${tat} row ${i}: unknown key ${k}`);
      for (const c of t.columns) {
        const v = row[c.key];
        if (c.kind === 'number') check(v === null || isNum(v), `${tat} row ${i} ${c.key}: not numeric (${JSON.stringify(v)})`);
        if (c.kind === 'list') check(Array.isArray(v) && v.every(isNum), `${tat} row ${i} ${c.key}: not a numeric list`);
        if (c.kind === 'labelRange') check(typeof v === 'string' && isNum(row[c.rangeKey]?.min) && isNum(row[c.rangeKey]?.max), `${tat} row ${i}: section/range`);
        if (c.kind === 'code') check(typeof v === 'string' && v.length > 0, `${tat} row ${i}: empty code`);
      }
    });
  }
}

// ---- documents ----
const referenced = new Set(products.flatMap((p) => p.documentIds));
check(new Set(documents.map((d) => d.id)).size === documents.length, 'duplicate document id');
for (const d of documents) {
  const at = `[doc ${d.id}]`;
  check(referenced.has(d.id), `${at} not referenced by any product`);
  check(exists(d.path), `${at} file missing: ${d.path}`);
  if (exists(d.path)) check(fs.statSync(path.join(root, 'public', d.path)).size === d.bytes, `${at} bytes differ from file`);
  for (const h of d.legacyHrefs) check(exists(h), `${at} legacy file missing: ${h}`);
  for (const s of d.productSlugs) check(products.some((p) => p.slug === s && p.documentIds.includes(d.id)), `${at} product ${s} does not list it`);
}
// every legacy PDF URL has a 301 in vercel.json
const vercel = JSON.parse(fs.readFileSync(path.join(root, 'vercel.json'), 'utf8'));
for (const d of documents) for (const h of d.legacyHrefs) {
  const hit = vercel.redirects?.some((r) => (r.source === h || r.source === h.replaceAll(' ', '%20')) && r.destination === d.path && r.statusCode === 301);
  check(hit, `[doc ${d.id}] no 301 redirect ${h} -> ${d.path}`);
}

// ---- derived lists ----
check(enquiryProductOptions.length === products.length && enquiryProductOptions.every((n) => getProductByName(n)), 'enquiry options do not match products');
check(productLinks.length === products.length && productLinks.every((l) => products.some((p) => l.path === `/products/${p.slug}` && l.name === p.name)), 'footer product links do not match products');

// ---- enquiry API compatibility: api/enquiry.js branches on these product-name strings ----
const api = fs.readFileSync(path.join(root, 'api/enquiry.js'), 'utf8');
const apiPulleyNames = [...api.matchAll(/data\.productCategory === '([^']+)'/g)].map((m) => m[1]);
check(apiPulleyNames.length > 0, 'could not find the pulley product names in api/enquiry.js');
for (const n of apiPulleyNames) check(['v-pulley', 'timing-pulley'].includes(getProductByName(n)?.rfq.fields), `api/enquiry.js compares against "${n}", which is not a pulley product name in the data`);
for (const p of products.filter((x) => ['v-pulley', 'timing-pulley'].includes(x.rfq.fields))) check(apiPulleyNames.includes(p.name), `pulley product "${p.name}" is not handled by api/enquiry.js`);

// ---- no product name hard-coded outside src/data ----
const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]));
for (const f of walk(path.join(root, 'src')).filter((f) => /\.(jsx?|css)$/.test(f) && !f.includes(`${path.sep}data${path.sep}`))) {
  const text = fs.readFileSync(f, 'utf8');
  for (const p of products) check(!text.includes(p.name), `${path.relative(root, f)} hard-codes the product name "${p.name}"`);
}

// ---- site ----
check(site.contact.phones.length > 0 && site.contact.emails.length > 0 && site.contact.address.line1, 'site contact incomplete');
check(site.dataSource.conflicts.length > 0, 'site conflicts should be documented');

if (errors.length) throw new Error(`${errors.length} data problem(s):\n - ${errors.join('\n - ')}`);
const tableRows = products.flatMap((p) => p.specifications.tables ?? []).reduce((n, t) => n + t.rows.length, 0);
console.log(`OK: ${products.length} products, ${documents.length} documents, ${products.flatMap((p) => p.images).length} images, ${tableRows} table rows, ${enquiryProductOptions.length} enquiry options. No problems found.`);
