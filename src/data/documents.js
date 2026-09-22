// Canonical document records (catalogue PDFs). Products reference them by id via documentIds.
// path = current public URL; legacyHrefs = the old /Assets URLs, which vercel.json redirects (301) to path.
// bytes = exact file size. Files are byte-identical copies of the originals (verified by SHA-256).
// Revision dates and page counts are not recorded because they are not known.

export const documents = [
  {
    id: "flexible-jaw-couplings-catalogue",
    title: "Flexible jaw couplings catalogue",
    productSlugs: ["flexible-jaw-couplings"],
    type: "catalogue",
    format: "pdf",
    path: "/downloads/lakshmi-flexible-jaw-couplings-catalogue.pdf",
    bytes: 374842,
    legacyHrefs: ["/Assets/Flexible jaw couplings.pdf"]
  },
  {
    id: "flexible-pin-bush-couplings-catalogue",
    title: "Pin bush coupling catalogue",
    productSlugs: ["flexible-pin-bush-couplings"],
    type: "catalogue",
    format: "pdf",
    path: "/downloads/lakshmi-flexible-pin-bush-couplings-catalogue.pdf",
    bytes: 183285,
    legacyHrefs: ["/Assets/PIN_BUSH_COUPLING_CATALOGUE.pdf"]
  },
  {
    id: "flexible-tyre-couplings-catalogue",
    title: "Flexible tyre couplings catalogue",
    productSlugs: ["flexible-tyre-couplings"],
    type: "catalogue",
    format: "pdf",
    path: "/downloads/lakshmi-flexible-tyre-couplings-catalogue.pdf",
    bytes: 746852,
    legacyHrefs: ["/Assets/Flexible tyre couplings.pdf"]
  },
  {
    id: "gear-couplings-catalogue",
    title: "Gear couplings catalogue",
    productSlugs: ["gear-couplings"],
    type: "catalogue",
    format: "pdf",
    path: "/downloads/lakshmi-gear-couplings-catalogue.pdf",
    bytes: 361136,
    legacyHrefs: ["/Assets/GEAR_COUPLINGS_CATALOGUE.pdf"]
  },
  {
    id: "resilient-grid-couplings-catalogue",
    title: "Resilient grid coupling catalogue",
    productSlugs: ["resilient-grid-couplings"],
    type: "catalogue",
    format: "pdf",
    path: "/downloads/lakshmi-resilient-grid-couplings-catalogue.pdf",
    bytes: 2235623,
    legacyHrefs: ["/Assets/RESILIENT_GRID_COUPLING.pdf"]
  },
  {
    id: "v-pulleys-spa-catalogue",
    title: "A-SPA belt pulleys",
    productSlugs: ["v-pulleys"],
    type: "catalogue",
    format: "pdf",
    path: "/downloads/lakshmi-v-pulleys-spa-catalogue.pdf",
    bytes: 1741426,
    legacyHrefs: ["/Assets/Pulleys/PULLEYA.pdf"]
  },
  {
    id: "v-pulleys-spb-catalogue",
    title: "B-SPB belt pulleys",
    productSlugs: ["v-pulleys"],
    type: "catalogue",
    format: "pdf",
    path: "/downloads/lakshmi-v-pulleys-spb-catalogue.pdf",
    bytes: 1677907,
    legacyHrefs: ["/Assets/Pulleys/PULLEYB.pdf"]
  },
  {
    id: "v-pulleys-spc-catalogue",
    title: "C-SPC belt pulleys",
    productSlugs: ["v-pulleys"],
    type: "catalogue",
    format: "pdf",
    path: "/downloads/lakshmi-v-pulleys-spc-catalogue.pdf",
    bytes: 1300620,
    legacyHrefs: ["/Assets/Pulleys/PULLEYC.pdf"]
  },
  {
    id: "v-pulleys-spz-catalogue",
    title: "Z-SPZ belt pulleys",
    productSlugs: ["v-pulleys"],
    type: "catalogue",
    format: "pdf",
    path: "/downloads/lakshmi-v-pulleys-spz-catalogue.pdf",
    bytes: 233364,
    legacyHrefs: ["/Assets/z1.pdf"]
  },
  {
    id: "easyfit-bush-catalogue",
    title: "Easy Fit Bush Bore & Key Way",
    productSlugs: ["v-pulleys"],
    type: "catalogue",
    format: "pdf",
    path: "/downloads/lakshmi-easyfit-bush-bore-keyway-catalogue.pdf",
    bytes: 1227478,
    legacyHrefs: ["/Assets/Pulleys/EASY FIT BUSH BORE AND KEY WAY-CATALOGUE..pdf"]
  }
];

export const getDocument = (id) => documents.find((d) => d.id === id);
