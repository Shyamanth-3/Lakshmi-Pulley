import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ChevronRight } from 'lucide-react';
import { companyData } from '../data/company';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface border-t border-primary-100 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Col */}
          <div>
            <div className="mb-6 flex items-center">
              <img src="/Assets/logo3.png" alt="Lakshmi Pulleys Logo" className="h-14 w-auto mix-blend-multiply" />
            </div>
            <p className="text-primary-600 text-sm leading-relaxed mb-6 mt-4">
              {companyData.tagline}. Delivering excellence since {companyData.established}.
            </p>
            <div className="flex items-center gap-2 mb-6">
              <span className="font-semibold px-2 py-1 bg-primary-600 text-white rounded text-xs border border-primary-500">ISO 9001:2000 Certified</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 font-heading text-primary-700 border-b border-primary-100 pb-2 inline-block">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { name: 'Home', path: '/' },
                { name: 'About Us', path: '/about' },
                { name: 'Products', path: '/products' },
                { name: 'Enquiry', path: '/enquiry' },
                { name: 'Contact Us', path: '/contact' }
              ].map(link => (
                <li key={link.name}>
                  <Link to={link.path} className="text-primary-600 hover:text-accent flex items-center transition-colors text-sm font-medium">
                    <ChevronRight size={14} className="mr-2 text-accent" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-lg font-bold mb-6 font-heading text-primary-700 border-b border-primary-100 pb-2 inline-block">Our Products</h4>
            <ul className="space-y-3">
              {[
                { name: 'Flexible Jaw Couplings', path: '/products/flexible-jaw-couplings' },
                { name: 'Flexible Pin Bush Couplings', path: '/products/flexible-pin-bush-couplings' },
                { name: 'Flexible Tyre Couplings', path: '/products/flexible-tyre-couplings' },
                { name: 'Gear Couplings', path: '/products/gear-couplings' },
                { name: 'V-Pulleys', path: '/products/v-pulleys' }
              ].map(link => (
                <li key={link.name}>
                  <Link to={link.path} className="text-primary-600 hover:text-accent flex items-center transition-colors text-sm font-medium">
                    <ChevronRight size={14} className="mr-2 text-accent" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Col */}
          <div>
            <h4 className="text-lg font-bold mb-6 font-heading text-primary-700 border-b border-primary-100 pb-2 inline-block">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-primary-600 text-sm font-medium">
                <MapPin className="text-accent shrink-0 mt-1" size={18} />
                <span>{companyData.contact.address.line1},<br />{companyData.contact.address.line2}</span>
              </li>
              <li className="flex items-center gap-3 text-primary-600 text-sm font-medium">
                <Phone className="text-accent shrink-0" size={18} />
                <div className="flex flex-col">
                  <span>{companyData.contact.phones[0]}</span>
                  <span>{companyData.contact.phones[2]}</span>
                </div>
              </li>
              <li className="flex items-start gap-3 text-primary-600 text-sm font-medium">
                <Mail className="text-accent shrink-0 mt-1" size={18} />
                <div className="flex flex-col gap-1">
                  {companyData.contact.email.map((e, idx) => (
                    <a key={idx} href={`mailto:${e}`} className="hover:text-accent transition-colors">
                      {e}
                    </a>
                  ))}
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-100 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary-500 font-medium text-sm">
            &copy; {currentYear} {companyData.name}. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
