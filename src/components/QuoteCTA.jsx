import React from 'react';
import { Link } from 'react-router-dom';

// Restrained closing CTA for technical pages — a bordered panel, no gradients/blobs/blur
// (unlike CTASection, which still uses decorative blurred shapes for the marketing pages).
export default function QuoteCTA({
  title = 'Ready to discuss your requirement?',
  subtitle = 'Send us your product, quantity and shaft details and our team will get back to you.',
  to = '/enquiry',
  buttonText = 'Get a Quote',
}) {
  return (
    <section className="panel border-primary-100 text-center py-12">
      <h2 className="mb-3">{title}</h2>
      <p className="text-primary-600 mb-8 max-w-xl mx-auto">{subtitle}</p>
      <Link to={to} className="btn btn-primary">
        {buttonText}
      </Link>
    </section>
  );
}
