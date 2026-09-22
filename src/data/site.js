// Canonical site-level data: company identity, contact details, navigation, and the product lists that
// the footer and the enquiry form derive from ./products.js. Only facts already published on the site.

import { categories, products } from './products.js';

export const site = {
  name: 'Lakshmi Engineering Enterprises',
  contact: {
    address: {
      line1: '5-5-35/87, Prashanthinagar',
      line2: 'Kukatpally, Hyderabad - 500072',
      country: 'India',
    },
    phones: ['+91 89787 81631', '+91 89787 81632', '+91 94400 51818', '+91 98480 34956'],
    emails: ['lakshmi_pulley@yahoo.com', 'sales@lakshmipulley.com'],
    // WhatsApp number and business hours are not confirmed yet, so they are intentionally absent.
  },
  nav: {
    main: [
      { name: 'Home', path: '/' },
      { name: 'About Us', path: '/about' },
      { name: 'Products', path: '/products' },
      { name: 'Enquiry', path: '/enquiry' },
      { name: 'Contact', path: '/contact' },
    ],
    footerQuickLinks: [
      { name: 'Home', path: '/' },
      { name: 'About Us', path: '/about' },
      { name: 'Products', path: '/products' },
      { name: 'Downloads', path: '/downloads' },
      { name: 'Custom Manufacturing', path: '/custom-manufacturing' },
      { name: 'Enquiry', path: '/enquiry' },
      { name: 'Contact Us', path: '/contact' },
    ],
  },
  // Conflicting or unconfirmed company information. Nothing below is resolved here; the published
  // value is used and the alternatives are recorded for the owner.
  dataSource: {
    conflicts: [
      {
        field: 'contact.address',
        used: '5-5-35/87, Prashanthinagar, Kukatpally, Hyderabad - 500072 (the address currently published)',
        alternative: '5-36/1/22, Prashanthinagar, Kukatpally, Hyderabad - 500072 (README and the old lakshmipulleys.in pages)',
      },
      {
        field: 'contact.phones',
        used: 'The four numbers currently published',
        alternative: 'The old site also listed landlines +91-40-23079522 and +91-40-23073694, and did not list +91 89787 81631 / 81632. Landlines not added because they are unconfirmed.',
      },
      {
        field: 'company.established and experience claims',
        used: 'established "1986" (company.js)',
        alternative: 'Page copy also says "40+ years" (Home), "last 20 years" (Products) and "over three decades" (company description). Not resolved.',
      },
      {
        field: 'company.stats.certifications',
        used: '"ISO 9001:2000" (company.js and the footer badge)',
        alternative: 'Home shows "ISO 9001". The 2000 edition is obsolete and no certificate is on file. Not resolved.',
      },
      {
        field: 'company.domain',
        used: 'lakshmipulleys.in (company.js, unused by the UI)',
        alternative: 'The live site is www.lakshmipulley.com; lakshmipulleys.in is the old domain.',
      },
    ],
  },
};

// Which numbers each page shows (the current UI shows a subset of the four).
export const footerPhones = [site.contact.phones[0], site.contact.phones[2]];
export const enquiryPhones = site.contact.phones.slice(0, 2);

// Every product, in catalogue order (footer list).
export const productLinks = products.map((p) => ({ name: p.name, path: `/products/${p.slug}` }));

// Enquiry form options: grouped by category (couplings first), catalogue order within a category.
// The submitted value is the product name, which is what api/enquiry.js receives as productCategory.
export const enquiryProductOptions = [...categories]
  .sort((a, b) => a.order - b.order)
  .flatMap((c) => products.filter((p) => p.category === c.id).map((p) => p.name));
