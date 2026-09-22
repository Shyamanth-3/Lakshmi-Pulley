import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { site, enquiryPhones } from '../data/site';

// Reached only via the "state" that Enquiry.jsx passes after a successful submission. A direct visit
// (bookmark, refresh, shared link) has no state — still a valid, useful confirmation, just without
// the specifics. noindex'd in src/seo.js; not a marketing page.
export default function ThankYou() {
  const { state } = useLocation();

  return (
    <div className="bg-surface pb-20 pt-8">
      <div className="container max-w-2xl">
        <div className="panel text-center py-12">
          <CheckCircle2 className="text-accent mx-auto mb-6" size={48} aria-hidden="true" />
          <h1 className="mb-4">Enquiry Submitted</h1>
          <p className="text-lg text-primary-600 mb-2">
            Thank you{state?.fullName ? `, ${state.fullName}` : ''}. We've received your enquiry
            {state?.productName ? <> for <strong className="text-primary-700">{state.productName}</strong></> : null}
            {state?.variantName ? <> ({state.variantName}{state.sizeCode ? `, size ${state.sizeCode}` : ''})</> : null}.
          </p>
          <p className="text-primary-600 mb-8">Our team will review your requirement and get in touch.</p>

          {state?.reference && (
            <div className="panel-notice inline-block px-6 py-3 mb-8">
              <div className="text-label">Reference Number</div>
              <div className="text-value text-lg font-semibold text-primary-700">{state.reference}</div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/products" className="btn btn-primary">Browse Products</Link>
            <Link to="/enquiry" className="btn btn-outline">Submit Another Enquiry</Link>
          </div>
        </div>

        <p className="text-center text-sm text-primary-600 mt-8">
          Need to reach us directly? Call {enquiryPhones.join(' or ')}
          {site.contact.emails[0] && <> or email <a href={`mailto:${site.contact.emails[0]}`} className="hover:text-accent">{site.contact.emails[0]}</a></>}.
        </p>
      </div>
    </div>
  );
}
