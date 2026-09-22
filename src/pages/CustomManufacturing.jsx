import React from 'react';
import Breadcrumb from '../components/Breadcrumb';
import QuoteCTA from '../components/QuoteCTA';
import { products } from '../data/products';

// Every claim here is a customOptions[] entry already published per-product (src/data/products.js) —
// nothing about manufacturing process, tolerance or capacity is asserted beyond what's already there.
const withOptions = products.filter((p) => p.customOptions?.length > 0);

export default function CustomManufacturing() {
  return (
    <div className="bg-surface pb-20 pt-8">
      <div className="container mb-8">
        <Breadcrumb items={[{ label: 'Custom Manufacturing' }]} />
      </div>

      <div className="container">
        <h1 className="mb-4">Custom Manufacturing</h1>
        <p className="text-lg text-primary-600 mb-12 max-w-2xl">
          Beyond the standard range, several products are available with the custom options below.
          Tell us your requirement through the enquiry form and our team will confirm what's possible.
        </p>

        <div className="flex flex-col gap-10 mb-16">
          {withOptions.map((product) => (
            <section key={product.slug}>
              <h2 className="mb-4">
                <a href={`/products/${product.slug}`} className="hover:text-accent">{product.name}</a>
              </h2>
              <ul className="panel space-y-3">
                {product.customOptions.map((opt, i) => (
                  <li key={i} className="text-sm text-primary-700">
                    <span className="font-semibold">{opt.label}.</span>{' '}
                    {opt.note && <span className="text-primary-600">{opt.note}</span>}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <QuoteCTA
          title="Have a custom requirement?"
          subtitle="Tell us the product and what you need changed, and our team will confirm what's possible."
        />
      </div>
    </div>
  );
}
