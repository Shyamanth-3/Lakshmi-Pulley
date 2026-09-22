import React, { useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import SectionHeading from '../components/SectionHeading';
import ProductCard from '../components/ProductCard';
import QuoteCTA from '../components/QuoteCTA';
import { Link } from 'react-router-dom';
import { products, categories, getCategory } from '../data/products';

// Original Products composition restored (commit d1e8746): pill filters, product grid, closing CTA.
// The old intro copy claimed "20 years" and "state-of-the-art CNC facilities" — neither is in
// canonical data, so the subtitle below states only verified counts instead.
export default function Products() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', ...categories.map((c) => c.name)];

  const filteredProducts = activeFilter === 'All'
    ? products
    : products.filter((p) => getCategory(p.category).name === activeFilter);

  return (
    <div className="bg-surface pb-0 pt-8">
      <div className="container mb-4">
        <Breadcrumb items={[{ label: 'Products' }]} />
      </div>

      <section className="container mb-16">
        <h1 className="sr-only">Power Transmission Products</h1>
        <SectionHeading
          title="Power Transmission Products"
          subtitle={`${products.length} products across ${categories.length} categories: couplings and pulleys.`}
        />

        {/* Filters */}
        <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2 mb-10 border-b border-primary-100 pb-4">
          {filters.map((category) => (
            <button
              key={category}
              type="button"
              aria-pressed={activeFilter === category}
              onClick={() => setActiveFilter(category)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                activeFilter === category
                  ? 'bg-primary-700 text-white shadow-md'
                  : 'bg-primary-50 text-primary-600 hover:bg-primary-100 hover:text-primary-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20 text-primary-400">
            No products found in this category.
          </div>
        )}

        <p className="text-sm text-primary-600 mt-10">
          Looking for a specific catalogue? <Link to="/downloads" className="text-primary-600 hover:text-accent font-medium">Browse all catalogue downloads</Link>, or see our <Link to="/custom-manufacturing" className="text-primary-600 hover:text-accent font-medium">custom manufacturing options</Link>.
        </p>
      </section>

      <QuoteCTA />
    </div>
  );
}
