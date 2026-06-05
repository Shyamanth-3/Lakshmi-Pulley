import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Outlet, useLocation } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';

export default function Layout() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className={`flex-grow bg-surface ${isHome ? '' : 'pt-20'}`}>
        <Outlet />
      </main>
      <Footer />
      <Analytics />
    </div>
  );
}
