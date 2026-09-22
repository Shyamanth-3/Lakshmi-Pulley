import React from 'react';
import Breadcrumb from '../components/Breadcrumb';
import SectionHeading from '../components/SectionHeading';
import QuoteCTA from '../components/QuoteCTA';
import { companyData } from '../data/company';
import { site } from '../data/site';

export default function About() {
  return (
    <div className="bg-surface pb-0 pt-8">
      <div className="container mb-4">
        <Breadcrumb items={[{ label: 'About Us' }]} />
      </div>

      {/* Hero */}
      <section className="container mb-20">
        <div className="bg-primary-700 rounded-md overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/2 p-12 lg:p-20 flex flex-col justify-center">
              <h1 className="text-4xl lg:text-5xl font-bold font-heading text-white mb-6">About {site.name}</h1>
              <p className="text-primary-100 text-lg leading-relaxed">
                {companyData.description}
              </p>
            </div>
            <div className="lg:w-1/2 relative min-h-[300px]">
              <img src="/images/site/about-hero-1280.webp" srcSet="/images/site/about-hero-640.webp 640w, /images/site/about-hero-960.webp 960w, /images/site/about-hero-1280.webp 1280w" sizes="800px" width="1280" height="640" fetchPriority="high" alt="Lakshmi Pulleys factory" className="absolute inset-0 w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Facts — every figure below comes directly from src/data/company.js; nothing is estimated */}
      <section className="container mb-24">
        <SectionHeading title="Company At A Glance" className="text-center" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="panel text-center">
            <div className="text-3xl font-bold font-heading text-primary-700 mb-1">{companyData.established}</div>
            <div className="text-label">Established</div>
          </div>
          <div className="panel text-center">
            <div className="text-3xl font-bold font-heading text-primary-700 mb-1">{companyData.stats.employees}</div>
            <div className="text-label">Employees</div>
          </div>
          <div className="panel text-center">
            <div className="text-3xl font-bold font-heading text-primary-700 mb-1">{companyData.stats.factorySize}</div>
            <div className="text-label">Facility Size</div>
          </div>
          <div className="panel text-center">
            <div className="text-3xl font-bold font-heading text-primary-700 mb-1">{companyData.stats.revenue}</div>
            <div className="text-label">Annual Revenue</div>
          </div>
        </div>
      </section>

      {/* Detail cards */}
      <section className="bg-surface-alt py-24 border-t border-primary-100">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            <div className="panel">
              <h3 className="mb-6 pb-4 border-b border-primary-100">Identity &amp; Leadership</h3>
              <dl className="space-y-4">
                <div className="grid grid-cols-3 gap-4 border-b border-primary-50 pb-4">
                  <dt className="text-label">Entity</dt>
                  <dd className="col-span-2 text-primary-700 font-medium">{site.name}</dd>
                </div>
                <div className="grid grid-cols-3 gap-4 pb-2">
                  <dt className="text-label">Leadership</dt>
                  <dd className="col-span-2 text-primary-700 font-medium">
                    {companyData.leadership.name}<br />
                    <span className="text-meta">{companyData.leadership.role} — {companyData.leadership.degree}</span><br />
                    <span className="text-meta">{companyData.leadership.experience}</span>
                  </dd>
                </div>
              </dl>
            </div>

            <div className="panel">
              <h3 className="mb-6 pb-4 border-b border-primary-100">Quality</h3>
              <p className="text-primary-600 leading-relaxed">{companyData.qualityStatement}</p>
            </div>

          </div>
        </div>
      </section>

      <div className="container my-20">
        <QuoteCTA title="Discover Our Products" subtitle="Explore our range of power transmission components." to="/products" buttonText="View Products" />
      </div>
    </div>
  );
}
