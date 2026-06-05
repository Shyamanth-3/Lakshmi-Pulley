import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-lg border border-primary-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col h-full hover:-translate-y-1">
      {/* Product Image Component */}
      <div className="aspect-[4/3] bg-primary-50 relative overflow-hidden flex items-center justify-center p-4">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur tracking-wider uppercase text-[10px] font-bold px-3 py-1 rounded-full text-primary-600 border border-primary-200">
          {product.category}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6 flex flex-col flex-grow border-t border-primary-50">
        <h3 className="text-xl font-bold font-heading mb-3 group-hover:text-accent transition-colors">{product.name}</h3>
        <p className="text-primary-600 text-sm leading-relaxed mb-6 flex-grow">
          {product.shortDescription}
        </p>
        
        <Link 
          to={`/products/${product.slug}`} 
          className="mt-auto inline-flex items-center text-sm font-semibold text-primary-600 group-hover:text-accent transition-colors"
        >
          View Technical Details
          <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
