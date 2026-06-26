import React from 'react';
import Breadcrumb from '../components/Breadcrumb';
import SectionHeading from '../components/SectionHeading';
import { companyData } from '../data/company';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Contact() {
  return (
    <div className="bg-surface pb-20 pt-8">
      <div className="container mx-auto px-4 mb-4">
        <Breadcrumb items={[{ label: 'Contact Us' }]} />
      </div>

      <div className="container mx-auto px-4">
        <SectionHeading 
          title="Get in Touch with Lakshmi Pulley" 
          subtitle="Have a question about our industrial pulleys or need a custom quote? The Lakshmi Pulley team is ready to help with all your power transmission needs."
        />

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Contact Cards */}
          <div className="lg:w-1/3 flex flex-col gap-6">
            <div className="bg-white p-6 rounded-xl border border-primary-100 shadow-sm flex items-start gap-5 hover:border-primary-300 transition-colors">
              <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center text-accent shrink-0">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="text-lg font-bold font-heading text-primary-700 mb-2">Our Office</h4>
                <p className="text-primary-600 leading-relaxed text-sm">
                  {companyData.name}<br/>
                  {companyData.contact.address.line1},<br/>
                  {companyData.contact.address.line2}<br/>
                  {companyData.contact.address.country}.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-primary-100 shadow-sm flex items-start gap-5 hover:border-primary-300 transition-colors">
              <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center text-accent shrink-0">
                <Phone size={24} />
              </div>
              <div>
                <h4 className="text-lg font-bold font-heading text-primary-700 mb-2">Phone</h4>
                <div className="flex flex-col gap-1 text-primary-600 text-sm">
                  {companyData.contact.phones.map((phone, idx) => (
                    <span key={idx}>{phone}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-primary-100 shadow-sm flex items-start gap-5 hover:border-primary-300 transition-colors">
              <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center text-accent shrink-0">
                <Mail size={24} />
              </div>
              <div>
                <h4 className="text-lg font-bold font-heading text-primary-700 mb-2">Email</h4>
                <div className="flex flex-col gap-1 text-primary-600 text-sm font-medium">
                  {companyData.contact.email.map((email, idx) => (
                    <a key={idx} href={`mailto:${email}`} className="hover:text-accent transition-colors">
                      {email}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Map Area */}
          <div className="lg:w-2/3">
            <div className="bg-white p-2 rounded-xl border border-primary-100 shadow-sm h-full min-h-[400px]">
              <iframe 
                src="https://maps.google.com/maps?q=Prashanthi%20Nagar%2C%20Kukatpally%2C%20Hyderabad-500072&output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0, borderRadius: '0.5rem', minHeight: '400px' }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Lakshmi Pulleys Map Location"
              ></iframe>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
