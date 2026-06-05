export const productsData = [
  {
    id: "jaw-couplings",
    slug: "flexible-jaw-couplings",
    name: "Flexible Jaw Couplings",
    category: "Couplings",
    shortDescription: "Simple construction, quick installation with no special tools required. Absorbs shock loads and dampens vibration.",
    image: "/Assets/1product.jpg",
    catalogPdf: "/Assets/Flexible jaw couplings.pdf",
    features: [
      "Simple construction - quick, easy installation - no special tools required.",
      "Flexible insert caters to incidental angular, parallel and axial misalignment.",
      "Absorbs shock loads and dampens small amplitude vibration.",
      "Insert design presets correct distance between hubs, using raised pads on each leg of the insert.",
      "Available in a range of stock bore sizes or with Finished Bore & Keyway.",
      "Unaffected by moisture, grease and oils - including non-aromatic and non-ketone solvents, and temperatures from -40°C to +100°C.",
      "Spacer coupling with spacers to suit different distances between shaft ends (DBSE)."
    ],
    variants: [
      {
        name: "Standard Coupling", torque: "20 to 262 Nm", power: "0.21 to 2.75 KW per 100 rpm", boreDir: "15 to 60 mm", sizes: 7, image: "/Assets/jaw1.jpeg",
        requirementsTable: {
          headers: ["SIZE", "POWER (kW) per 100 rpm", "Bore Min (mm)", "Bore Max (mm)"],
          rows: [
            ["J-095", "0.21", "15", "28"],
            ["J-099", "0.39", "20", "30"],
            ["J-100", "0.50", "20", "38"],
            ["J-110", "0.92", "20", "42"],
            ["J-150", "1.50", "30", "48"],
            ["J-190", "2.02", "36", "55"],
            ["J-225", "2.75", "40", "60"]
          ]
        }
      },
      {
        name: "External Spider Coupling", torque: "22 to 267 Nm", power: "0.23 to 2.80 KW per 100 rpm", boreDir: "15 to 60 mm", sizes: 6, image: "/Assets/jaw2.jpeg",
        requirementsTable: {
          headers: ["SIZE", "POWER (kW) per 100 rpm", "Bore Min (mm)", "Bore Max (mm)"],
          rows: [
            ["J-095 ESW", "0.23", "15", "23"],
            ["J-099 ESW", "0.38", "20", "30"],
            ["J-0100 ESW", "0.50", "20", "38"],
            ["J-0110 ESW", "0.91", "20", "42"],
            ["J-0150 ESW", "1.47", "30", "48"],
            ["J-0190 ESW", "2.03", "36", "55"],
            ["J-0225 ESW", "2.80", "40", "60"]
          ]
        }
      },
      {
        name: "Cushion Coupling", torque: "330 to 2139 Nm", power: "3.45 to 22.40 KW per 100 rpm", boreDir: "25 to 90 mm", sizes: 5, image: "/Assets/jaw3.jpeg",
        requirementsTable: {
          headers: ["SIZE", "POWER (kW) per 100 rpm", "Bore Min (mm)", "Bore Max (mm)"],
          rows: [
            ["J-0226 C", "3.45", "25", "65"],
            ["J-0276 C", "5.60", "25", "75"],
            ["J-0280 C", "8.20", "30", "75"],
            ["J-0295 C", "13.40", "40", "90"],
            ["J-02955 C", "22.40", "50", "100"]
          ]
        }
      },
      {
        name: "Standard Spacer Coupling", torque: "20 to 262 Nm", power: "0.21 to 2.75 KW per 100 rpm", boreDir: "15 to 60 mm", sizes: 7, image: "/Assets/jaw4.jpeg",
        requirementsTable: {
          headers: ["SIZE", "POWER (kW) per 100 rpm", "Bore Min (mm)", "Bore Max (mm)", "Spacer Length (mm)"],
          rows: [
            ["JRL-095", "0.21", "15", "28", "90 / 100"],
            ["JRL-100", "0.50", "20", "38", "90 / 100 / 140"],
            ["JRL-110", "0.92", "20", "42", "90 / 100 / 140"],
            ["JRL-150", "1.50", "30", "48", "90 / 100 / 140"],
            ["JRL-190", "2.02", "36", "55", "90 / 100 / 140"],
            ["JRL-225", "2.75", "40", "60", "90 / 100 / 140"]
          ]
        }
      },
      {
        name: "External Spider Aluminium Spacer Coupling", torque: "22 to 267 Nm", power: "0.23 to 2.80 KW per 100 rpm", boreDir: "15 to 60 mm", sizes: 6, image: "/Assets/jaw5.jpeg",
        requirementsTable: {
          headers: ["SIZE", "POWER (kW) per 100 rpm", "Bore Min (mm)", "Bore Max (mm)", "Spacer Length (mm)"],
          rows: [
            ["J-095 SWS", "0.23", "15", "28", "90 / 100"],
            ["J-0100 SWS", "0.50", "20", "38", "90 / 100 / 140"],
            ["J-0110 SWS", "0.91", "20", "42", "90 / 100 / 140"],
            ["J-0150 SWS", "1.47", "30", "48", "90 / 100 / 140"],
            ["J-0190 SWS", "2.03", "36", "55", "90 / 100 / 140"],
            ["J-0225 SWS", "2.80", "40", "60", "90 / 100 / 140"]
          ]
        }
      },
      {
        name: "Cushion Spacer Coupling", torque: "330 to 2139 Nm", power: "3.45 to 22.40 KW per 100 rpm", boreDir: "25 to 90 mm", sizes: 5, image: "/Assets/jaw6.jpeg",
        requirementsTable: {
          headers: ["SIZE", "POWER (kW) per 100 rpm", "Bore Min (mm)", "Bore Max (mm)", "Spacer Length (mm)"],
          rows: [
            ["J-0226 CS", "3.45", "25", "65", "135 / 140 / 180"],
            ["J-0276 CS", "5.60", "25", "75", "135 / 140 / 180"],
            ["J-0280 CS", "8.20", "30", "75", "135 / 140 / 180"],
            ["J-0295 CS", "13.40", "40", "90", "135 / 140 / 180"],
            ["J-02955 CS", "22.40", "50", "100", "135 / 140 / 180"]
          ]
        }
      }
    ]
  },
  {
    id: "pin-bush-couplings",
    slug: "flexible-pin-bush-couplings",
    name: "Flexible Pin Bush Couplings",
    category: "Couplings",
    shortDescription: "Cushioned drive type that transmits torque through high tensile steel bolts. Absorbs shock loads and torsional vibrations.",
    image: "/Assets/2product.jpg",
    catalogPdf: "/Assets/PIN_BUSH_COUPLING_CATALOGUE.pdf",
    features: [
      "Transmits torque through high tensile steel bolts to the machine input shaft.",
      "Highly developed rubber compounds used in bushes to absorb shock loads and torsional vibrations.",
      "Simple and compact, capable of transmitting high torques at maximum speeds.",
      "Permits drive in either direction and requires neither lubrication nor adjustment after fitting.",
      "Flexible bushes remain unaffected by water, dust and atmospheric conditions.",
      "Flanges are manufactured with cast iron, Grade 200 of IS 210.",
      "Available with Pilot Bore or Finish bore & keyway to suit requirements."
    ],
    technicalRange: {
      boreDiameter: "12.7 to 350 mm",
      torque: "77 to 1,97,600 Nm",
      power: "0.81 to 249 Kw at 100 rpm"
    },
    variantsInfo: "26 sizes available in standard version. Brake Drum and Spacer Types also available. Alternative material like cast steel can be considered."
  },
  {
    id: "tyre-couplings",
    slug: "flexible-tyre-couplings",
    name: "Flexible Tyre Couplings",
    category: "Couplings",
    shortDescription: "Torsionally elastic couplings with Easyfit (Taper) fixing, suitable for dampening destructive vibration.",
    image: "/Assets/3product.jpg",
    catalogPdf: "/Assets/Flexible tyre couplings.pdf",
    features: [
      "Provides all the desirable features of an ideal flexible coupling, including Easyfit (Taper) fixing.",
      "'Torsionally elastic', offering versatility with a choice of flange combinations.",
      "Handles parallel, angular and axial displacements, either singly or in combination.",
      "Cushions against destructive shock loads protecting the complete system.",
      "Free of Backlash - Does not create 'snatch' on take up of the drive.",
      "Reduces vibration and torsional oscillations developed in internal combustion engines.",
      "No lubrication required, easy maintenance."
    ],
    technicalRange: {
      torque: "Nominal: 12,606 Nm / Max.: 42,740 Nm",
      boreRange: "Up to 190 mm",
      misalignment: "Parallel up to 6mm, Angular up to 4°, End float up to 8mm"
    }
  },
  {
    id: "gear-couplings",
    slug: "gear-couplings",
    name: "Gear Couplings",
    category: "Couplings",
    shortDescription: "Curved tooth flexible gear couplings known for mechanical flexibility and high power carrying capacity.",
    image: "/Assets/5product.jpg",
    catalogPdf: "/Assets/GEAR_COUPLINGS_CATALOGUE.pdf",
    features: [
      "Distinguished by mechanical flexibility and compensation of angular, parallel and axial misalignments.",
      "High power carrying capacity.",
      "Designed for extensive applications in metal rolling mills, paper machinery, cranes, cement plants, etc.",
      "Consist of two hubs with crowned external teeth and two outer sleeves with internal spur teeth.",
      "Manufactured from carbon steel and hardened to required degree.",
      "Suitable for grease/oil lubrication with Seal Carrier for easy maintenance."
    ],
    technicalRange: {
      power: "11.5 to 12,700 Kw at 100 rpm",
      torque: "1100 to 1,200,000 Nm",
      boreDiameter: "20 to 600 mm"
    },
    variantsInfo: "19 sizes in Standard version. Variants include Half Rigid Half Flexible, Torsion shaft, Spacer Type, and Shear Pin Protection."
  },
  {
    id: "v-pulleys",
    slug: "v-pulleys",
    name: "V-Pulleys",
    category: "Pulleys",
    shortDescription: "Standard range of metric pulleys to cover drives up to 250 kW, featuring dual duty grooves.",
    image: "/Assets/6product.jpg",
    catalogs: [
      { name: "A-SPA belt pulleys", link: "/Assets/Pulleys/PULLEYA.pdf" },
      { name: "B-SPB belt pulleys", link: "/Assets/Pulleys/PULLEYB.pdf" },
      { name: "C-SPC belt pulleys", link: "/Assets/Pulleys/PULLEYC.pdf" },
      { name: "Z-SPZ belt pulleys", link: "/Assets/z1.pdf" },
      { name: "Easy Fit Bush Bore & Key Way", link: "/Assets/Pulleys/EASY FIT BUSH BORE AND KEY WAY-CATALOGUE..pdf" }
    ],
    features: [
      "Standard range of metric pulleys to cover drives up to 250 kW approx.",
      "Dual duty grooves conforming to ISO Specifications to perfectly match classical 'V' and SpaceSaver Wedge section belts.",
      "Cater to Speed Ratios up to 1:7.",
      "Easyfit (Taper) Bushes used for quick fitment and removal.",
      "Made of high quality close-grained Cast Iron.",
      "All Arm & Web type pulleys supplied with Static balancing (Dynamic Balancing on request)."
    ],
    variantsInfo: "Custom built drives available including through bored pulleys, 'D' and 'E' section grooves, Split constructions, Cast Steel options, and complete Jack-Shaft Drives.",
    requirementsTable: {
      headers: ["Section", "Pitch Circle Diameter (mm)"],
      rows: [
        ["SPZ 1 to 5 Grooves", "67, 71, 75, 80, 85, 90, 95, 100, 112, 125, 140, 160, 180, 200, 250, 315, 400, 500, 630, 800"],
        ["A/SPA 2 to 5 Grooves", "80, 85, 90, 95, 100, 106, 112, 118, 125, 132, 140, 150, 160, 180, 200, 250, 315, 400, 500, 630"],
        ["B/SPB 2 to 6 Grooves", "125, 132, 140, 150, 160, 170, 180, 190, 200, 212, 224, 236, 250, 280, 315, 355, 400, 500, 630, 800, 1000"],
        ["C/SPC 4 to 8 Grooves", "200, 212, 224, 236, 250, 265, 280, 300, 315, 335, 355, 375, 400, 425, 450, 475, 500, 530, 560, 630, 800, 1000, 1250"]
      ]
    }
  }
];
