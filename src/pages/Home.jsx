import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { products, categories } from '../data/products';
import { companyData } from '../data/company';
import { site } from '../data/site';
import ProductCard from '../components/ProductCard';
import SectionHeading from '../components/SectionHeading';
import QuoteCTA from '../components/QuoteCTA';

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative bg-primary-700 min-h-[60vh] flex items-center pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/images/site/home-hero-1280.webp" srcSet="/images/site/home-hero-640.webp 640w, /images/site/home-hero-960.webp 960w, /images/site/home-hero-1280.webp 1280w, /images/site/home-hero-1915.webp 1915w" sizes="max(100vw, 1280px)" width="1915" height="821" fetchPriority="high" alt="Industrial Background" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 via-primary-800/70 to-primary-700/40"></div>
        </div>

        <div className="container relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold font-heading text-white leading-tight mt-10 mb-6">
              Power Transmission <span className="text-accent">Components</span>
            </h1>

            <p className="text-lg md:text-xl text-primary-100 mb-10 max-w-2xl leading-relaxed">
              <strong className="text-white">{site.name}</strong> — {companyData.tagline}.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/products" className="btn btn-accent text-lg px-8 py-3">
                Explore Products
              </Link>
              <Link to="/enquiry" className="btn bg-white/10 text-white hover:bg-white/20 text-lg px-8 py-3 border border-white/30">
                Request a Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Verified facts strip — no invented client/revenue/capacity figures */}
      <section className="bg-white border-b border-primary-100">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-y divide-x md:divide-y-0 divide-primary-100">
            <div className="p-6 md:p-8 text-center">
              <div className="text-3xl font-bold font-heading text-primary-700 mb-1">{companyData.established}</div>
              <div className="text-label">Established</div>
            </div>
            <div className="p-6 md:p-8 text-center">
              <div className="text-3xl font-bold font-heading text-primary-700 mb-1">{products.length}</div>
              <div className="text-label">Products</div>
            </div>
            <div className="p-6 md:p-8 text-center">
              <div className="text-3xl font-bold font-heading text-primary-700 mb-1">{categories.length}</div>
              <div className="text-label">Categories</div>
            </div>
            <div className="p-6 md:p-8 text-center">
              <div className="text-3xl font-bold font-heading text-primary-700 mb-1">{companyData.stats.employees}</div>
              <div className="text-label">Employees</div>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-24 bg-surface">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <SectionHeading
              title="Our Products"
              subtitle="Couplings and pulleys for industrial power transmission."
              className="mb-0"
            />
            <Link to="/products" className="hidden md:flex items-center font-semibold text-primary-600 hover:text-accent transition-colors gap-2">
              View All Products <ArrowRight size={20} aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.slice(0, 3).map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>

          <div className="mt-12 text-center md:hidden">
            <Link to="/products" className="btn btn-outline w-full sm:w-auto">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* About preview */}
      <section className="py-24 bg-surface-alt border-y border-primary-100">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <div className="aspect-[4/3] rounded-md overflow-hidden border border-primary-100">
                <img src="/images/site/home-about-960.webp" srcSet="/images/site/home-about-480.webp 480w, /images/site/home-about-640.webp 640w, /images/site/home-about-960.webp 960w, /images/site/home-about-1280.webp 1280w" sizes="(min-width: 1024px) 800px, 480px" width="1280" height="720" loading="lazy" decoding="async" alt="Lakshmi Pulley parts" className="w-full h-full object-cover" />
              </div>
            </div>

            <div className="lg:w-1/2">
              <SectionHeading title="About Lakshmi Pulley" />
              <p className="text-lg text-primary-600 mb-8">{companyData.description}</p>
              <Link to="/about" className="btn btn-primary inline-flex items-center gap-2">
                Read More <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="container my-20">
        <QuoteCTA />
      </div>
    </div>
  );
}
