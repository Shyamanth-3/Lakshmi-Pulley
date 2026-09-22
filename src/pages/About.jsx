import React from 'react';
import Breadcrumb from '../components/Breadcrumb';
import SectionHeading from '../components/SectionHeading';
import StatCard from '../components/StatCard';
import QuoteCTA from '../components/QuoteCTA';
import { companyData } from '../data/company';
import { site } from '../data/site';
import { Factory, Users2, Building2, Wallet } from 'lucide-react';

// Original About composition restored (commit d1e8746): navy hero card, stats grid, leadership/
// capacity/quality detail cards, closing CTA. The stats grid and capacity card previously carried
// unverified claims (ISO 9001, "SE Asia" markets, "OEM/OBM", production-line count, QC staffing) —
// those are not restored; every figure below comes straight from src/data/company.js.
export default function About() {
  return (
    <div className="bg-surface pb-0 pt-8">
      <div className="container mb-4">
        <Breadcrumb items={[{ label: 'About Us' }]} />
      </div>

      {/* Hero */}
      <section className="container mb-20">
        <div className="bg-primary-700 rounded-2xl overflow-hidden shadow-2xl relative">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/2 p-12 lg:p-20 flex flex-col justify-center relative z-10">
              <h1 className="text-4xl lg:text-5xl font-bold font-heading text-white mb-6">About {site.name}</h1>
              <p className="text-primary-100 text-lg leading-relaxed">
                {companyData.description}
              </p>
            </div>
            <div className="lg:w-1/2 relative min-h-[300px]">
              <img src="/images/site/about-hero-1280.webp" srcSet="/images/site/about-hero-640.webp 640w, /images/site/about-hero-960.webp 960w, /images/site/about-hero-1280.webp 1280w" sizes="800px" width="1280" height="640" fetchPriority="high" alt="Lakshmi Pulleys factory" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-l from-transparent to-primary-700/80"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Stats — verified figures only */}
      <section className="container mb-24">
        <SectionHeading title="Company At A Glance" className="text-center" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard icon={Factory} value={companyData.established} label="Established" />
          <StatCard icon={Users2} value={companyData.stats.employees} label="Employees" />
          <StatCard icon={Building2} value={companyData.stats.factorySize} label="Facility Size" />
          <StatCard icon={Wallet} value={companyData.stats.revenue} label="Annual Revenue" />
        </div>
      </section>

      {/* Detail cards */}
      <section className="bg-surface-alt py-24 border-t border-primary-100">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            <div className="bg-white p-8 rounded-xl border border-primary-100 shadow-sm">
              <h3 className="mb-6 pb-4 border-b border-primary-100">Identity &amp; Leadership</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4 border-b border-primary-50 pb-4">
                  <div className="text-sm font-semibold text-primary-500 uppercase">Entity</div>
                  <div className="col-span-2 text-primary-700 font-medium">{site.name}</div>
                </div>
                <div className="grid grid-cols-3 gap-4 border-b border-primary-50 pb-4">
                  <div className="text-sm font-semibold text-primary-500 uppercase">Leadership</div>
                  <div className="col-span-2 text-primary-700 font-medium">
                    {companyData.leadership.name}<br />
                    <span className="text-sm text-primary-500 font-normal">{companyData.leadership.role} — {companyData.leadership.degree}</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 pb-2">
                  <div className="text-sm font-semibold text-primary-500 uppercase">Experience</div>
                  <div className="col-span-2 text-primary-700 font-medium">{companyData.leadership.experience}</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl border border-primary-100 shadow-sm">
              <h3 className="mb-6 pb-4 border-b border-primary-100">Industrial Capacity</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4 border-b border-primary-50 pb-4">
                  <div className="text-sm font-semibold text-primary-500 uppercase">Facility Site</div>
                  <div className="col-span-2 text-primary-700 font-medium">{companyData.stats.factorySize}</div>
                </div>
                <div className="grid grid-cols-3 gap-4 border-b border-primary-50 pb-4">
                  <div className="text-sm font-semibold text-primary-500 uppercase">Employees</div>
                  <div className="col-span-2 text-primary-700 font-medium">{companyData.stats.employees}</div>
                </div>
                <div className="grid grid-cols-3 gap-4 pb-2">
                  <div className="text-sm font-semibold text-primary-500 uppercase">Sales Volume</div>
                  <div className="col-span-2 text-primary-700 font-medium">{companyData.stats.revenue} Annual</div>
                </div>
              </div>
            </div>

            <div className="col-span-1 lg:col-span-2 bg-primary-600 text-white p-8 md:p-12 rounded-xl shadow-lg mt-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary-500 rounded-full mix-blend-multiply opacity-50 -translate-y-1/2 translate-x-1/4"></div>
              <h3 className="text-white mb-6 relative z-10">Quality Control Guarantee</h3>
              <p className="text-lg text-primary-100 leading-relaxed relative z-10 max-w-4xl">
                {companyData.qualityStatement}
              </p>
            </div>

          </div>
        </div>
      </section>

      <QuoteCTA title="Discover Our Products" subtitle="Explore our wide range of power transmission solutions manufactured with the highest quality standards." to="/products" buttonText="View Products" />
    </div>
  );
}
