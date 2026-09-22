import React, { useEffect, useRef, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { site } from '../data/site';

const navLinks = site.nav.main;

// Restrained, sticky engineering-catalogue header. No transparency/overlay, no blur, no shadow —
// the header sits in normal document flow, so no page needs manual top-padding to clear it.
export default function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef(null);
  const close = () => setIsOpen(false);

  // <dialog>.showModal() gives the mobile menu a native, accessible modal for free: focus moves
  // into it and is trapped, Escape closes it, and focus returns to the toggle button on close.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors ${isActive ? 'text-accent' : 'text-primary-600 hover:text-accent'}`;

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-primary-100">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center shrink-0">
            <img
              src="/Assets/logo3.png"
              alt="Lakshmi Pulley – Lakshmi Engineering Enterprises"
              width="242"
              height="40"
              className="h-10 w-auto object-contain"
            />
          </Link>

          <nav aria-label="Primary" className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink key={link.path} to={link.path} end={link.path === '/'} className={linkClass}>
                {link.name}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link to="/enquiry" className="hidden md:inline-flex btn btn-primary text-sm">
              Get a Quote
            </Link>

            <button
              type="button"
              className="md:hidden p-2 -mr-2 text-primary-600"
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
        onClick={(e) => {
          if (e.target === dialogRef.current) close(); // click on the backdrop
        }}
        className="m-0 mt-16 ml-auto h-[calc(100vh-4rem)] max-h-none w-full max-w-none sm:w-80 sm:max-w-[80vw] p-0 border-0 bg-white backdrop:bg-black/40"
      >
        <nav aria-label="Mobile" className="flex flex-col p-4 gap-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/'}
              onClick={close}
              className={({ isActive }) =>
                `min-h-11 flex items-center px-4 rounded-md text-sm font-medium transition-colors ${
                  isActive ? 'bg-primary-50 text-accent' : 'text-primary-600 hover:bg-primary-50'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          <Link to="/enquiry" onClick={close} className="btn btn-primary justify-center mt-4">
            Get a Quote
          </Link>
        </nav>
      </dialog>
    </header>
  );
}
