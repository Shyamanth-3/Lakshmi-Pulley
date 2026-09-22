// Canonical product data: the single source of truth for every product fact on the site.
// Components, the footer, the enquiry form and (later) SEO/sitemap derive from this file; nothing else
// may re-declare a product name, path or figure.
//
// Conventions
// - Numbers are numbers and units are separate fields ("unit"); ./format.js turns them into display text.
// - A field with no published value is omitted. Nothing here is guessed or inferred.
// - dataSource records where a product's data came from, whether the owner has confirmed it
//   (ownerVerified) and any known conflicts. Conflicting published values are kept as published.
// - specifications.tables[].status: "published" = shown on the live site today; "draft" = restored from
//   the old site (docs/source-content/old-site-scrape), not yet confirmed by the owner, so not displayed.
// - variants[].publishedSizeCount is the count as published, which can differ from the table row count
//   (see dataSource.conflicts).
// - additionalInfo is the site's published free-text note, kept verbatim for the current product page;
//   customOptions[] holds the same and further documented options in structured form.
// - documentIds refer to ./documents.js. Slugs are the public URLs and must not change.

export const categories = [{ id: "couplings", name: "Couplings", order: 1 }, { id: "pulleys", name: "Pulleys", order: 2 }];

export const products = [
  // 1. Flexible Jaw Couplings
  {
    slug: "flexible-jaw-couplings",
    name: "Flexible Jaw Couplings",
    category: "couplings",
    summary: "Simple construction, quick installation with no special tools required. Absorbs shock loads and dampens vibration.",
    features: [
      "Simple construction - quick, easy installation - no special tools required.",
      "Flexible insert caters to incidental angular, parallel and axial misalignment.",
      "Absorbs shock loads and dampens small amplitude vibration.",
      "Insert design presets correct distance between hubs, using raised pads on each leg of the insert.",
      "Available in a range of stock bore sizes or with Finished Bore & Keyway.",
      "Unaffected by moisture, grease and oils - including non-aromatic and non-ketone solvents, and temperatures from -40°C to +100°C.",
      "Spacer coupling with spacers to suit different distances between shaft ends (DBSE)."
    ],
    specifications: {
      tables: [
        {
          id: "standard",
          variantId: "standard",
          caption: "Standard Coupling",
          status: "published",
          source: { origin: "current-site" },
          columns: [
            { key: "size", label: "Size", kind: "code" },
            { key: "powerPer100rpm", label: "Power", unit: "kW", suffix: "per 100 rpm", kind: "number", decimals: 2 },
            { key: "boreMin", label: "Bore Min", unit: "mm", kind: "number" },
            { key: "boreMax", label: "Bore Max", unit: "mm", kind: "number" }
          ],
          rows: [
            { size: "J-095", powerPer100rpm: 0.21, boreMin: 15, boreMax: 28 },
            { size: "J-099", powerPer100rpm: 0.39, boreMin: 20, boreMax: 30 },
            { size: "J-100", powerPer100rpm: 0.5, boreMin: 20, boreMax: 38 },
            { size: "J-110", powerPer100rpm: 0.92, boreMin: 20, boreMax: 42 },
            { size: "J-150", powerPer100rpm: 1.5, boreMin: 30, boreMax: 48 },
            { size: "J-190", powerPer100rpm: 2.02, boreMin: 36, boreMax: 55 },
            { size: "J-225", powerPer100rpm: 2.75, boreMin: 40, boreMax: 60 }
          ]
        },
        {
          id: "external-spider",
          variantId: "external-spider",
          caption: "External Spider Coupling",
          status: "published",
          source: { origin: "current-site" },
          columns: [
            { key: "size", label: "Size", kind: "code" },
            { key: "powerPer100rpm", label: "Power", unit: "kW", suffix: "per 100 rpm", kind: "number", decimals: 2 },
            { key: "boreMin", label: "Bore Min", unit: "mm", kind: "number" },
            { key: "boreMax", label: "Bore Max", unit: "mm", kind: "number" }
          ],
          rows: [
            { size: "J-095 ESW", powerPer100rpm: 0.23, boreMin: 15, boreMax: 23 },
            { size: "J-099 ESW", powerPer100rpm: 0.38, boreMin: 20, boreMax: 30 },
            { size: "J-0100 ESW", powerPer100rpm: 0.5, boreMin: 20, boreMax: 38 },
            { size: "J-0110 ESW", powerPer100rpm: 0.91, boreMin: 20, boreMax: 42 },
            { size: "J-0150 ESW", powerPer100rpm: 1.47, boreMin: 30, boreMax: 48 },
            { size: "J-0190 ESW", powerPer100rpm: 2.03, boreMin: 36, boreMax: 55 },
            { size: "J-0225 ESW", powerPer100rpm: 2.8, boreMin: 40, boreMax: 60 }
          ]
        },
        {
          id: "cushion",
          variantId: "cushion",
          caption: "Cushion Coupling",
          status: "published",
          source: { origin: "current-site" },
          columns: [
            { key: "size", label: "Size", kind: "code" },
            { key: "powerPer100rpm", label: "Power", unit: "kW", suffix: "per 100 rpm", kind: "number", decimals: 2 },
            { key: "boreMin", label: "Bore Min", unit: "mm", kind: "number" },
            { key: "boreMax", label: "Bore Max", unit: "mm", kind: "number" }
          ],
          rows: [
            { size: "J-0226 C", powerPer100rpm: 3.45, boreMin: 25, boreMax: 65 },
            { size: "J-0276 C", powerPer100rpm: 5.6, boreMin: 25, boreMax: 75 },
            { size: "J-0280 C", powerPer100rpm: 8.2, boreMin: 30, boreMax: 75 },
            { size: "J-0295 C", powerPer100rpm: 13.4, boreMin: 40, boreMax: 90 },
            { size: "J-02955 C", powerPer100rpm: 22.4, boreMin: 50, boreMax: 100 }
          ]
        },
        {
          id: "standard-spacer",
          variantId: "standard-spacer",
          caption: "Standard Spacer Coupling",
          status: "published",
          source: { origin: "current-site" },
          columns: [
            { key: "size", label: "Size", kind: "code" },
            { key: "powerPer100rpm", label: "Power", unit: "kW", suffix: "per 100 rpm", kind: "number", decimals: 2 },
            { key: "boreMin", label: "Bore Min", unit: "mm", kind: "number" },
            { key: "boreMax", label: "Bore Max", unit: "mm", kind: "number" },
            { key: "spacerLength", label: "Spacer Length", unit: "mm", kind: "list", separator: " / " }
          ],
          rows: [
            { size: "JRL-095", powerPer100rpm: 0.21, boreMin: 15, boreMax: 28, spacerLength: [90, 100] },
            { size: "JRL-100", powerPer100rpm: 0.5, boreMin: 20, boreMax: 38, spacerLength: [90, 100, 140] },
            { size: "JRL-110", powerPer100rpm: 0.92, boreMin: 20, boreMax: 42, spacerLength: [90, 100, 140] },
            { size: "JRL-150", powerPer100rpm: 1.5, boreMin: 30, boreMax: 48, spacerLength: [90, 100, 140] },
            { size: "JRL-190", powerPer100rpm: 2.02, boreMin: 36, boreMax: 55, spacerLength: [90, 100, 140] },
            { size: "JRL-225", powerPer100rpm: 2.75, boreMin: 40, boreMax: 60, spacerLength: [90, 100, 140] }
          ]
        },
        {
          id: "external-spider-aluminium-spacer",
          variantId: "external-spider-aluminium-spacer",
          caption: "External Spider Aluminium Spacer Coupling",
          status: "published",
          source: { origin: "current-site" },
          columns: [
            { key: "size", label: "Size", kind: "code" },
            { key: "powerPer100rpm", label: "Power", unit: "kW", suffix: "per 100 rpm", kind: "number", decimals: 2 },
            { key: "boreMin", label: "Bore Min", unit: "mm", kind: "number" },
            { key: "boreMax", label: "Bore Max", unit: "mm", kind: "number" },
            { key: "spacerLength", label: "Spacer Length", unit: "mm", kind: "list", separator: " / " }
          ],
          rows: [
            { size: "J-095 SWS", powerPer100rpm: 0.23, boreMin: 15, boreMax: 28, spacerLength: [90, 100] },
            { size: "J-0100 SWS", powerPer100rpm: 0.5, boreMin: 20, boreMax: 38, spacerLength: [90, 100, 140] },
            { size: "J-0110 SWS", powerPer100rpm: 0.91, boreMin: 20, boreMax: 42, spacerLength: [90, 100, 140] },
            { size: "J-0150 SWS", powerPer100rpm: 1.47, boreMin: 30, boreMax: 48, spacerLength: [90, 100, 140] },
            { size: "J-0190 SWS", powerPer100rpm: 2.03, boreMin: 36, boreMax: 55, spacerLength: [90, 100, 140] },
            { size: "J-0225 SWS", powerPer100rpm: 2.8, boreMin: 40, boreMax: 60, spacerLength: [90, 100, 140] }
          ]
        },
        {
          id: "cushion-spacer",
          variantId: "cushion-spacer",
          caption: "Cushion Spacer Coupling",
          status: "published",
          source: { origin: "current-site" },
          columns: [
            { key: "size", label: "Size", kind: "code" },
            { key: "powerPer100rpm", label: "Power", unit: "kW", suffix: "per 100 rpm", kind: "number", decimals: 2 },
            { key: "boreMin", label: "Bore Min", unit: "mm", kind: "number" },
            { key: "boreMax", label: "Bore Max", unit: "mm", kind: "number" },
            { key: "spacerLength", label: "Spacer Length", unit: "mm", kind: "list", separator: " / " }
          ],
          rows: [
            { size: "J-0226 CS", powerPer100rpm: 3.45, boreMin: 25, boreMax: 65, spacerLength: [135, 140, 180] },
            { size: "J-0276 CS", powerPer100rpm: 5.6, boreMin: 25, boreMax: 75, spacerLength: [135, 140, 180] },
            { size: "J-0280 CS", powerPer100rpm: 8.2, boreMin: 30, boreMax: 75, spacerLength: [135, 140, 180] },
            { size: "J-0295 CS", powerPer100rpm: 13.4, boreMin: 40, boreMax: 90, spacerLength: [135, 140, 180] },
            { size: "J-02955 CS", powerPer100rpm: 22.4, boreMin: 50, boreMax: 100, spacerLength: [135, 140, 180] }
          ]
        }
      ]
    },
    variants: [
      {
        id: "standard",
        name: "Standard Coupling",
        image: "/Assets/jaw1.jpeg",
        publishedSizeCount: 7,
        range: {
          torque: { min: 20, max: 262, unit: "Nm" },
          powerPer100rpm: { min: 0.21, max: 2.75, unit: "kW", decimals: 2 },
          bore: { min: 15, max: 60, unit: "mm" }
        },
        tableId: "standard"
      },
      {
        id: "external-spider",
        name: "External Spider Coupling",
        image: "/Assets/jaw2.jpeg",
        publishedSizeCount: 6,
        range: {
          torque: { min: 22, max: 267, unit: "Nm" },
          powerPer100rpm: { min: 0.23, max: 2.8, unit: "kW", decimals: 2 },
          bore: { min: 15, max: 60, unit: "mm" }
        },
        tableId: "external-spider"
      },
      {
        id: "cushion",
        name: "Cushion Coupling",
        image: "/Assets/jaw3.jpeg",
        publishedSizeCount: 5,
        range: {
          torque: { min: 330, max: 2139, unit: "Nm" },
          powerPer100rpm: { min: 3.45, max: 22.4, unit: "kW", decimals: 2 },
          bore: { min: 25, max: 90, unit: "mm" }
        },
        tableId: "cushion"
      },
      {
        id: "standard-spacer",
        name: "Standard Spacer Coupling",
        image: "/Assets/jaw4.jpeg",
        publishedSizeCount: 7,
        range: {
          torque: { min: 20, max: 262, unit: "Nm" },
          powerPer100rpm: { min: 0.21, max: 2.75, unit: "kW", decimals: 2 },
          bore: { min: 15, max: 60, unit: "mm" }
        },
        tableId: "standard-spacer"
      },
      {
        id: "external-spider-aluminium-spacer",
        name: "External Spider Aluminium Spacer Coupling",
        image: "/Assets/jaw5.jpeg",
        publishedSizeCount: 6,
        range: {
          torque: { min: 22, max: 267, unit: "Nm" },
          powerPer100rpm: { min: 0.23, max: 2.8, unit: "kW", decimals: 2 },
          bore: { min: 15, max: 60, unit: "mm" }
        },
        tableId: "external-spider-aluminium-spacer"
      },
      {
        id: "cushion-spacer",
        name: "Cushion Spacer Coupling",
        image: "/Assets/jaw6.jpeg",
        publishedSizeCount: 5,
        range: {
          torque: { min: 330, max: 2139, unit: "Nm" },
          powerPer100rpm: { min: 3.45, max: 22.4, unit: "kW", decimals: 2 },
          bore: { min: 25, max: 90, unit: "mm" }
        },
        tableId: "cushion-spacer"
      }
    ],
    customOptions: [
      {
        label: "Finished bore & keyway",
        note: "Also available in a range of stock bore sizes.",
        origin: "current-site"
      },
      { label: "Spacer coupling to suit different distances between shaft ends (DBSE)", origin: "current-site" }
    ],
    documentIds: ["flexible-jaw-couplings-catalogue"],
    applications: [],
    images: [
      {
        src: "/images/products/flexible-jaw-couplings",
        alt: "Flexible Jaw Couplings",
        kind: "render",
        widths: [320, 480, 640, 960],
        defaultWidth: 640,
        width: 960,
        height: 960
      }
    ],
    relatedSlugs: ["lhrc-couplings"],
    rfq: { fields: "coupling", spacerVariants: ["standard-spacer", "external-spider-aluminium-spacer", "cushion-spacer"] },
    dataSource: {
      sources: [
        "Published on lakshmipulley.com (src/data/products.js at commit b1c1d56)",
        "docs/source-content/old-site-scrape/Products/Flexible-jaw.md"
      ],
      ownerVerified: false,
      conflicts: [
        {
          field: "variants[external-spider].publishedSizeCount",
          detail: "Published as 6 sizes; the size table lists 7 rows."
        },
        {
          field: "variants[standard-spacer].publishedSizeCount",
          detail: "Published as 7 sizes; the size table lists 6 rows."
        },
        {
          field: "variants[cushion, cushion-spacer].range.bore",
          detail: "Published as 25 to 90 mm; the last table row (J-02955) lists a 100 mm maximum bore."
        }
      ],
      notes: [
        
        "Published values kept as-is. The same three mismatches appear in the old-site scrape, so they were inherited, not introduced.",
        "Size codes are kept exactly as published (the zero padding differs, e.g. J-095 vs J-0100)."
      ]
    }
  },
  // 2. Flexible Pin Bush Couplings
  {
    slug: "flexible-pin-bush-couplings",
    name: "Flexible Pin Bush Couplings",
    category: "couplings",
    summary: "Cushioned drive type that transmits torque through high tensile steel bolts. Absorbs shock loads and torsional vibrations.",
    features: [
      "Transmits torque through high tensile steel bolts to the machine input shaft.",
      "Highly developed rubber compounds used in bushes to absorb shock loads and torsional vibrations.",
      "Simple and compact, capable of transmitting high torques at maximum speeds.",
      "Permits drive in either direction and requires neither lubrication nor adjustment after fitting.",
      "Flexible bushes remain unaffected by water, dust and atmospheric conditions.",
      "Flanges are manufactured with cast iron, Grade 200 of IS 210.",
      "Available with Pilot Bore or Finish bore & keyway to suit requirements."
    ],
    specifications: {
      range: {
        bore: { min: 12.7, max: 350, unit: "mm" },
        torque: { min: 77, max: 197600, unit: "Nm" },
        powerPer100rpm: { min: 0.81, max: 249, unit: "kW" },
        sizeCount: 26
      }
    },
    variants: [],
    additionalInfo: "26 sizes available in standard version. Brake Drum and Spacer Types also available. Alternative material like cast steel can be considered.",
    customOptions: [
      { label: "Pilot bore, or finished bore & keyway to suit requirements", origin: "current-site" },
      { label: "Brake drum type", origin: "current-site" },
      { label: "Spacer type", origin: "current-site" },
      {
        label: "Alternative flange material such as cast steel",
        note: "Old site: \"can be considered for standard flanges\".",
        origin: "current-site"
      }
    ],
    documentIds: ["flexible-pin-bush-couplings-catalogue"],
    applications: [],
    images: [
      {
        src: "/images/products/flexible-pin-bush-couplings",
        alt: "Flexible Pin Bush Couplings",
        kind: "render",
        widths: [320, 480, 640, 960],
        defaultWidth: 640,
        width: 960,
        height: 960
      }
    ],
    relatedSlugs: [],
    rfq: { fields: "coupling" },
    dataSource: {
      sources: [
        "Published on lakshmipulley.com (src/data/products.js at commit b1c1d56)",
        "docs/source-content/old-site-scrape/Products/Flexible-pin-bush.md"
      ],
      ownerVerified: false,
      conflicts: [
        {
          field: "specifications.range.torque.max vs specifications.range.powerPer100rpm.max",
          detail: "Published max torque is 1,97,600 Nm but max power is 249 kW at 100 rpm; T = 9,549 x P / n gives about 23,800 Nm for 249 kW. One of the two figures may be wrong. Both kept as published."
        }
      ],
      notes: [
        "Old-site scrape carries identical range figures.",
        "No size table is published for this product (catalogue PDF only)."
      ]
    }
  },
  // 3. Flexible Tyre Couplings
  {
    slug: "flexible-tyre-couplings",
    name: "Flexible Tyre Couplings",
    category: "couplings",
    summary: "Torsionally elastic couplings with Easyfit (Taper) fixing, suitable for dampening destructive vibration.",
    features: [
      "Provides all the desirable features of an ideal flexible coupling, including Easyfit (Taper) fixing.",
      "'Torsionally elastic', offering versatility with a choice of flange combinations.",
      "Handles parallel, angular and axial displacements, either singly or in combination.",
      "Cushions against destructive shock loads protecting the complete system.",
      "Free of Backlash - Does not create 'snatch' on take up of the drive.",
      "Reduces vibration and torsional oscillations developed in internal combustion engines.",
      "No lubrication required, easy maintenance."
    ],
    specifications: {
      range: {
        torque: { nominal: 12606, max: 42740, unit: "Nm" },
        bore: { max: 190, unit: "mm", label: "Bore Range" },
        misalignment: { parallel: { max: 6, unit: "mm" }, angular: { max: 4, unit: "°" }, endFloat: { max: 8, unit: "mm" } }
      },
      tables: [
        {
          id: "ltc-sizes",
          caption: "Tyre Couplings - Sizes & Specifications",
          status: "draft",
          source: {
            origin: "old-site-scrape",
            file: "docs/source-content/old-site-scrape/Products/Flexible-Tyre.md",
            note: "Restored unchanged; awaiting owner confirmation. A dash in the source (LTC250 taper-version bore) is stored as null."
          },
          columns: [
            { key: "size", label: "Size", kind: "code" },
            { key: "powerPer100rpm", label: "Power", unit: "kW", suffix: "per 100 rpm", kind: "number", decimals: 2 },
            { key: "boreMaxTaper", label: "Max. bore, Easyfit (taper) version", unit: "mm", kind: "number" },
            { key: "boreMaxThrough", label: "Max. bore, through-bore version", unit: "mm", kind: "number" },
            { key: "speedMax", label: "Max. speed", unit: "rpm", kind: "number" }
          ],
          rows: [
            { size: "LTC40", powerPer100rpm: 0.22, boreMaxTaper: 25, boreMaxThrough: 30, speedMax: 4500 },
            { size: "LTC45", powerPer100rpm: 0.39, boreMaxTaper: 28, boreMaxThrough: 32, speedMax: 4500 },
            { size: "LTC50", powerPer100rpm: 0.56, boreMaxTaper: 32, boreMaxThrough: 38, speedMax: 4500 },
            { size: "LTC60", powerPer100rpm: 1.11, boreMaxTaper: 42, boreMaxThrough: 48, speedMax: 4000 },
            { size: "LTC70", powerPer100rpm: 1.7, boreMaxTaper: 42, boreMaxThrough: 45, speedMax: 3600 },
            { size: "LTC80", powerPer100rpm: 2.65, boreMaxTaper: 50, boreMaxThrough: 65, speedMax: 3100 },
            { size: "LTC85", powerPer100rpm: 3.2, boreMaxTaper: 50, boreMaxThrough: 70, speedMax: 3000 },
            { size: "LTC90", powerPer100rpm: 3.82, boreMaxTaper: 60, boreMaxThrough: 76, speedMax: 2880 },
            { size: "LTC100", powerPer100rpm: 5.29, boreMaxTaper: 60, boreMaxThrough: 85, speedMax: 2600 },
            { size: "LTC110", powerPer100rpm: 7.46, boreMaxTaper: 60, boreMaxThrough: 90, speedMax: 2300 },
            { size: "LTC120", powerPer100rpm: 12.4, boreMaxTaper: 75, boreMaxThrough: 102, speedMax: 2050 },
            { size: "LTC140", powerPer100rpm: 19.7, boreMaxTaper: 90, boreMaxThrough: 120, speedMax: 1800 },
            { size: "LTC160", powerPer100rpm: 32.6, boreMaxTaper: 100, boreMaxThrough: 140, speedMax: 1600 },
            { size: "LTC180", powerPer100rpm: 57.4, boreMaxTaper: 110, boreMaxThrough: 150, speedMax: 1500 },
            { size: "LTC200", powerPer100rpm: 84, boreMaxTaper: 110, boreMaxThrough: 150, speedMax: 1300 },
            { size: "LTC220", powerPer100rpm: 104, boreMaxTaper: 127, boreMaxThrough: 160, speedMax: 1100 },
            { size: "LTC250", powerPer100rpm: 132, boreMaxTaper: null, boreMaxThrough: 190, speedMax: 1000 }
          ]
        }
      ]
    },
    variants: [],
    customOptions: [
      {
        label: "Flanges in F or H version with Easyfit (taper) fitting, or B version bored to size",
        origin: "old-site-scrape"
      },
      { label: "Spacer flange to suit the standard distance between shaft ends (DBSE)", origin: "old-site-scrape" },
      { label: "Natural rubber tyre compound", origin: "old-site-scrape" },
      {
        label: "Polychloroprene tyre compound for adverse conditions such as oil or grease contamination",
        origin: "old-site-scrape"
      },
      {
        label: "F.R.A.S. tyres where fire resistance and anti-static properties are required",
        origin: "old-site-scrape"
      }
    ],
    documentIds: ["flexible-tyre-couplings-catalogue"],
    applications: [],
    images: [
      {
        src: "/images/products/flexible-tyre-couplings",
        alt: "Flexible Tyre Couplings",
        kind: "render",
        widths: [320, 480, 640, 960],
        defaultWidth: 640,
        width: 960,
        height: 960
      }
    ],
    relatedSlugs: [],
    rfq: { fields: "coupling" },
    dataSource: {
      sources: [
        "Published on lakshmipulley.com (src/data/products.js at commit b1c1d56)",
        "docs/source-content/old-site-scrape/Products/Flexible-Tyre.md"
      ],
      ownerVerified: false,
      conflicts: [],
      notes: [
        
        "Size table (LTC40 to LTC250, 17 rows) restored unchanged from the old-site scrape; status \"draft\" until the owner confirms it, so it is not displayed yet.",
        "Observation, not a published fact: 132 kW per 100 rpm (LTC250) corresponds to about 12,605 Nm, which matches the published nominal torque of 12,606 Nm.",
        "Old-site tyre temperature ranges are garbled in the scrape (\"-500C to +500C\" style) and were NOT migrated; the owner must supply them.",
        "Old-site text \"angular misalignment upto 40\" is read as the degree sign lost in the scrape; the current-site value of 4 degrees is kept."
      ]
    }
  },
  // 4. Gear Couplings
  {
    slug: "gear-couplings",
    name: "Gear Couplings",
    category: "couplings",
    summary: "Curved tooth flexible gear couplings known for mechanical flexibility and high power carrying capacity.",
    features: [
      "Distinguished by mechanical flexibility and compensation of angular, parallel and axial misalignments.",
      "High power carrying capacity.",
      "Designed for extensive applications in metal rolling mills, paper machinery, cranes, cement plants, etc.",
      "Consist of two hubs with crowned external teeth and two outer sleeves with internal spur teeth.",
      "Manufactured from carbon steel and hardened to required degree.",
      "Suitable for grease/oil lubrication with Seal Carrier for easy maintenance."
    ],
    specifications: {
      range: {
        powerPer100rpm: { min: 11.5, max: 12700, unit: "kW" },
        torque: { min: 1100, max: 1200000, unit: "Nm" },
        bore: { min: 20, max: 600, unit: "mm" },
        sizeCount: 19
      }
    },
    variants: [],
    additionalInfo: "19 sizes in Standard version. Variants include Half Rigid Half Flexible, Torsion shaft, Spacer Type, and Shear Pin Protection.",
    customOptions: [
      { label: "Half rigid, half flexible coupling", origin: "current-site" },
      { label: "Torsion shaft gear coupling", origin: "current-site" },
      { label: "Spacer type", origin: "current-site" },
      { label: "Shear pin protection", origin: "current-site" }
    ],
    documentIds: ["gear-couplings-catalogue"],
    applications: [
      "Metal rolling mills", "Paper machinery", "Cranes", "Dredgers", "Rubber & plastic industries",
      "Cement plants", "Conveyors & elevators", "Compressors", "Fans & blowers", "Screens",
      "Other general industries"
    ],
    images: [
      {
        src: "/images/products/gear-couplings",
        alt: "Gear Couplings",
        kind: "render",
        widths: [320, 480, 640, 960],
        defaultWidth: 640,
        width: 960,
        height: 960
      }
    ],
    relatedSlugs: [],
    rfq: { fields: "coupling" },
    dataSource: {
      sources: [
        "Published on lakshmipulley.com (src/data/products.js at commit b1c1d56)",
        "docs/source-content/old-site-scrape/Products/Gear-couplings.md"
      ],
      ownerVerified: false,
      conflicts: [],
      notes: [
        
        "Applications restored from the old-site scrape (11 entries). The current site lists only rolling mills, paper machinery, cranes and cement plants, followed by \"etc.\".",
        "Old site prints the torque maximum as 12,00,000 Nm (Indian grouping); the current site prints 1,200,000 Nm. Same value."
      ]
    }
  },
  // 5. V-Pulleys
  {
    slug: "v-pulleys",
    name: "V-Pulleys",
    category: "pulleys",
    summary: "Standard range of metric pulleys to cover drives up to 250 kW, featuring dual duty grooves.",
    features: [
      "Standard range of metric pulleys to cover drives up to 250 kW approx.",
      "Dual duty grooves conforming to ISO Specifications to perfectly match classical 'V' and SpaceSaver Wedge section belts.",
      "Cater to Speed Ratios up to 1:7.", "Easyfit (Taper) Bushes used for quick fitment and removal.",
      "Made of high quality close-grained Cast Iron.",
      "All Arm & Web type pulleys supplied with Static balancing (Dynamic Balancing on request)."
    ],
    specifications: {
      tables: [
        {
          id: "pcd-by-section",
          caption: "V-Pulleys - Sizes & Specifications",
          status: "published",
          source: { origin: "current-site" },
          columns: [
            { key: "section", label: "Section", kind: "labelRange", rangeKey: "grooves", rangeSuffix: "Grooves" },
            { key: "pcd", label: "Pitch Circle Diameter", unit: "mm", kind: "list", separator: ", " }
          ],
          rows: [
            {
              section: "SPZ",
              grooves: { min: 1, max: 5 },
              pcd: [67, 71, 75, 80, 85, 90, 95, 100, 112, 125, 140, 160, 180, 200, 250, 315, 400, 500, 630, 800]
            },
            {
              section: "A/SPA",
              grooves: { min: 2, max: 5 },
              pcd: [80, 85, 90, 95, 100, 106, 112, 118, 125, 132, 140, 150, 160, 180, 200, 250, 315, 400, 500, 630]
            },
            {
              section: "B/SPB",
              grooves: { min: 2, max: 6 },
              pcd: [
                125, 132, 140, 150, 160, 170, 180, 190, 200, 212, 224, 236, 250, 280, 315, 355, 400, 500, 630, 800,
                1000
              ]
            },
            {
              section: "C/SPC",
              grooves: { min: 4, max: 8 },
              pcd: [
                200, 212, 224, 236, 250, 265, 280, 300, 315, 335, 355, 375, 400, 425, 450, 475, 500, 530, 560, 630,
                800, 1000, 1250
              ]
            }
          ]
        }
      ]
    },
    variants: [],
    additionalInfo: "Custom built drives available including through bored pulleys, 'D' and 'E' section grooves, Split constructions, Cast Steel options, and complete Jack-Shaft Drives.",
    customOptions: [
      { label: "Through-bored pulleys without Easyfit (taper) bushes", origin: "current-site" },
      { label: "Pulleys with D and E section grooves", origin: "current-site" },
      {
        label: "Pulleys with more than 8 grooves of SPC section, solid or split, for higher-power drives such as crushers and rolling mills",
        origin: "old-site-scrape"
      },
      { label: "Split construction", origin: "current-site" },
      {
        label: "Pulleys larger in diameter than the standard Easyfit (taper) bush pulley range",
        origin: "old-site-scrape"
      },
      { label: "Alternative material such as cast steel", origin: "current-site" },
      { label: "Flywheel pulleys", origin: "old-site-scrape" },
      {
        label: "Complete jack-shaft drives",
        note: "Old site: including jack-shafts, pedestals, plummer blocks, bearings and base plates mounted on slide rails.",
        origin: "current-site"
      },
      {
        label: "Dynamic balancing on request",
        note: "Old site adds \"at extra cost\". Arm and web pulleys are supplied statically balanced.",
        origin: "current-site"
      }
    ],
    documentIds: [
      "v-pulleys-spa-catalogue", "v-pulleys-spb-catalogue", "v-pulleys-spc-catalogue", "v-pulleys-spz-catalogue",
      "easyfit-bush-catalogue"
    ],
    applications: [],
    images: [
      {
        src: "/images/products/v-pulleys",
        alt: "V-Pulleys",
        kind: "render",
        widths: [320, 480, 640, 960],
        defaultWidth: 640,
        width: 960,
        height: 960
      }
    ],
    relatedSlugs: [],
    rfq: { fields: "v-pulley" },
    dataSource: {
      sources: [
        "Published on lakshmipulley.com (src/data/products.js at commit b1c1d56)",
        "docs/source-content/old-site-scrape/Products/v-pulleys.md"
      ],
      ownerVerified: false,
      conflicts: [],
      notes: [
        
        "The published table lists pitch circle diameters per belt section only. The full per-size dimension tables (bush, max bore, F/K/L/M, outside diameter) exist only inside the scanned catalogue PDFs and have not been transcribed.",
        "Old-site scrape also states Easyfit bush shaft tolerances of +0.051 mm / -0.127 mm; not migrated (not requested for this step).",
        "The \"Easy Fit Bush Bore & Key Way\" catalogue is attached to this product because the current site lists it here; the owner should confirm whether taper bushes become their own product."
      ]
    }
  },
  // 6. LHRC Couplings
  {
    slug: "lhrc-couplings",
    name: "LHRC Couplings",
    category: "couplings",
    summary: "Lakshmi LHRC General purpose jaw Couplings with highly resilient rubber element in range of 8 sizes from 70 to 280 can transmit from 0.35kW to 33kW at 100RPM with the cost saving advantages of EASYFIT(TAPER) System.",
    features: [
      "General purpose jaw Couplings with highly resilient rubber element.",
      "Available in 8 sizes from 70 to 280.", "Can transmit from 0.35kW to 33kW at 100RPM.",
      "Cost saving advantages of the EASYFIT(TAPER) System."
    ],
    specifications: {  },
    variants: [],
    additionalInfo: "Contact us for custom requirements.",
    customOptions: [{ label: "Custom requirements on request", origin: "current-site" }],
    documentIds: [],
    applications: [],
    images: [
      {
        src: "/images/products/lhrc-couplings",
        alt: "LHRC Couplings",
        kind: "render",
        widths: [320, 480, 640, 960],
        defaultWidth: 640,
        width: 960,
        height: 960
      }
    ],
    relatedSlugs: ["flexible-jaw-couplings"],
    rfq: { fields: "coupling" },
    dataSource: {
      sources: ["Published on lakshmipulley.com (src/data/products.js at commit b1c1d56)"],
      ownerVerified: false,
      conflicts: [],
      notes: [
        
        "Published as \"general purpose jaw couplings\", which is the basis for linking to the flexible jaw couplings page.",
        "Size range (8 sizes, 70 to 280) and power (0.35 to 33 kW at 100 rpm) exist only in the summary and feature text; not extracted as structured range values because the site does not display a range for this product yet.",
        "No catalogue or size table is published."
      ]
    }
  },
  // 7. EasyFIT(Taper) Timing Pulleys
  {
    slug: "easyfit-timing-pulleys",
    name: "EasyFIT(Taper) Timing Pulleys",
    category: "pulleys",
    summary: "Lakshmi timing pulleys, non-slip with no backlash constant linear velocity of all pitches XL,L,H,HTD,T5,T10. For any other specification contact us.",
    features: [
      "Non-slip with no backlash.", "Constant linear velocity.",
      "Available in all pitches: XL, L, H, HTD, T5, T10.", "Custom specifications available upon contact."
    ],
    specifications: {  },
    variants: [],
    additionalInfo: "For any other specification contact us.",
    customOptions: [{ label: "Other specifications on request", origin: "current-site" }],
    documentIds: [],
    applications: [],
    images: [
      {
        src: "/images/products/easyfit-timing-pulleys",
        alt: "EasyFIT(Taper) Timing Pulleys",
        kind: "render",
        widths: [320, 480, 640, 960],
        defaultWidth: 640,
        width: 960,
        height: 1280
      }
    ],
    relatedSlugs: [],
    rfq: { fields: "timing-pulley" },
    dataSource: {
      sources: ["Published on lakshmipulley.com (src/data/products.js at commit b1c1d56)"],
      ownerVerified: false,
      conflicts: [],
      notes: [
        
        "Pitches XL, L, H, HTD, T5, T10 appear in text only. \"HTD\" may be a third-party trademark name; owner to confirm.",
        "No catalogue or size table is published."
      ]
    }
  },
  // 8. Resilient Grid Couplings
  {
    slug: "resilient-grid-couplings",
    name: "Resilient Grid Couplings",
    category: "couplings",
    summary: "Lakshmi grid Couplings Reduce Vibration, Absorb Shock and Compensate for Misalignment.",
    features: ["Reduces Vibration.", "Absorbs Shock.", "Compensates for Misalignment."],
    specifications: {  },
    variants: [],
    additionalInfo: "Contact us for custom requirements.",
    customOptions: [{ label: "Custom requirements on request", origin: "current-site" }],
    documentIds: ["resilient-grid-couplings-catalogue"],
    applications: [],
    images: [
      {
        src: "/images/products/resilient-grid-couplings",
        alt: "Resilient Grid Couplings",
        kind: "render",
        widths: [320, 480, 640, 960],
        defaultWidth: 640,
        width: 960,
        height: 960
      }
    ],
    relatedSlugs: [],
    rfq: { fields: "coupling" },
    dataSource: {
      sources: ["Published on lakshmipulley.com (src/data/products.js at commit b1c1d56)"],
      ownerVerified: false,
      conflicts: [],
      notes: ["No technical values are published for this product; the catalogue PDF is a scan."]
    }
  }
];

export const getProduct = (slug) => products.find((p) => p.slug === slug);
export const getProductByName = (name) => products.find((p) => p.name === name);
export const getCategory = (id) => categories.find((c) => c.id === id);
