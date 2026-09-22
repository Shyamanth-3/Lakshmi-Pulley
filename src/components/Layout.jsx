import React, { useEffect } from 'react';
import SiteHeader from './SiteHeader';
import Footer from './Footer';
import { Outlet, useLocation } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { applySeo, getSeo } from '../seo';

export default function Layout() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    applySeo(getSeo(location.pathname));
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      {/* SiteHeader is fixed (original behavior), so every page except Home (whose hero has its own
          top padding to sit under the transparent header) needs this offset. */}
      <main className={`flex-grow bg-surface ${isHome ? '' : 'pt-20'}`}>
        <Outlet />
      </main>
      <Footer />
      <Analytics />
    </div>
  );
}
