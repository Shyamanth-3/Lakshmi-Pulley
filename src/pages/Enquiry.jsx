import React, { useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import SectionHeading from '../components/SectionHeading';
import { companyData } from '../data/company';
import { Send, Sparkles } from 'lucide-react';

export default function Enquiry() {
  const [productType, setProductType] = useState('Couplings');
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      setSubmitted(true);
      window.scrollTo(0, 0);
    }, 800);
  };

  return (
    <div className="bg-surface pb-20 pt-8">
      <div className="container mx-auto px-4 mb-4">
        <Breadcrumb items={[{ label: 'Request Enquiry' }]} />
      </div>

      <div className="container mx-auto px-4">
        <SectionHeading 
          title="Product Enquiry Form" 
          subtitle="Provide us with details about your requirements and our technical team will get back to you with the best solutions and quotes."
        />

        {submitted ? (
          <div className="bg-green-50 border border-green-200 rounded-xl p-12 text-center max-w-2xl mx-auto shadow-sm">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
              <Send size={32} />
            </div>
            <h2 className="text-3xl font-bold font-heading text-primary-700 mb-4">Enquiry Submitted!</h2>
            <p className="text-lg text-primary-600 mb-8">
              Thank you for reaching out. Our sales team has received your request and will contact you shortly with the details.
            </p>
            <button 
              onClick={() => setSubmitted(false)}
              className="btn btn-primary"
            >
              Submit Another Request
            </button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Form Section */}
            <div className="lg:w-2/3 text-primary-700">
              <form onSubmit={handleSubmit} className="bg-white p-8 md:p-10 rounded-2xl shadow-lg border border-primary-100">
                
                {/* 1. Contact Info */}
                <h3 className="text-xl font-bold font-heading text-primary-700 mb-6 pb-2 border-b border-primary-50">1. Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                  <div>
                    <label className="block text-sm font-semibold text-primary-600 mb-2">Full Name *</label>
                    <input required type="text" className="w-full px-4 py-3 bg-surface-alt border border-primary-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-primary-600 mb-2">Company Name</label>
                    <input type="text" className="w-full px-4 py-3 bg-surface-alt border border-primary-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all" placeholder="ABC Industries" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-primary-600 mb-2">Email Address *</label>
                    <input required type="email" className="w-full px-4 py-3 bg-surface-alt border border-primary-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all" placeholder="john@example.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-primary-600 mb-2">Phone Number *</label>
                    <input required type="tel" className="w-full px-4 py-3 bg-surface-alt border border-primary-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all" placeholder="+91 98765 43210" />
                  </div>
                </div>

                {/* 2. Primary Requirement */}
                <h3 className="text-xl font-bold font-heading text-primary-700 mb-6 pb-2 border-b border-primary-50">2. Primary Requirement</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                  <div>
                    <label className="block text-sm font-semibold text-primary-600 mb-2">Product Category</label>
                    <select 
                      className="w-full px-4 py-3 bg-surface-alt border border-primary-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all"
                      value={productType}
                      onChange={(e) => setProductType(e.target.value)}
                    >
                      <option value="Couplings">Couplings</option>
                      <option value="Pulleys">Pulleys</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-primary-600 mb-2">Quantity Required</label>
                    <input type="text" className="w-full px-4 py-3 bg-surface-alt border border-primary-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all" placeholder="e.g. 50 nos" />
                  </div>
                  <div className="md:col-span-2 text-primary-700">
                    <label className="block text-sm font-semibold text-primary-600 mb-2">General Description / Application</label>
                    <textarea rows="3" className="w-full px-4 py-3 bg-surface-alt border border-primary-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all" placeholder="Describe where you intend to use this..."></textarea>
                  </div>
                </div>

                {/* 3. Technical Specs (Optional but helpful) */}
                <h3 className="text-xl font-bold font-heading text-primary-700 mb-6 pb-2 border-b border-primary-50 flex justify-between items-end">
                  3. Technical Specifications 
                  <span className="text-xs font-normal bg-primary-50 px-2 py-1 rounded text-primary-500">Optional</span>
                </h3>
                
                {productType === 'Pulleys' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                    <div>
                      <label className="block text-sm font-semibold text-primary-600 mb-2">Size of Pulley on Motor</label>
                      <input type="text" className="w-full px-4 py-3 bg-surface-alt border border-primary-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all text-sm" placeholder="Eg: 250mm PCD X 5 Grooves X SPB" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-primary-600 mb-2">Size of Pulley on Driven Eqp.</label>
                      <input type="text" className="w-full px-4 py-3 bg-surface-alt border border-primary-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all text-sm" placeholder="Eg: 475mm PCD X 5 Grooves X SPB" />
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                    <div>
                      <label className="block text-sm font-semibold text-primary-600 mb-2">Power to be Transmitted (KW / HP)</label>
                      <input type="text" className="w-full px-4 py-3 bg-surface-alt border border-primary-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all" placeholder="e.g. 15 KW" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-primary-600 mb-2">Speed of shafts (RPM)</label>
                      <input type="text" className="w-full px-4 py-3 bg-surface-alt border border-primary-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all" placeholder="e.g. 1500 RPM" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-primary-600 mb-2">Diameter of Driving Shaft</label>
                      <input type="text" className="w-full px-4 py-3 bg-surface-alt border border-primary-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all" placeholder="e.g. 40mm" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-primary-600 mb-2">Diameter of Driven Shaft</label>
                      <input type="text" className="w-full px-4 py-3 bg-surface-alt border border-primary-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all" placeholder="e.g. 50mm" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-primary-600 mb-2">Type of Motor / Prime mover</label>
                      <input type="text" className="w-full px-4 py-3 bg-surface-alt border border-primary-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-primary-600 mb-2">No. of Duty Hours per Day</label>
                      <input type="text" className="w-full px-4 py-3 bg-surface-alt border border-primary-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all" placeholder="e.g. 12 hours" />
                    </div>
                  </div>
                )}

                <div className="flex justify-end pt-4 border-t border-primary-100">
                  <button type="submit" className="btn btn-primary text-lg px-8 py-4 w-full md:w-auto flex justify-center items-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-1">
                    Send Enquiry <Send size={20} />
                  </button>
                </div>
              </form>
            </div>

            {/* Sidebar info */}
            <div className="lg:w-1/3">
              <div className="bg-gradient-to-br from-primary-700 to-primary-600 rounded-2xl p-8 text-white shadow-xl sticky top-28">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                  <Sparkles className="text-accent" size={24} />
                </div>
                <h3 className="text-2xl font-bold font-heading mb-4">Need help selecting?</h3>
                <p className="text-primary-100 leading-relaxed mb-6">
                  If you need our technical assistance in selecting the perfect drive or coupling size for your machinery, please fill out the optional technical specifications. 
                </p>
                <div className="space-y-4">
                  <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm border border-white/10">
                    <div className="font-semibold text-accent mb-1">Direct Contact</div>
                    {companyData.contact.phones.slice(0, 2).map((phone, idx) => (
                      <div key={idx} className="text-sm text-primary-100">{phone}</div>
                    ))}
                    <div className="mt-2">
                      {companyData.contact.email.map((e, idx) => (
                        <div key={`e-${idx}`} className="text-sm text-primary-100">{e}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
