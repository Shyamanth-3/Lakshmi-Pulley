import React, { useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import SectionHeading from '../components/SectionHeading';
import ProductCard from '../components/ProductCard';
import CTASection from '../components/CTASection';
import { products, categories, getCategory } from '../data/products';

export default function Products() {
  const [activeFilter, setActiveFilter] = useState('All');
  
  const filters = ['All', ...categories.map((c) => c.name)];
  
  const filteredProducts = activeFilter === 'All' 
    ? products 
    : products.filter(p => getCategory(p.category).name === activeFilter);

  return (
    <div className="bg-surface pb-0 pt-8">
      <div className="container mx-auto px-4 mb-4">
        <Breadcrumb items={[{ label: 'Products' }]} />
      </div>

      <section className="container mx-auto px-4 mb-16">
        <SectionHeading 
          title="Power Transmission Products" 
          subtitle="We have been manufacturing high-quality power transmission products like V-belt pulleys, gear couplings, tyre couplings, timer pulleys for the last 20 years, backed by state-of-the-art CNC facilities."
        />
        
        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-10 border-b border-primary-100 pb-4">
          {filters.map(category => (
            <button
              key={category}
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
      </section>

      <CTASection />
    </div>
  );
}
