import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumb({ items }) {
  return (
    <nav className="flex items-center text-sm mb-8 overflow-x-auto pb-2 whitespace-nowrap">
      <Link to="/" className="text-primary-500 hover:text-accent transition-colors flex items-center">
        <Home size={16} />
      </Link>
      
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight size={14} className="mx-2 text-primary-300 shrink-0" />
          {item.link ? (
            <Link to={item.link} className="text-primary-500 hover:text-accent transition-colors font-medium">
              {item.label}
            </Link>
          ) : (
            <span className="text-primary-700 font-semibold">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
