import React from 'react';
import Breadcrumb from '../components/Breadcrumb';
import SectionHeading from '../components/SectionHeading';
import StatCard from '../components/StatCard';
import CTASection from '../components/CTASection';
import { companyData } from '../data/company';
import { Factory, Award, Target, Globe2 } from 'lucide-react';

export default function About() {
  return (
    <div className="bg-surface pb-0 pt-8">
      <div className="container mx-auto px-4 mb-4">
        <Breadcrumb items={[{ label: 'About Us' }]} />
      </div>

      {/* Hero Section */}
      <section className="container mx-auto px-4 mb-20">
        <div className="bg-primary-700 rounded-2xl overflow-hidden shadow-2xl relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -translate-y-1/2 translate-x-1/3"></div>
          
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/2 p-12 lg:p-20 flex flex-col justify-center relative z-10">
              <h1 className="text-4xl lg:text-5xl font-bold font-heading text-white mb-6">Our Legacy of Excellence</h1>
              <p className="text-primary-100 text-lg leading-relaxed">
                {companyData.description}
              </p>
            </div>
            <div className="lg:w-1/2 relative min-h-[300px] lg:min-h-auto">
              <img src="/Assets/power.jpg" alt="Lakshmi Pulleys Factory" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-l from-transparent to-primary-700/80"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Stats Grid */}
      <section className="container mx-auto px-4 mb-24">
        <SectionHeading title="Company At A Glance" className="text-center" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard icon={Factory} value={companyData.established} label="Year Established" />
          <StatCard icon={Award} value="ISO 9001" label="Certification" />
          <StatCard icon={Globe2} value="SE Asia" label="Main Markets" />
          <StatCard icon={Target} value="OEM/OBM" label="Contract Mfg." />
        </div>
      </section>

      {/* Detailed Info Cards */}
      <section className="bg-surface-alt py-24 mb-0 border-t border-primary-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Leadership & Identity */}
            <div className="bg-white p-8 rounded-xl border border-primary-100 shadow-sm">
              <h3 className="text-2xl font-bold font-heading text-primary-700 mb-6 pb-4 border-b border-primary-100">Identity & Leadership</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4 border-b border-primary-50 pb-4">
                  <div className="text-sm font-semibold text-primary-500 uppercase">Entity</div>
                  <div className="col-span-2 text-primary-700 font-medium">{companyData.name}</div>
                </div>
                <div className="grid grid-cols-3 gap-4 border-b border-primary-50 pb-4">
                  <div className="text-sm font-semibold text-primary-500 uppercase">Type</div>
                  <div className="col-span-2 text-primary-700 font-medium">Manufacturer (Sole proprietorship)</div>
                </div>
                <div className="grid grid-cols-3 gap-4 border-b border-primary-50 pb-4">
                  <div className="text-sm font-semibold text-primary-500 uppercase">Leadership</div>
                  <div className="col-span-2 text-primary-700 font-medium">
                    {companyData.leadership.name}<br/>
                    <span className="text-sm text-primary-500 font-normal">{companyData.leadership.role} — {companyData.leadership.degree}</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 pb-2">
                  <div className="text-sm font-semibold text-primary-500 uppercase">Experience</div>
                  <div className="col-span-2 text-primary-700 font-medium">{companyData.leadership.experience}</div>
                </div>
              </div>
            </div>

            {/* Industrial Capacity */}
            <div className="bg-white p-8 rounded-xl border border-primary-100 shadow-sm">
              <h3 className="text-2xl font-bold font-heading text-primary-700 mb-6 pb-4 border-b border-primary-100">Industrial Capacity</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4 border-b border-primary-50 pb-4">
                  <div className="text-sm font-semibold text-primary-500 uppercase">Facility Site</div>
                  <div className="col-span-2 text-primary-700 font-medium">{companyData.stats.factorySize} in India</div>
                </div>
                <div className="grid grid-cols-3 gap-4 border-b border-primary-50 pb-4">
                  <div className="text-sm font-semibold text-primary-500 uppercase">Employees</div>
                  <div className="col-span-2 text-primary-700 font-medium">{companyData.stats.employees} People (<span className="text-sm">Includes 5-10 QC Staff</span>)</div>
                </div>
                <div className="grid grid-cols-3 gap-4 border-b border-primary-50 pb-4">
                  <div className="text-sm font-semibold text-primary-500 uppercase">Prod. Lines</div>
                  <div className="col-span-2 text-primary-700 font-medium">3 Active Lines</div>
                </div>
                <div className="grid grid-cols-3 gap-4 pb-2">
                  <div className="text-sm font-semibold text-primary-500 uppercase">Sales Volume</div>
                  <div className="col-span-2 text-primary-700 font-medium">{companyData.stats.revenue} Annual</div>
                </div>
              </div>
            </div>
            
            {/* Quality Statement (Full Width Span) */}
            <div className="col-span-1 lg:col-span-2 bg-primary-600 text-white p-8 md:p-12 rounded-xl shadow-lg mt-4 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-48 h-48 bg-primary-500 rounded-full mix-blend-multiply opacity-50 -translate-y-1/2 translate-x-1/4"></div>
              <h3 className="text-2xl font-bold font-heading mb-6 relative z-10">Quality Control Guarantee</h3>
              <p className="text-lg text-primary-100 leading-relaxed relative z-10 max-w-4xl">
                {companyData.qualityStatement}
              </p>
            </div>

          </div>
        </div>
      </section>
      
      <CTASection title="Discover Our Products" subtitle="Explore our wide range of power transmission solutions manufactured with the highest quality standards." primaryButtonText="View Products" primaryButtonLink="/products"/>
    </div>
  );
}
