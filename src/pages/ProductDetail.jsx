import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import FeatureList from '../components/FeatureList';
import CTASection from '../components/CTASection';
import NotFound from './NotFound';
import { getProduct } from '../data/products';
import { getDocument } from '../data/documents';
import { getRangeRows, formatVariantRange, columnHeader, formatCell } from '../data/format';
import { Download, FileText, ChevronRight } from 'lucide-react';

export default function ProductDetail() {
  const { slug } = useParams();
  const [activeModal, setActiveModal] = useState(null);
  
  // Scroll to top when loading a new product
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const product = getProduct(slug);

  if (!product) {
    return <NotFound />;
  }

  const image = product.images[0];
  const documents = product.documentIds.map(getDocument);
  const rangeRows = getRangeRows(product.specifications.range);
  const tables = product.specifications.tables ?? [];
  // Page-level "Product Specifications" tables; draft (unconfirmed) tables are not displayed yet.
  const pageTables = tables.filter((t) => !t.variantId && t.status === 'published');
  const modalTable = activeModal && tables.find((t) => t.id === activeModal.tableId);

  return (
    <div className="bg-surface pb-0 pt-8">
      <div className="container mx-auto px-4 mb-8">
        <Breadcrumb items={[
          { label: 'Products', link: '/products' },
          { label: product.name }
        ]} />
      </div>

      <section className="container mx-auto px-4 mb-20">
        <div className="flex flex-col lg:flex-row gap-12 xl:gap-20">
          
          {/* Left Column - Image & Actions */}
          <div className="lg:w-2/5">
            <div className="bg-white rounded-2xl p-8 border border-primary-100 shadow-sm mb-6 sticky top-28">
              <div className="aspect-[4/3] relative flex items-center justify-center bg-primary-50 rounded-xl overflow-hidden mb-8 p-4">
                <img 
                  src={`${image.src}-${image.defaultWidth}.webp`}
                  srcSet={image.widths.map((w) => `${image.src}-${w}.webp ${w}w`).join(', ')}
                  sizes="(min-width: 1024px) 350px, calc(100vw - 128px)"
                  alt={image.alt}
                  decoding="async"
                  className="w-full h-full object-contain mix-blend-multiply"
                />
              </div>
              
              <div className="flex flex-col gap-3">
                {documents.length === 1 && (
                  <a 
                    href={documents[0].path} 
                    target="_blank" 
                    rel="noreferrer"
                    className="btn btn-outline w-full flex items-center justify-center gap-2 group"
                  >
                    <FileText size={18} className="group-hover:-translate-y-0.5 transition-transform" />
                    Download Catalog PDF
                  </a>
                )}
                {documents.length > 1 && (
                  <div className="flex flex-col gap-2 mt-2">
                    {documents.map((doc) => (
                      <a 
                        key={doc.id}
                        href={doc.path} 
                        target="_blank" 
                        rel="noreferrer"
                        className="btn btn-outline w-full flex items-center justify-center gap-2 group text-sm"
                      >
                        <FileText size={16} className="group-hover:-translate-y-0.5 transition-transform text-accent" />
                        Download {doc.title}
                      </a>
                    ))}
                  </div>
                )}
                
                <Link to="/enquiry" className="btn btn-primary w-full flex items-center justify-center gap-2 shadow-md">
                  Request Quote for this Product
                </Link>
              </div>
            </div>
          </div>
          
          {/* Right Column - Details */}
          <div className="lg:w-3/5">
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-primary-50 text-accent font-bold text-xs uppercase tracking-wider rounded-md border border-primary-100 mb-4">
                {product.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold font-heading text-primary-700 mb-6">{product.name}</h1>
              <p className="text-xl text-primary-600 leading-relaxed mb-10 border-l-4 border-accent pl-4">
                {product.summary}
              </p>
            </div>
            
            {/* Features */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold font-heading text-primary-700 mb-6 flex items-center gap-2">
                Salient Features
              </h2>
              <FeatureList features={product.features} />
            </div>
            
            {/* Technical Specifications (if present directly) */}
            {rangeRows.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold font-heading text-primary-700 mb-6">Technical Range</h2>
                <div className="bg-white border text-primary-700 border-primary-100 rounded-xl overflow-hidden shadow-sm">
                  <div className="divide-y divide-primary-100">
                    {rangeRows.map(({ key, label, text }) => (
                      <div key={key} className="flex flex-col sm:flex-row p-4 hover:bg-primary-50 transition-colors">
                        <div className="sm:w-1/3 font-semibold text-primary-600 capitalize">{label}</div>
                        <div className="sm:w-2/3">{text}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {/* Variants table for Jaw Couplings */}
            {product.variants && product.variants.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold font-heading text-primary-700 mb-6">Types & Variants</h2>
                
                <div className="grid grid-cols-1 gap-6">
                  {product.variants.map((variant, idx) => (
                    <div key={idx} className="bg-white border border-primary-100 rounded-xl p-6 shadow-sm flex flex-col md:flex-row gap-6 items-center">
                      {variant.image && (
                        <div className="w-full md:w-32 h-32 shrink-0 bg-primary-50 rounded-lg p-2 flex items-center justify-center">
                          <img src={variant.image} alt={variant.name} className="max-w-full max-h-full object-contain mix-blend-multiply" />
                        </div>
                      )}
                      <div className="flex-grow">
                        <h3 className="text-xl font-bold font-heading text-primary-700 mb-3">{variant.name}</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 text-sm text-primary-600">
                          <div><strong className="text-primary-700">Available Sizes:</strong> {variant.publishedSizeCount}</div>
                          <div><strong className="text-primary-700">Torque:</strong> {formatVariantRange(variant.range).torque}</div>
                          <div><strong className="text-primary-700">Power:</strong> {formatVariantRange(variant.range).power}</div>
                          <div><strong className="text-primary-700">Bore Dia:</strong> {formatVariantRange(variant.range).bore}</div>
                        </div>
                        {variant.tableId && (
                           <button 
                             onClick={() => setActiveModal(variant)}
                             className="mt-4 px-4 py-2 bg-primary-50 text-primary-700 text-sm font-semibold rounded-md border border-primary-200 hover:bg-primary-100 hover:text-accent transition-colors flex items-center gap-2"
                           >
                             <FileText size={16} /> View Specifications
                           </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Extra Info */}
            {product.additionalInfo && (
              <div className="bg-primary-50 border border-primary-100 rounded-xl p-6 text-primary-700">
                <p><strong>Additional Information:</strong> {product.additionalInfo}</p>
              </div>
            )}

            {/* Requirements Table */}
            {pageTables.map((table) => (
              <div key={table.id} className="mb-12 mt-12 bg-white rounded-xl shadow-sm border border-primary-100 overflow-hidden">
                <div className="p-6 border-b border-primary-100 bg-primary-50">
                  <h3 className="text-xl font-bold font-heading text-primary-700">Product Specifications</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-white border-b border-primary-100">
                        {table.columns.map((column) => (
                          <th key={column.key} className="p-4 font-semibold text-primary-700 whitespace-nowrap text-sm uppercase tracking-wide">
                            {columnHeader(column)}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-primary-50">
                      {table.rows.map((row, rowIdx) => (
                        <tr key={rowIdx} className="hover:bg-primary-50/50 transition-colors">
                          {table.columns.map((column) => (
                            <td key={column.key} className="p-4 text-primary-600 font-medium whitespace-pre-wrap">
                              {formatCell(column, row)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection title="Not sure which product you need?" subtitle="Our experts are ready to assist you in selecting the right drive for your application." primaryButtonText="Get Expert Help"/>

      {/* Modal */}
      {activeModal && modalTable && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center p-6 border-b border-primary-100 bg-surface">
              <h3 className="text-2xl font-bold font-heading text-primary-700">{activeModal.name} Specifications</h3>
              <button onClick={() => setActiveModal(null)} className="text-primary-400 hover:text-accent bg-primary-50 hover:bg-primary-100 rounded-full p-2 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            <div className="p-0 overflow-y-auto whitespace-nowrap">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-primary-600 border-b border-primary-700">
                    {modalTable.columns.map((c) => (
                      <th key={c.key} className="p-4 font-semibold text-white uppercase tracking-wider text-xs border-r border-primary-500 last:border-0">{columnHeader(c)}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-primary-100">
                  {modalTable.rows.map((r, ri) => (
                    <tr key={ri} className="hover:bg-primary-50 transition-colors">
                      {modalTable.columns.map((c) => (
                        <td key={c.key} className="p-4 text-primary-700 font-medium border-r border-primary-100 last:border-0">{formatCell(c, r)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 border-t border-primary-100 bg-surface text-right">
               <button onClick={() => setActiveModal(null)} className="btn btn-primary text-sm py-2 px-6 shadow-sm">Done</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
