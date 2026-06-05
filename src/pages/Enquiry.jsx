import React, { useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import SectionHeading from '../components/SectionHeading';
import { companyData } from '../data/company';
import { Send, Sparkles, Loader2, AlertCircle } from 'lucide-react';

const initialFormData = {
  fullName: '',
  companyName: '',
  email: '',
  phone: '',
  productCategory: 'Flexible Jaw Couplings',
  quantity: '',
  description: '',
  // Pulley fields
  motorPulleySize: '',
  drivenPulleySize: '',
  // Coupling fields
  powerToTransmit: '',
  shaftSpeed: '',
  drivingShaftDia: '',
  drivenShaftDia: '',
  motorType: '',
  dutyHours: '',
};

export default function Enquiry() {
  const [formData, setFormData] = useState(initialFormData);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      let result;
      try {
        result = await response.json();
      } catch {
        throw new Error('Server returned an invalid response. Make sure the app is deployed to Vercel.');
      }

      if (!response.ok) {
        throw new Error(result.details ? result.details.join(', ') : result.error || 'Something went wrong');
      }

      setSubmitted(true);
      setFormData(initialFormData);
      window.scrollTo(0, 0);
    } catch (err) {
      setError(err.message || 'Failed to submit enquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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

                {/* Error notification */}
                {error && (
                  <div className="mb-6 flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-lg">
                    <AlertCircle size={20} className="mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-sm">Submission Failed</p>
                      <p className="text-sm mt-1">{error}</p>
                    </div>
                  </div>
                )}

                {/* 1. Contact Info */}
                <h3 className="text-xl font-bold font-heading text-primary-700 mb-6 pb-2 border-b border-primary-50">1. Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                  <div>
                    <label className="block text-sm font-semibold text-primary-600 mb-2">Full Name *</label>
                    <input required type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full px-4 py-3 bg-surface-alt border border-primary-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-primary-600 mb-2">Company Name</label>
                    <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} className="w-full px-4 py-3 bg-surface-alt border border-primary-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-primary-600 mb-2">Email Address *</label>
                    <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 bg-surface-alt border border-primary-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-primary-600 mb-2">Phone Number *</label>
                    <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 bg-surface-alt border border-primary-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all" />
                  </div>
                </div>

                {/* 2. Primary Requirement */}
                <h3 className="text-xl font-bold font-heading text-primary-700 mb-6 pb-2 border-b border-primary-50">2. Primary Requirement</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                  <div>
                    <label className="block text-sm font-semibold text-primary-600 mb-2">Product Category</label>
                    <select
                      className="w-full px-4 py-3 bg-surface-alt border border-primary-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all"
                      name="productCategory"
                      value={formData.productCategory}
                      onChange={handleChange}
                    >
                      <option value="Flexible Jaw Couplings">Flexible Jaw Couplings</option>
                      <option value="Flexible Pin Bush Couplings">Flexible Pin Bush Couplings</option>
                      <option value="Flexible Tyre Couplings">Flexible Tyre Couplings</option>
                      <option value="Gear Couplings">Gear Couplings</option>
                      <option value="LHRC Couplings">LHRC Couplings</option>
                      <option value="Resilient Grid Couplings">Resilient Grid Couplings</option>
                      <option value="V-Pulleys">V-Pulleys</option>
                      <option value="EasyFIT(Taper) Timing Pulleys">EasyFIT(Taper) Timing Pulleys</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-primary-600 mb-2">Quantity Required</label>
                    <input type="text" name="quantity" value={formData.quantity} onChange={handleChange} className="w-full px-4 py-3 bg-surface-alt border border-primary-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all" placeholder="e.g. 50 nos" />
                  </div>
                  <div className="md:col-span-2 text-primary-700">
                    <label className="block text-sm font-semibold text-primary-600 mb-2">General Description / Application</label>
                    <textarea rows="3" name="description" value={formData.description} onChange={handleChange} className="w-full px-4 py-3 bg-surface-alt border border-primary-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all" placeholder="Describe where you intend to use this..."></textarea>
                  </div>
                </div>

                {/* 3. Technical Specs (Optional but helpful) */}
                <h3 className="text-xl font-bold font-heading text-primary-700 mb-6 pb-2 border-b border-primary-50 flex justify-between items-end">
                  3. Technical Specifications
                  <span className="text-xs font-normal bg-primary-50 px-2 py-1 rounded text-primary-500">Optional</span>
                </h3>

                {['V-Pulleys', 'EasyFIT(Taper) Timing Pulleys'].includes(formData.productCategory) ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                    <div>
                      <label className="block text-sm font-semibold text-primary-600 mb-2">Size of Pulley on Motor</label>
                      <input type="text" name="motorPulleySize" value={formData.motorPulleySize} onChange={handleChange} className="w-full px-4 py-3 bg-surface-alt border border-primary-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all text-sm" placeholder="Eg: 250mm PCD X 5 Grooves X SPB" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-primary-600 mb-2">Size of Pulley on Driven Eqp.</label>
                      <input type="text" name="drivenPulleySize" value={formData.drivenPulleySize} onChange={handleChange} className="w-full px-4 py-3 bg-surface-alt border border-primary-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all text-sm" placeholder="Eg: 475mm PCD X 5 Grooves X SPB" />
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                    <div>
                      <label className="block text-sm font-semibold text-primary-600 mb-2">Power to be Transmitted (KW / HP)</label>
                      <input type="text" name="powerToTransmit" value={formData.powerToTransmit} onChange={handleChange} className="w-full px-4 py-3 bg-surface-alt border border-primary-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all" placeholder="e.g. 15 KW" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-primary-600 mb-2">Speed of shafts (RPM)</label>
                      <input type="text" name="shaftSpeed" value={formData.shaftSpeed} onChange={handleChange} className="w-full px-4 py-3 bg-surface-alt border border-primary-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all" placeholder="e.g. 1500 RPM" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-primary-600 mb-2">Diameter of Driving Shaft</label>
                      <input type="text" name="drivingShaftDia" value={formData.drivingShaftDia} onChange={handleChange} className="w-full px-4 py-3 bg-surface-alt border border-primary-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all" placeholder="e.g. 40mm" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-primary-600 mb-2">Diameter of Driven Shaft</label>
                      <input type="text" name="drivenShaftDia" value={formData.drivenShaftDia} onChange={handleChange} className="w-full px-4 py-3 bg-surface-alt border border-primary-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all" placeholder="e.g. 50mm" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-primary-600 mb-2">Type of Motor / Prime mover</label>
                      <input type="text" name="motorType" value={formData.motorType} onChange={handleChange} className="w-full px-4 py-3 bg-surface-alt border border-primary-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-primary-600 mb-2">No. of Duty Hours per Day</label>
                      <input type="text" name="dutyHours" value={formData.dutyHours} onChange={handleChange} className="w-full px-4 py-3 bg-surface-alt border border-primary-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all" placeholder="e.g. 12 hours" />
                    </div>
                  </div>
                )}

                <div className="flex justify-end pt-4 border-t border-primary-100">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary text-lg px-8 py-4 w-full md:w-auto flex justify-center items-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-1 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-lg"
                  >
                    {isSubmitting ? (
                      <>Sending... <Loader2 size={20} className="animate-spin" /></>
                    ) : (
                      <>Send Enquiry <Send size={20} /></>
                    )}
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
                <h3 className="text-2xl font-bold font-heading mb-4 text-accent">Need help selecting?</h3>
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
