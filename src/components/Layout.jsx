import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-surface">
        <Outlet />
      </main>
      <Footer />
      <Analytics />
    </div>
  );
}
