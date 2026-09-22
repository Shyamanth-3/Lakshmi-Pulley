import React, { useEffect, useRef, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { site } from '../data/site';

const navLinks = site.nav.main;

// Original Navbar visual/interaction (fixed, transparent-over-hero on home, solid+shadow on scroll)
// restored from git history (commit d1e8746), rebuilt on the current data layer and routes. The mobile
// panel uses a native <dialog> instead of the old plain conditional <div> for a real focus trap and
// Escape-to-close — everything else (positioning, colors, shadow, scroll behavior) matches the original.
export default function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dialogRef = useRef(null);
  const location = useLocation();
  const isHome = location.pathname === '/';
  const close = () => setIsOpen(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  const isTransparent = isHome && !isScrolled;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isTransparent ? 'bg-transparent py-2' : 'bg-white border-b border-primary-100 shadow-sm py-0'
    }`}>
      <div className="container">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/Assets/logo3.png"
              alt="Lakshmi Pulley – Lakshmi Engineering Enterprises Logo"
              width="406"
              height="67"
              className="h-14 w-auto object-contain transition-all duration-300"
            />
          </Link>

          <nav aria-label="Primary" className="hidden md:flex flex-1 items-center justify-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive
                      ? (isTransparent ? 'text-white border-b-2 border-white pb-1' : 'text-accent border-b-2 border-accent pb-1')
                      : (isTransparent ? 'text-white/90 hover:text-white' : 'text-primary-600 hover:text-accent')
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link
              to="/enquiry"
              className={`hidden md:inline-flex btn text-sm shadow-md hover:shadow-lg ${
                isTransparent ? 'bg-white/10 text-white hover:bg-white/20 border border-white/20 hover:border-white/40' : 'btn-primary'
              }`}
            >
              Get a Quote
            </Link>

            <button
              type="button"
              className={`md:hidden p-2 transition-colors ${isTransparent ? 'text-white hover:text-gray-200' : 'text-primary-600 hover:text-primary-700'}`}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              onClick={() => setIsOpen((open) => !open)}
            >
              <span className="sr-only">{isOpen ? 'Close menu' : 'Open menu'}</span>
              {isOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      <dialog
        id="mobile-menu"
        ref={dialogRef}
        onClose={close}
        onClick={(e) => { if (e.target === dialogRef.current) close(); }}
        className="m-0 mt-20 ml-0 w-full max-w-none h-auto max-h-none p-0 border-0 bg-white border-b border-primary-100 shadow-lg backdrop:bg-transparent"
      >
        <nav aria-label="Mobile" className="flex flex-col py-4 px-4 gap-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/'}
              onClick={close}
              className={({ isActive }) =>
                `px-4 py-3 rounded-md text-sm font-medium transition-colors flex justify-between items-center min-h-11 ${
                  isActive ? 'bg-primary-50 text-accent' : 'text-primary-600 hover:bg-primary-50'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          <div className="mt-4 px-4 pb-2">
            <Link to="/enquiry" onClick={close} className="w-full btn btn-primary flex justify-center py-3">
              Get a Quote
            </Link>
          </div>
        </nav>
      </dialog>
    </header>
  );
}
