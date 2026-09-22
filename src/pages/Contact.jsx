import React, { useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import SectionHeading from '../components/SectionHeading';
import { site } from '../data/site';
import { MapPin, Phone, Mail, Map as MapIcon } from 'lucide-react';

const MAP_SRC = 'https://maps.google.com/maps?q=Prashanthi%20Nagar%2C%20Kukatpally%2C%20Hyderabad-500072&output=embed';

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
          title="Get in Touch"
          subtitle="Have a question about our products or need a custom quote? Reach us by phone, email or the enquiry form."
        />

        <div className="flex flex-col lg:flex-row gap-12">

          {/* Contact info */}
          <div className="lg:w-1/3 flex flex-col gap-6">
            <div className="panel flex items-start gap-5">
              <div className="w-12 h-12 bg-primary-50 rounded-md flex items-center justify-center text-accent shrink-0">
                <MapPin size={24} aria-hidden="true" />
              </div>
              <div>
                <h3 className="mb-2">Our Office</h3>
                <p className="text-primary-600 leading-relaxed text-sm">
                  {site.name}<br />
                  {site.contact.address.line1},<br />
                  {site.contact.address.line2}<br />
                  {site.contact.address.country}
                </p>
              </div>
            </div>

            <div className="panel flex items-start gap-5">
              <div className="w-12 h-12 bg-primary-50 rounded-md flex items-center justify-center text-accent shrink-0">
                <Phone size={24} aria-hidden="true" />
              </div>
              <div>
                <h3 className="mb-2">Phone</h3>
                <div className="flex flex-col gap-1 text-sm">
                  {site.contact.phones.map((phone) => (
                    <a key={phone} href={`tel:${phone.replace(/\s+/g, '')}`} className="text-primary-600 hover:text-accent">
                      {phone}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="panel flex items-start gap-5">
              <div className="w-12 h-12 bg-primary-50 rounded-md flex items-center justify-center text-accent shrink-0">
                <Mail size={24} aria-hidden="true" />
              </div>
              <div>
                <h3 className="mb-2">Email</h3>
                <div className="flex flex-col gap-1 text-sm font-medium">
                  {site.contact.emails.map((email) => (
                    <a key={email} href={`mailto:${email}`} className="text-primary-600 hover:text-accent">
                      {email}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Map — click-to-load, so a heavy embed isn't fetched on every page view */}
          <div className="lg:w-2/3">
            <div className="panel p-2 h-full min-h-[400px] flex items-center justify-center">
              {mapLoaded ? (
                <iframe
                  src={MAP_SRC}
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '400px' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`${site.name} location map`}
                  className="rounded-md"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setMapLoaded(true)}
                  className="flex flex-col items-center gap-3 text-primary-600 hover:text-accent p-12 min-h-[44px]"
                >
                  <MapIcon size={40} aria-hidden="true" />
                  <span className="font-semibold">Load Map</span>
                  <span className="text-meta">{site.contact.address.line1}, {site.contact.address.line2}</span>
                </button>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
