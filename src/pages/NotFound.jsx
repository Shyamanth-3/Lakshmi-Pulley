import React from 'react';
import { Link } from 'react-router-dom';
import { productLinks } from '../data/site';

// Shown for any URL that is not a real page (and for unknown product slugs). The production 404 status
// comes from Vercel serving dist/404.html; this component keeps the in-app view consistent with it.
export default function NotFound() {
  return (
    <div className="bg-surface pb-20 pt-8">
      <div className="container">
        <h1 className="mb-4">Page not found</h1>
        <p className="text-lg text-primary-600 mb-10 max-w-2xl">
          The page you asked for does not exist or has moved. These pages may help.
        </p>

        <h2 className="mb-4">Our products</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10 max-w-2xl">
          {productLinks.map((link) => (
            <li key={link.path}>
              <Link to={link.path} className="text-primary-600 hover:text-accent font-medium transition-colors">
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/enquiry" className="btn btn-primary">Request a Quote</Link>
          <Link to="/products" className="btn btn-outline">All Products</Link>
          <Link to="/" className="btn btn-outline">Home</Link>
        </div>
      </div>
    </div>
  );
}
