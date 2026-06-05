import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, ChevronRight } from 'lucide-react';
import { companyData } from '../data/company';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Products', path: '/products' },
    { name: 'Enquiry', path: '/enquiry' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="bg-white sticky top-0 z-50 border-b border-primary-100 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img 
              src="/Assets/logo3.gif" 
              alt="Lakshmi Pulleys Logo" 
              className="h-14 w-auto object-contain"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex flex-1 items-center justify-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) => 
                  `text-sm font-medium transition-colors hover:text-accent ${
                    isActive ? 'text-accent border-b-2 border-accent pb-1' : 'text-primary-600'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* CTA Button & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <Link 
              to="/enquiry" 
              className="hidden md:inline-flex btn btn-primary text-sm shadow-md hover:shadow-lg"
            >
              Get a Quote
            </Link>
            
            <button 
              className="md:hidden text-primary-600 hover:text-primary-700 p-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-primary-100 shadow-lg absolute w-full top-20 left-0">
          <div className="flex flex-col py-4 px-4 gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => 
                  `px-4 py-3 rounded-md text-sm font-medium transition-colors flex justify-between items-center ${
                    isActive ? 'bg-primary-50 text-accent' : 'text-primary-600 hover:bg-primary-50'
                  }`
                }
              >
                {link.name}
                <ChevronRight size={16} />
              </NavLink>
            ))}
            <div className="mt-4 px-4 pb-2">
              <Link 
                to="/enquiry" 
                onClick={() => setIsOpen(false)}
                className="w-full btn btn-primary flex justify-center py-3"
              >
                Get a Quote
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
