import React from 'react';
import { Link } from 'react-router-dom';

// Original CTASection restored (commit d1e8746) — same copy, colors, two-button layout and shadows,
// minus the blurred decorative background shapes and the backdrop-blur on the secondary button.
export default function QuoteCTA({
  title = 'Ready to discuss your power transmission requirements?',
  subtitle = 'Our technical experts are ready to help you select the ideal coupling or pulley for your specific application.',
  to = '/enquiry',
  buttonText = 'Request a Quote',
  secondaryButtonText = 'Contact Us',
  secondaryButtonLink = '/contact',
}) {
  return (
    <section className="bg-primary-700 py-20">
      <div className="container text-center">
        <h2 className="text-white mb-6 max-w-4xl mx-auto leading-tight">{title}</h2>
        <p className="text-xl text-primary-100 mb-10 max-w-2xl mx-auto">{subtitle}</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to={to} className="w-full sm:w-auto btn btn-accent text-lg px-8 py-3 shadow-lg hover:shadow-xl">
            {buttonText}
          </Link>
          <Link to={secondaryButtonLink} className="w-full sm:w-auto btn bg-white/10 text-white hover:bg-white/20 text-lg px-8 py-3 border border-white/20 hover:border-white/40 transition-all">
            {secondaryButtonText}
          </Link>
        </div>
      </div>
    </section>
  );
}
