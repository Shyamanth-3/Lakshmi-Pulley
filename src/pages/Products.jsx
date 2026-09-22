import React, { useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import SectionHeading from '../components/SectionHeading';
import ProductCard from '../components/ProductCard';
import QuoteCTA from '../components/QuoteCTA';
import { products, categories, getCategory } from '../data/products';

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
              className={`px-6 py-2 rounded-md text-sm font-semibold transition-colors ${
                activeFilter === category
                  ? 'bg-primary-700 text-white'
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
          <div className="text-center py-20 text-primary-500">
            No products found in this category.
          </div>
        )}
      </section>

      <div className="container mb-20">
        <QuoteCTA />
      </div>
    </div>
  );
}
