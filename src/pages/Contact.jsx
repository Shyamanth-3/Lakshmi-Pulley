import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import SectionHeading from '../components/SectionHeading';
import { site } from '../data/site';
import { MapPin, Phone, Mail, Map as MapIcon } from 'lucide-react';

// Full address (building number + street, not just the neighborhood) so the map pins the exact
// location instead of a general-area search. Built from site.js — the one source of truth for the
// address — not a second hard-coded string.
const fullAddress = `${site.contact.address.line1}, ${site.contact.address.line2}`;
const MAP_SRC = `https://maps.google.com/maps?q=${encodeURIComponent(fullAddress)}&output=embed`;

// Original Contact composition restored (commit d1e8746): card shadow/border treatment, map area.
// tel: links and click-to-load map are kept (accessibility/performance additions, not visual changes).
export default function Contact() {
  const [mapLoaded, setMapLoaded] = useState(false);

  return (
    <div className="bg-surface pb-20 pt-8">
      <div className="container mb-4">
        <Breadcrumb items={[{ label: 'Contact Us' }]} />
      </div>

      <div className="container">
        <h1 className="sr-only">Contact {site.name}</h1>
        <SectionHeading
          title="Get in Touch with Lakshmi Pulley"
          subtitle="Have a question about our industrial pulleys or need a custom quote? The Lakshmi Pulley team is ready to help with all your power transmission needs."
        />

        <div className="flex flex-col lg:flex-row gap-12">

          {/* Contact Cards */}
          <div className="lg:w-1/3 flex flex-col gap-6">
            <div className="bg-white p-6 rounded-xl border border-primary-100 shadow-sm flex items-start gap-5 hover:border-primary-300 transition-colors">
              <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center text-accent shrink-0">
                <MapPin size={24} aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-lg font-bold font-heading text-primary-700 mb-2">Our Office</h3>
                <p className="text-primary-600 leading-relaxed text-sm">
                  {site.name}<br />
                  {site.contact.address.line1},<br />
                  {site.contact.address.line2}<br />
                  {site.contact.address.country}
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-primary-100 shadow-sm flex items-start gap-5 hover:border-primary-300 transition-colors">
              <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center text-accent shrink-0">
                <Phone size={24} aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-lg font-bold font-heading text-primary-700 mb-2">Phone</h3>
                <div className="flex flex-col gap-1 text-sm">
                  {site.contact.phones.map((phone) => (
                    <a key={phone} href={`tel:${phone.replace(/\s+/g, '')}`} className="text-primary-600 hover:text-accent">
                      {phone}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-primary-100 shadow-sm flex items-start gap-5 hover:border-primary-300 transition-colors">
              <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center text-accent shrink-0">
                <Mail size={24} aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-lg font-bold font-heading text-primary-700 mb-2">Email</h3>
                <div className="flex flex-col gap-1 text-sm font-medium">
                  {site.contact.emails.map((email) => (
                    <a key={email} href={`mailto:${email}`} className="hover:text-accent transition-colors">
                      {email}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Map Area */}
          <div className="lg:w-2/3">
            <div className="bg-white p-2 rounded-xl border border-primary-100 shadow-sm h-full min-h-[400px] flex items-center justify-center">
              {mapLoaded ? (
                <iframe
                  src={MAP_SRC}
                  width="100%"
                  height="100%"
                  style={{ border: 0, borderRadius: '0.5rem', minHeight: '400px' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lakshmi Pulleys Map Location"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setMapLoaded(true)}
                  className="flex flex-col items-center gap-3 text-primary-600 hover:text-accent p-12 min-h-[44px]"
                >
                  <MapIcon size={40} aria-hidden="true" />
                  <span className="font-semibold">Load Map</span>
                  <span className="text-sm text-primary-500">{site.contact.address.line1}, {site.contact.address.line2}</span>
                </button>
              )}
            </div>
          </div>

        </div>

        <p className="text-sm text-primary-600 mt-8">
          See our <Link to="/privacy" className="text-primary-600 hover:text-accent font-medium">Privacy Policy</Link> for how we handle information you send us.
        </p>
      </div>
    </div>
  );
}
