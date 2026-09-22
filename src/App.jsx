import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Enquiry from './pages/Enquiry';
import ThankYou from './pages/ThankYou';
import Contact from './pages/Contact';
import Downloads from './pages/Downloads';
import CustomManufacturing from './pages/CustomManufacturing';
import Privacy from './pages/Privacy';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:slug" element={<ProductDetail />} />
        <Route path="enquiry" element={<Enquiry />} />
        <Route path="enquiry/thank-you" element={<ThankYou />} />
        <Route path="contact" element={<Contact />} />
        <Route path="downloads" element={<Downloads />} />
        <Route path="custom-manufacturing" element={<CustomManufacturing />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
