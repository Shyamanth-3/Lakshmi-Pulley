import React from 'react';

export default function SectionHeading({ title, subtitle, className = "" }) {
  return (
    <div className={`mb-12 ${className}`}>
      <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading text-primary-700 relative inline-block">
        {title}
        <span className="block h-1.5 w-1/3 bg-accent rounded-full mt-3"></span>
      </h2>
      {subtitle && (
        <p className="text-lg text-primary-600 max-w-3xl mt-4">
          {subtitle}
        </p>
      )}
    </div>
  );
}
