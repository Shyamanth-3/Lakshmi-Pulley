import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import FeatureList from '../components/FeatureList';
import ProductCard from '../components/ProductCard';
import QuoteCTA from '../components/QuoteCTA';
import NotFound from './NotFound';
import { getProduct, getCategory } from '../data/products';
import { getDocument } from '../data/documents';
import { getRangeRows, formatVariantRange, columnHeader, formatCell } from '../data/format';
import { Download, X } from 'lucide-react';

// One template for all 8 products: every section below only renders when the canonical
// record actually has that data, so a thin record (e.g. LHRC Couplings) produces a short,
// honest page instead of empty headings.
export default function ProductDetail() {
  const { slug } = useParams();
  const [activeVariant, setActiveVariant] = useState(null);
  const modalRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Native <dialog>: focus-trap, Escape-to-close and focus-return come for free (same pattern as SiteHeader's mobile menu).
  useEffect(() => {
    const dialog = modalRef.current;
    if (!dialog) return;
    if (activeVariant && !dialog.open) dialog.showModal();
    if (!activeVariant && dialog.open) dialog.close();
  }, [activeVariant]);

  const product = getProduct(slug);
  if (!product) return <NotFound />;

  const image = product.images[0];
  const category = getCategory(product.category);
  const documents = product.documentIds.map(getDocument);
  const rangeRows = getRangeRows(product.specifications.range);
  const tables = product.specifications.tables ?? [];
  // Page-level "Technical Specifications" tables; variant tables render inside their own card below.
  // Draft (unconfirmed, e.g. the old-site tyre coupling table) tables stay hidden until the owner confirms them — see products.js dataSource notes.
  const pageTables = tables.filter((t) => !t.variantId && t.status === 'published');
  const modalTable = activeVariant && tables.find((t) => t.id === activeVariant.tableId);
  const relatedProducts = (product.relatedSlugs ?? []).map(getProduct).filter(Boolean);

  const quoteHref = (variant, size) => {
    const params = new URLSearchParams({ product: product.slug });
    if (variant) params.set('variant', variant);
    if (size) params.set('size', size);
    return `/enquiry?${params.toString()}`;
  };

  return (
    <div className="bg-surface pb-20 pt-8">
      <div className="container mb-8">
        <Breadcrumb items={[{ label: 'Products', link: '/products' }, { label: product.name }]} />
      </div>

      {/* Hero: category, H1, summary, primary CTA, product image */}
      <section className="container mb-16">
        <div className="flex flex-col lg:flex-row gap-12 xl:gap-20">
          <div className="lg:w-2/5">
            <div className="panel sticky top-24">
              <div className="aspect-[4/3] flex items-center justify-center bg-primary-50 rounded-md overflow-hidden mb-6 p-4">
                <img
                  src={`${image.src}-${image.defaultWidth}.webp`}
                  srcSet={image.widths.map((w) => `${image.src}-${w}.webp ${w}w`).join(', ')}
                  sizes="(min-width: 1024px) 350px, calc(100vw - 96px)"
                  width={image.width}
                  height={image.height}
                  alt={image.alt}
                  decoding="async"
                  className="w-full h-full object-contain mix-blend-multiply"
                />
              </div>
              <Link to={quoteHref()} className="btn btn-primary w-full justify-center">
                Get a Quote for this Product
              </Link>
            </div>
          </div>

          <div className="lg:w-3/5">
            {category && (
              <span className="text-label inline-block px-3 py-1 bg-primary-50 text-accent uppercase tracking-wider rounded-md border border-primary-100 mb-4">
                {category.name}
              </span>
            )}
            <h1 className="mb-6">{product.name}</h1>
            <p className="text-xl text-primary-600 leading-relaxed mb-10 border-l-4 border-accent pl-4">
              {product.summary}
            </p>

            {/* Range strip */}
            {rangeRows.length > 0 && (
              <dl className="panel flex flex-wrap gap-x-10 gap-y-5 mb-10">
                {rangeRows.map(({ key, label, text }) => (
                  <div key={key}>
                    <dt className="text-label">{label}</dt>
                    <dd className="text-value text-lg text-primary-700 mt-1">{text}</dd>
                  </div>
                ))}
              </dl>
            )}

            {product.features?.length > 0 && (
              <div className="mb-12">
                <h2 className="mb-6">Salient Features</h2>
                <FeatureList features={product.features} />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Technical specifications (page-level tables) */}
      {pageTables.length > 0 && (
        <section className="container mb-16">
          <h2 className="mb-6">Technical Specifications</h2>
          {pageTables.map((table) => (
            <div key={table.id} className="panel p-0 overflow-hidden mb-8">
              <div className="overflow-x-auto">
                <table>
                  {table.caption && <caption className="sr-only">{table.caption}</caption>}
                  <thead>
                    <tr>
                      {table.columns.map((column) => (
                        <th key={column.key} scope="col">
                          {columnHeader(column)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {table.rows.map((row, rowIdx) => (
                      <tr key={rowIdx}>
                        {table.columns.map((column, colIdx) => (
                          colIdx === 0
                            ? <th key={column.key} scope="row" className="text-value font-semibold">{formatCell(column, row)}</th>
                            : <td key={column.key} className="text-value">{formatCell(column, row)}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Variants / sizes */}
      {product.variants?.length > 0 && (
        <section className="container mb-16">
          <h2 className="mb-6">Types &amp; Variants</h2>
          <div className="grid grid-cols-1 gap-6">
            {product.variants.map((variant) => {
              const r = formatVariantRange(variant.range);
              return (
                <div key={variant.id} className="panel flex flex-col md:flex-row gap-6 items-center">
                  {variant.image && (
                    <div className="w-full md:w-32 h-32 shrink-0 bg-primary-50 rounded-md p-2 flex items-center justify-center">
                      <img src={variant.image} alt={variant.name} className="max-w-full max-h-full object-contain mix-blend-multiply" />
                    </div>
                  )}
                  <div className="flex-grow w-full">
                    <h3 className="mb-3">{variant.name}</h3>
                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 text-sm">
                      {variant.publishedSizeCount != null && (
                        <div><dt className="inline text-label">Available Sizes: </dt><dd className="inline text-value">{variant.publishedSizeCount}</dd></div>
                      )}
                      {r.torque && <div><dt className="inline text-label">Torque: </dt><dd className="inline text-value">{r.torque}</dd></div>}
                      {r.power && <div><dt className="inline text-label">Power: </dt><dd className="inline text-value">{r.power}</dd></div>}
                      {r.bore && <div><dt className="inline text-label">Bore Dia: </dt><dd className="inline text-value">{r.bore}</dd></div>}
                    </dl>
                    <div className="flex flex-wrap gap-3 mt-4">
                      {variant.tableId && (
                        <button type="button" onClick={() => setActiveVariant(variant)} className="btn btn-outline text-sm">
                          View Specifications
                        </button>
                      )}
                      <Link to={quoteHref(variant.id)} className="btn btn-primary text-sm">
                        Quote this Variant
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Custom options */}
      {product.customOptions?.length > 0 && (
        <section className="container mb-16">
          <h2 className="mb-6">Custom Options</h2>
          <ul className="panel space-y-3">
            {product.customOptions.map((opt, i) => (
              <li key={i} className="text-sm text-primary-700">
                <span className="font-semibold">{opt.label}.</span>{' '}
                {opt.note && <span className="text-primary-600">{opt.note}</span>}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Additional information (transitional free-text field) */}
      {product.additionalInfo && (
        <section className="container mb-16">
          <div className="panel panel-notice text-sm text-primary-700">{product.additionalInfo}</div>
        </section>
      )}

      {/* Applications */}
      {product.applications?.length > 0 && (
        <section className="container mb-16">
          <h2 className="mb-6">Applications</h2>
          <ul className="flex flex-wrap gap-3">
            {product.applications.map((app) => (
              <li key={app} className="text-sm px-3 py-1.5 bg-primary-50 border border-primary-100 rounded-md text-primary-700">
                {app}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Documents / downloads */}
      {documents.length > 0 && (
        <section className="container mb-16">
          <h2 className="mb-6">Documents &amp; Downloads</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {documents.map((doc) => (
              <li key={doc.id}>
                <a
                  href={doc.path}
                  target="_blank"
                  rel="noreferrer"
                  className="panel flex items-center gap-3 hover:border-primary-500 transition-colors"
                >
                  <Download size={20} className="text-accent shrink-0" aria-hidden="true" />
                  <span className="text-sm font-medium text-primary-700">{doc.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <section className="container mb-16">
          <h2 className="mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}

      <div className="container">
        <QuoteCTA
          title="Not sure which product you need?"
          subtitle="Our team can help you select the right coupling or pulley for your application."
        />
      </div>

      {/* Variant specification modal — native <dialog>, same pattern as SiteHeader's mobile menu */}
      {product.variants?.some((v) => v.tableId) && (
        <dialog
          ref={modalRef}
          onClose={() => setActiveVariant(null)}
          onClick={(e) => { if (e.target === modalRef.current) setActiveVariant(null); }}
          className="m-auto rounded-md w-full max-w-4xl max-h-[90vh] p-0 border-0 backdrop:bg-navy/40"
        >
          {activeVariant && modalTable && (
            <div className="flex flex-col max-h-[90vh]">
              <div className="flex justify-between items-center p-4 border-b border-primary-100">
                <h3 className="text-lg font-semibold text-primary-700">{activeVariant.name} — Sizes</h3>
                <button
                  type="button"
                  onClick={() => setActiveVariant(null)}
                  className="p-2 text-primary-600 hover:text-accent"
                >
                  <span className="sr-only">Close</span>
                  <X size={20} aria-hidden="true" />
                </button>
              </div>
              <div className="overflow-auto">
                <table>
                  <thead>
                    <tr>
                      {modalTable.columns.map((c) => (
                        <th key={c.key} scope="col">{columnHeader(c)}</th>
                      ))}
                      <th scope="col"><span className="sr-only">Action</span></th>
                    </tr>
                  </thead>
                  <tbody>
                    {modalTable.rows.map((row, ri) => {
                      const sizeColumn = modalTable.columns.find((c) => c.kind === 'code');
                      const sizeValue = sizeColumn && row[sizeColumn.key];
                      return (
                        <tr key={ri}>
                          {modalTable.columns.map((c, ci) => (
                            ci === 0
                              ? <th key={c.key} scope="row" className="text-value font-semibold">{formatCell(c, row)}</th>
                              : <td key={c.key} className="text-value">{formatCell(c, row)}</td>
                          ))}
                          <td>
                            {sizeValue && (
                              <Link to={quoteHref(activeVariant.id, sizeValue)} className="text-sm font-semibold text-primary-600 hover:text-accent whitespace-nowrap">
                                Quote this size
                              </Link>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="p-4 border-t border-primary-100 text-right">
                <button type="button" onClick={() => setActiveVariant(null)} className="btn btn-primary text-sm">
                  Done
                </button>
              </div>
            </div>
          )}
        </dialog>
      )}
    </div>
  );
}
