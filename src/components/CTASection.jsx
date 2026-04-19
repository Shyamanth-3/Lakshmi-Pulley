import React from 'react';
import { Link } from 'react-router-dom';

export default function CTASection({ 
  title = "Ready to discuss your power transmission requirements?", 
  subtitle = "Our technical experts are ready to help you select the ideal coupling or pulley for your specific application.",
  primaryButtonText = "Request a Quote",
  primaryButtonLink = "/enquiry",
  secondaryButtonText = "Contact Us",
  secondaryButtonLink = "/contact"
}) {
  return (
    <section className="bg-primary-700 py-20 relative overflow-hidden">
      {/* Abstract background shapes */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-y-1/2 -translate-x-1/4"></div>
      
      <div className="container mx-auto px-4 relative z-10 text-center">
        <h2 className="text-3xl md:text-5xl font-bold font-heading text-white mb-6 max-w-4xl mx-auto leading-tight">
          {title}
        </h2>
        <p className="text-xl text-primary-100 mb-10 max-w-2xl mx-auto">
          {subtitle}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to={primaryButtonLink} className="w-full sm:w-auto btn btn-accent text-lg px-8 py-3 shadow-lg hover:shadow-xl">
            {primaryButtonText}
          </Link>
          <Link to={secondaryButtonLink} className="w-full sm:w-auto btn bg-white/10 text-white hover:bg-white/20 text-lg px-8 py-3 backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all">
            {secondaryButtonText}
          </Link>
        </div>
      </div>
    </section>
  );
}
