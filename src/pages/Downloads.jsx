import React from 'react';
import Breadcrumb from '../components/Breadcrumb';
import { products } from '../data/products';
import { documents } from '../data/documents';
import { Download } from 'lucide-react';

const formatBytes = (bytes) => {
  const mb = bytes / (1024 * 1024);
  return mb >= 1 ? `${mb.toFixed(1)} MB` : `${Math.round(bytes / 1024)} KB`;
};

// Grouped by product (a document can belong to more than one, e.g. V-Pulleys' 5 catalogues), catalogue order.
const groups = products
  .map((product) => ({ product, docs: documents.filter((d) => d.productSlugs.includes(product.slug)) }));

export default function Downloads() {
  const withDocs = groups.filter((g) => g.docs.length > 0);
  const withoutDocs = groups.filter((g) => g.docs.length === 0).map((g) => g.product);

  return (
    <div className="bg-surface pb-20 pt-8">
      <div className="container mb-8">
        <Breadcrumb items={[{ label: 'Downloads' }]} />
      </div>

      <div className="container">
        <h1 className="mb-4">Downloads</h1>
        <p className="text-lg text-primary-600 mb-12 max-w-2xl">
          Catalogue PDFs, grouped by product.
        </p>

        <div className="flex flex-col gap-12">
          {withDocs.map(({ product, docs }) => (
            <section key={product.slug} aria-labelledby={`${product.slug}-heading`}>
              <h2 id={`${product.slug}-heading`} className="mb-4">
                <a href={`/products/${product.slug}`} className="hover:text-accent">{product.name}</a>
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {docs.map((doc) => (
                  <li key={doc.id}>
                    <a
                      href={doc.path}
                      target="_blank"
                      rel="noreferrer"
                      className="panel flex items-center gap-3 hover:border-primary-500 transition-colors"
                    >
                      <Download size={20} className="text-accent shrink-0" aria-hidden="true" />
                      <span className="flex-grow">
                        <span className="block text-sm font-medium text-primary-700">{doc.title}</span>
                        <span className="text-meta">PDF · {formatBytes(doc.bytes)}</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        {withoutDocs.length > 0 && (
          <p className="text-meta mt-12">
            No catalogue PDF is published yet for{' '}
            {withoutDocs.map((p, i) => (
              <React.Fragment key={p.slug}>
                <a href={`/products/${p.slug}`} className="text-primary-600 hover:text-accent font-medium">{p.name}</a>
                {i < withoutDocs.length - 1 ? ', ' : ''}
              </React.Fragment>
            ))}
            {' '}— see the product page for technical details.
          </p>
        )}
      </div>
    </div>
  );
}
