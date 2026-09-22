// Server entry used only at build time by scripts/prerender.mjs (vite build --ssr).
// Not loaded by the browser, so the Vite-HMR-only react-refresh rule doesn't apply here.
/* eslint-disable react-refresh/only-export-components */
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from './App.jsx';

export { getSeo, renderHead, publicRoutes, sitemapRoutes, SITE_ORIGIN } from './seo.js';

export function render(url) {
  return renderToString(
    <React.StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </React.StrictMode>,
  );
}
