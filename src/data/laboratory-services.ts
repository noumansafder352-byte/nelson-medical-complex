import type { LabService, LabServiceCategory } from "@/types";

/**
 * Nelson Laboratory service catalogue.
 *
 * Service names come from the laboratory's own service list. The summaries
 * and descriptions are general explanatory copy (status "sample") — confirm
 * them with the laboratory, then change `status` to "verified". Do not add
 * prices, turnaround times or preparation instructions unless confirmed by
 * the laboratory.
 *
 * To add a service: copy a record, give it a unique `slug` (used for the
 * #anchor and appointment form) and a valid `categoryId`. The listing,
 * Services menu and appointment form update automatically.
 */

export const labCategories: LabServiceCategory[] = [
  {
    id: "pathology",
    name: "Laboratory & Pathology",
    description: "Molecular, blood, tissue and microbiology testing carried out in our laboratory.",
    icon: "microscope",
  },
  {
    id: "procedures",
    name: "Biopsies & Procedures",
    description: "Sample-taking procedures such as aspirations and biopsies, and other specialised procedures.",
    icon: "syringe",
  },
  {
    id: "imaging",
    name: "Radiology & Imaging",
    description: "MRI, CT, ultrasound and X-ray contrast studies to help your doctor see inside the body.",
    icon: "scan-line",
  },
  {
    id: "rehabilitation",
    name: "Physiotherapy",
    description: "Physiotherapy to support recovery, movement and pain management.",
    icon: "person-standing",
  },
];

export const labServices: LabService[] = [
  // Laboratory & Pathology
  {
    slug: "real-time-pcr",
    name: "Fully Automated Real-Time PCR",
    categoryId: "pathology",
    icon: "dna",
    // Original PNG kept in design-assets/.
    image: {
      src: "/images/lab-services/real-time-pcr.webp",
      alt: "Laboratory scientist loading sample tubes into an automated PCR analyser",
    },
    summary: "Molecular testing that detects the genetic material of viruses and other organisms.",
    description: [
      "Real-time PCR (polymerase chain reaction) is a molecular technique that detects and measures specific genetic material (DNA or RNA) in a sample. It is widely used to detect viral and bacterial infections and, for some infections, to measure how much of the organism is present.",
      "Our PCR testing is fully automated, which reduces manual handling of samples. The tests performed depend on your doctor's request.",
    ],
    status: "sample",
  },
  {
    slug: "hematology",
    name: "Hematology",
    categoryId: "pathology",
    icon: "droplet",
    // Original PNG kept in design-assets/.
    image: {
      src: "/images/lab-services/hematology.webp",
      alt: "Laboratory scientist placing blood sample tubes into an automated hematology analyser",
    },
    summary: "Blood tests that look at red cells, white cells, platelets and clotting.",
    description: [
      "Hematology covers tests on the blood and blood-forming system, such as the complete blood count (CBC), ESR, blood grouping and clotting studies.",
      "These tests are often requested as part of a routine check-up or to help your doctor investigate symptoms such as tiredness, infection or bleeding.",
    ],
    status: "sample",
  },
  {
    slug: "viral-serology",
    name: "Viral Serology",
    categoryId: "pathology",
    icon: "shield",
    // Original PNG kept in design-assets/.
    image: {
      src: "/images/lab-services/viral-serology.webp",
      alt: "Laboratory scientist pipetting a blood sample for serology testing, with a virus image on the screen behind",
    },
    summary: "Blood tests that look for antibodies and antigens linked to viral infections.",
    description: [
      "Viral serology tests check a blood sample for antibodies produced by the immune system, or for antigens from the virus itself. They are commonly used in screening and diagnosis of infections such as hepatitis B, hepatitis C and HIV.",
      "The specific tests performed depend on your doctor's request.",
    ],
    status: "sample",
  },
  {
    slug: "histopathology",
    name: "Histopathology",
    categoryId: "pathology",
    icon: "microscope",
    // Original PNG kept in design-assets/.
    image: {
      src: "/images/lab-services/histopathology.webp",
      alt: "Laboratory scientists examining stained tissue slides under microscopes, with a tissue image on the screen",
    },
    summary: "Microscopic examination of tissue samples, such as biopsies and surgical specimens.",
    description: [
      "Histopathology is the study of tissue under the microscope. Tissue removed during a biopsy or operation is carefully processed, cut into very thin sections, stained and examined by a pathologist.",
      "The findings help your doctor make a diagnosis and plan treatment.",
    ],
    status: "sample",
  },
  {
    slug: "cytology",
    name: "Cytology",
    categoryId: "pathology",
    icon: "microscope",
    // Original PNG kept in design-assets/.
    image: {
      src: "/images/lab-services/cytology.webp",
      alt: "Gloved hands applying a stained cell sample to a glass slide, with magnified cells shown on a screen",
    },
    summary: "Examination of individual cells from fluids, smears and fine needle aspirates.",
    description: [
      "Cytology looks at individual cells rather than whole pieces of tissue. Samples may include body fluids, smears or cells collected through a fine needle aspiration.",
      "It is a less invasive way to investigate a lump or abnormal fluid, and is also used in screening.",
    ],
    status: "sample",
  },
  {
    slug: "microbiology",
    name: "Microbiology",
    categoryId: "pathology",
    icon: "test-tubes",
    // Original PNG kept in design-assets/.
    image: {
      src: "/images/lab-services/microbiology.webp",
      alt: "Laboratory scientist examining bacterial cultures on a petri dish, with magnified bacteria on a screen",
    },
    summary: "Tests that identify bacteria and other micro-organisms, including cultures.",
    description: [
      "Microbiology tests help identify the bacteria, fungi or parasites that may be causing an infection. Samples such as urine, blood, stool, swabs or pus can be examined and cultured.",
      "Where requested, sensitivity testing may help guide your doctor's choice of antibiotic.",
    ],
    status: "sample",
  },
  {
    slug: "chemical-pathology",
    name: "Chemical Pathology",
    categoryId: "pathology",
    icon: "flask",
    // Original PNG kept in design-assets/.
    image: {
      src: "/images/lab-services/chemical-pathology.webp",
      alt: "Laboratory scientist loading a blood sample into an automated chemistry analyser, with organ test panels on a screen",
    },
    summary: "Biochemistry tests such as blood sugar, liver, kidney, lipid and hormone profiles.",
    description: [
      "Chemical pathology (clinical biochemistry) measures chemical substances in blood, urine and other samples. Common tests include blood glucose, HbA1c, liver function, kidney function, lipid profile, electrolytes and hormone tests.",
      "Some tests, such as fasting glucose or lipids, may need preparation. Please contact our team before your visit so we can confirm what applies to your test.",
    ],
    status: "sample",
  },

  // Biopsies & Procedures
  {
    slug: "aspirations-and-biopsies",
    name: "Aspirations and Biopsies",
    categoryId: "procedures",
    icon: "syringe",
    // Original PNG kept in design-assets/.
    image: {
      src: "/images/lab-services/aspirations-and-biopsies.webp",
      alt: "Clinician performing an ultrasound-guided fine needle aspiration, with specimen containers and slides on a tray",
    },
    summary: "Collection of cells, fluid or tissue for laboratory examination.",
    description: [
      "An aspiration uses a fine needle to collect cells or fluid, while a biopsy removes a small piece of tissue. Some procedures are guided by ultrasound or CT so the needle can be placed accurately.",
      "Samples are then examined in our cytology or histopathology section. Our team will explain the procedure, and any preparation needed, before it is carried out.",
    ],
    status: "sample",
  },
  {
    slug: "special-procedures",
    name: "Special Procedures",
    categoryId: "procedures",
    icon: "activity",
    // Original PNG kept in design-assets/.
    image: {
      src: "/images/lab-services/special-procedures.webp",
      alt: "Clinician preparing a patient's arm for an injection beside a CT scanner, with scan images on the monitors",
    },
    summary: "Specialised diagnostic procedures arranged on your doctor's request.",
    description: [
      "In addition to routine tests and scans, we perform a range of specialised diagnostic procedures.",
      "Please contact our team with your doctor's request so we can confirm whether the procedure is available and explain what it involves.",
    ],
    status: "sample",
  },

  // Radiology & Imaging
  {
    slug: "open-mri",
    name: "Open MRI",
    categoryId: "imaging",
    icon: "magnet",
    // Original PNG kept in design-assets/.
    image: {
      src: "/images/lab-services/open-mri.webp",
      alt: "Radiographer reassuring a patient lying on the table of an open MRI scanner, with brain scans on a monitor",
    },
    summary: "Detailed MRI scans in an open design — more comfortable if you dislike enclosed spaces.",
    description: [
      "MRI (magnetic resonance imaging) uses a strong magnetic field and radio waves, not X-rays, to create detailed images of the brain, spine, joints and soft tissues.",
      "An open MRI scanner is open at the sides, which many patients find more comfortable — especially those who feel anxious in enclosed spaces, children and larger patients.",
      "Please tell our team before your scan if you have a pacemaker, metal implants or any metal fragments in your body.",
    ],
    status: "sample",
  },
  {
    slug: "ct-scan",
    name: "Multi-Slice CT Scan (Spiral)",
    categoryId: "imaging",
    icon: "scan-line",
    // Original PNG kept in design-assets/.
    image: {
      src: "/images/lab-services/ct-scan.webp",
      alt: "Radiographer operating a CT scanner as a patient lies on the table, with body scans on a monitor",
    },
    summary: "Fast, detailed cross-sectional images of the body using a multi-slice spiral CT scanner.",
    description: [
      "A CT (computed tomography) scan uses X-rays and a computer to create cross-sectional images of the body. A multi-slice spiral scanner captures many images in a single rotation, giving fast scans with fine detail.",
      "Some CT scans use a contrast medium. Please tell our team if you are or might be pregnant, have kidney problems, or have had a reaction to contrast before.",
    ],
    status: "sample",
  },
  {
    slug: "3d-ultrasound",
    name: "3D Ultrasound",
    categoryId: "imaging",
    icon: "audio-waveform",
    // Original JPG kept in design-assets/.
    image: {
      src: "/images/lab-services/3d-ultrasound.webp",
      alt: "Sonographer reviewing a pregnancy ultrasound scan on the screen of an ultrasound machine",
    },
    summary: "Three-dimensional ultrasound imaging, including pregnancy and abdominal scans.",
    description: [
      "Ultrasound uses sound waves, not radiation, to create images of organs and structures inside the body. 3D ultrasound builds these into three-dimensional images, which can show more detail — for example in pregnancy scans.",
      "Some ultrasound scans need preparation, such as a full bladder. Our team will let you know what applies to your scan.",
    ],
    status: "sample",
  },
  {
    slug: "colour-doppler",
    name: "Colour Doppler",
    categoryId: "imaging",
    icon: "heart-pulse",
    // Original PNG kept in design-assets/.
    image: {
      src: "/images/lab-services/colour-doppler.webp",
      alt: "Doctor performing a colour Doppler ultrasound on a patient's leg, with blood flow shown in red and blue on the screen",
    },
    summary: "Ultrasound that shows blood flow through arteries and veins.",
    description: [
      "Colour Doppler is a type of ultrasound that shows the speed and direction of blood flow in colour. It can help your doctor assess arteries and veins — for example to look for narrowing, blockages or clots — and blood flow in pregnancy.",
      "Like other ultrasound scans, it is painless and does not use radiation.",
    ],
    status: "sample",
  },
  {
    slug: "gastrointestinal-barium",
    name: "Gastrointestinal Barium Studies",
    categoryId: "imaging",
    icon: "radiation",
    // Original PNG kept in design-assets/.
    image: {
      src: "/images/lab-services/gastrointestinal-barium.webp",
      alt: "Radiographer at the control panel during a barium X-ray study, with images of the stomach and bowel on the screen",
    },
    summary: "X-ray studies of the digestive tract using a barium contrast medium.",
    description: [
      "Barium studies, such as a barium swallow, barium meal or barium enema, use a contrast medium called barium so the oesophagus, stomach or bowel show up clearly on X-ray.",
      "These studies usually need preparation. Our team will explain exactly what to do before your appointment.",
    ],
    status: "sample",
  },
  {
    slug: "urography-ivu",
    name: "Urography Studies (IVU)",
    categoryId: "imaging",
    icon: "radiation",
    // Original PNG kept in design-assets/.
    image: {
      src: "/images/lab-services/urography-ivu.webp",
      alt: "Illustration of the kidneys, ureters and bladder beside urography X-ray images and an X-ray room",
    },
    summary: "X-ray study of the kidneys, ureters and bladder using an injected contrast medium.",
    description: [
      "Intravenous urography (IVU) uses a contrast medium injected into a vein, followed by a series of X-rays, to show the kidneys, ureters and bladder. It may be requested to investigate stones, blockages or blood in the urine.",
      "Please tell our team if you are or might be pregnant, have kidney problems, or have had a reaction to contrast before. Preparation will be explained when you book.",
    ],
    status: "sample",
  },
  {
    slug: "hysterosalpingography-hsg",
    name: "Hysterosalpingography (HSG)",
    categoryId: "imaging",
    icon: "radiation",
    // Original PNG kept in design-assets/.
    image: {
      src: "/images/lab-services/hysterosalpingography-hsg.webp",
      alt: "X-ray room with an HSG image of the uterus and fallopian tubes on the monitor, beside a labelled illustration of the uterus",
    },
    summary: "X-ray study of the uterus and fallopian tubes, often part of fertility assessment.",
    description: [
      "Hysterosalpingography (HSG) uses a contrast medium and X-rays to show the shape of the uterus and whether the fallopian tubes are open. It is commonly requested as part of a fertility assessment.",
      "The test is timed to a particular part of the menstrual cycle, so please contact our team to schedule it.",
    ],
    status: "sample",
  },

  // Physiotherapy
  {
    slug: "physiotherapy",
    name: "Physiotherapy",
    categoryId: "rehabilitation",
    icon: "person-standing",
    // Original PNG kept in design-assets/.
    image: {
      src: "/images/lab-services/physiotherapy.webp",
      alt: "Physiotherapist gently bending a patient's knee as the patient lies on a treatment table in a rehabilitation room",
    },
    summary: "Treatment and exercise programmes to help with pain, injury and recovery.",
    description: [
      "Physiotherapy helps restore movement and function after injury, surgery or illness, and can help manage pain from conditions such as back and neck problems, joint stiffness and sports injuries.",
      "Your physiotherapist will assess you and plan a programme that may include exercise, manual therapy and advice.",
    ],
    status: "sample",
  },
];

/** Services shown on the homepage, in this order. */
export const featuredLabServiceSlugs = [
  "real-time-pcr",
  "chemical-pathology",
  "histopathology",
  "open-mri",
  "ct-scan",
  "3d-ultrasound",
];

export const getLabCategory = (id: string) => labCategories.find((category) => category.id === id);

/** The service's own icon, falling back to its category's icon. */
export const getLabServiceIcon = (service: LabService) =>
  service.icon ?? getLabCategory(service.categoryId)?.icon ?? "flask";
