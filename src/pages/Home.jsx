import React from 'react';
import { Link } from 'react-router-dom';
import { Award, ShieldCheck, Settings, Users, ArrowRight } from 'lucide-react';
import { products } from '../data/products';
import { companyData } from '../data/company';
import ProductCard from '../components/ProductCard';
import SectionHeading from '../components/SectionHeading';
import QuoteCTA from '../components/QuoteCTA';

// Original Home composition restored (commit d1e8746): hero, floating stats bar, products
// overview, about preview, closing CTA. The stats bar content (40+ years, ISO 9001, 5+ product
// lines, 100+ enterprise clients) is restored verbatim per explicit request, overriding the
// content-integrity pass that removed it in Step 9 — these are not present in src/data/company.js.
export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative bg-primary-700 min-h-[65vh] flex items-center pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-60">
          <img src="/images/site/new-home-hero.png" fetchPriority="high" alt="Industrial Background" className="w-full h-full object-cover mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 via-primary-800/60 to-transparent"></div>
        </div>

        <div className="container relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-heading text-white leading-tight mt-10 mb-6">
              Precision Power <br className="hidden md:block" />
              <span className="text-accent">Transmission</span> Solutions
            </h1>

            <p className="text-lg md:text-xl text-primary-100 mb-10 max-w-2xl leading-relaxed text-balance">
              <strong className="text-white">Lakshmi Pulley</strong> — {companyData.description.split('.')[0]}.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/products" className="btn btn-accent text-lg px-8 py-3 shadow-lg hover:shadow-xl">
                Explore Products
              </Link>
              <Link to="/enquiry" className="btn bg-white/10 text-white hover:bg-white/20 text-lg px-8 py-3 border border-white/20 hover:border-white/40 transition-all">
                Request a Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar — restored exactly as the original, per explicit request */}
      <section className="bg-white border-b border-primary-100 relative -mt-5 -mb-10 z-20 mx-4 md:mx-auto md:w-[90%] lg:w-[80%] rounded-xl shadow-lg">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-y divide-x md:divide-y-0 divide-primary-100">
          <div className="p-6 md:p-8 text-center flex flex-col items-center justify-center">
            <Award className="text-accent mb-3" size={32} aria-hidden="true" />
            <div className="text-3xl font-bold font-heading text-primary-700 mb-1">40+</div>
            <div className="text-sm font-semibold text-primary-500 uppercase tracking-wide">Years Experience</div>
          </div>
          <div className="p-6 md:p-8 text-center flex flex-col items-center justify-center">
            <ShieldCheck className="text-accent mb-3" size={32} aria-hidden="true" />
            <div className="text-3xl font-bold font-heading text-primary-700 mb-1">ISO 9001</div>
            <div className="text-sm font-semibold text-primary-500 uppercase tracking-wide">Certified Quality</div>
          </div>
          <div className="p-6 md:p-8 text-center flex flex-col items-center justify-center">
            <Settings className="text-accent mb-3" size={32} aria-hidden="true" />
            <div className="text-3xl font-bold font-heading text-primary-700 mb-1">5+</div>
            <div className="text-sm font-semibold text-primary-500 uppercase tracking-wide">Product Lines</div>
          </div>
          <div className="p-6 md:p-8 text-center flex flex-col items-center justify-center">
            <Users className="text-accent mb-3" size={32} aria-hidden="true" />
            <div className="text-3xl font-bold font-heading text-primary-700 mb-1">100+</div>
            <div className="text-sm font-semibold text-primary-500 uppercase tracking-wide">Enterprise Clients</div>
          </div>
        </div>
      </section>

      {/* Products Overview */}
      <section className="py-24 bg-surface">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <SectionHeading
              title="Our Products"
              subtitle="Engineered for durability and performance in the most demanding industrial applications."
              className="mb-0"
            />
            <Link to="/products" className="hidden md:flex items-center font-semibold text-primary-600 hover:text-accent transition-colors gap-2 group">
              View All Catalog <ArrowRight size={20} className="transform group-hover:translate-x-1 transition-transform" aria-hidden="true" />
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

      {/* About Preview */}
      <section className="py-24 bg-surface-alt border-y border-primary-100">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2 relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl relative z-10">
                <img src="/images/site/home-about-960.webp" srcSet="/images/site/home-about-480.webp 480w, /images/site/home-about-640.webp 640w, /images/site/home-about-960.webp 960w, /images/site/home-about-1280.webp 1280w" sizes="(min-width: 1024px) 800px, 480px" width="1280" height="720" loading="lazy" decoding="async" alt="Lakshmi Pulley parts" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-primary-100 rounded-full mix-blend-multiply opacity-50 z-0"></div>
              <div className="absolute -top-8 -right-8 w-64 h-64 bg-accent/20 rounded-full mix-blend-multiply opacity-50 z-0"></div>
            </div>

            <div className="lg:w-1/2">
              <SectionHeading title="About Lakshmi Pulley" />
              <div className="prose prose-lg text-primary-600 mb-8 max-w-none">
                <p>{companyData.description}</p>
                <p className="font-medium text-primary-700 border-l-4 border-accent pl-4 py-1 mt-6">
                  "{companyData.qualityStatement.split('.')[0]}."
                </p>
              </div>

              <Link to="/about" className="btn btn-primary inline-flex items-center group">
                Read Our Story
                <ArrowRight size={18} className="ml-2 transform group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <QuoteCTA />
    </div>
  );
}
