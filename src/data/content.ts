import type { Feature, IconName, Specialist, Specialty } from "@/types";

/**
 * Editable marketing copy used across the homepage and About page.
 * Every statement here is deliberately general — it does not claim
 * accreditation, equipment, statistics or staff that have not been confirmed.
 * Replace with confirmed facts where available.
 */

export const homeHero = {
  eyebrow: "Nelson Lab & Medical Complex",
  title: "Reliable testing and attentive care, close to home.",
  /** Part of the title underlined in brand red. Must appear in `title`. */
  titleHighlight: "attentive care",
  description:
    "Laboratory testing and medical consultations together in one welcoming facility, with a team that takes time to explain each step.",
};

/** Homepage "About" section (copy supplied by Nelson Lab & Medical Complex). */
export const homeAbout = {
  eyebrow: "Who we are",
  title: "Nelson Lab & Medical Complex",
  paragraphs: [
    "At Nelson Medical Complex, we are committed to providing comprehensive, patient-centered healthcare in a state-of-the-art facility. Our multidisciplinary team of experienced physicians, specialists, and healthcare professionals work collaboratively to deliver high-quality medical care across a wide range of specialties under one roof.",
    "Our complex is designed to offer a seamless healthcare experience, from diagnostics and treatment to rehabilitation and wellness. We combine advanced medical technology with a compassionate approach, ensuring each patient receives personalized care tailored to their unique needs.",
  ],
};

/** Homepage "Leadership" section (copy supplied by Nelson Lab & Medical Complex). */
export const leadership = {
  eyebrow: "Leadership",
  name: "Ch. Imran Rashid",
  role: "Chief Executive Officer, Nelson Medical Complex",
  bio: "Ch. Imran Rashid is the CEO of Nelson Medical Complex and Imran Group of Pharmacies. He holds key leadership positions in pharmaceutical associations, business organisations, and community institutions, reflecting his commitment to industry development and community service.",
  affiliationsTitle: "Leadership & Professional Affiliations",
  affiliations: [
    { text: "CEO, Imran Group of Pharmacies", icon: "pill" },
    { text: "Chairman, PCDA, Rawalpindi City", icon: "award" },
    {
      text: "Member, Rawalpindi Chamber of Commerce & Industry (RCCI)",
      icon: "landmark",
    },
    {
      text: "Chairman, RCCI Standing Committee on Chemists & Druggists",
      icon: "briefcase-medical",
    },
    {
      text: "Member, Islamabad Chamber of Commerce & Industry",
      icon: "building",
    },
    {
      text: "Chairman, Membership Committee, Rawal Lions Club",
      icon: "handshake",
    },
    { text: "Founding Member, Rawalpindi Gymkhana Club", icon: "trophy" },
    {
      text: "Secretary General, Markazi Tanzeem Tajiran Cantonment, Rawalpindi",
      icon: "store",
    },
  ] satisfies { text: string; icon: IconName }[],
};

/** Homepage "Specialties" marquee (copy supplied by Nelson Lab & Medical Complex). */
export const specialties = {
  eyebrow: "Nelson Medical Complex",
  title: "Specialized Medical Care Across Multiple Disciplines",
  description:
    "We provide specialized healthcare services focused on accurate diagnosis, personalized treatment, and better patient well-being.",
  // `slug` is also the Specialists page filter (/specialists/?specialty=<slug>).
  items: [
    {
      slug: "rheumatology",
      name: "Rheumatology",
      icon: "bone",
      image: "/images/specialties/rheumatology.jpg",
    },
    {
      slug: "allergy-immunology",
      name: "Allergy & Immunology",
      icon: "shield-plus",
      image: "/images/specialties/allergy-immunology.jpg",
    },
    {
      slug: "nutrition",
      name: "Nutrition",
      icon: "apple",
      image: "/images/specialties/nutrition.jpg",
    },
    {
      slug: "cardiology",
      name: "Cardiology",
      icon: "heart-pulse",
      image: "/images/specialties/cardiology.jpg",
    },
    {
      slug: "dermatology",
      name: "Dermatology",
      icon: "scan-face",
      image: "/images/specialties/dermatology.webp",
    },
    {
      slug: "endocrinology",
      name: "Endocrinology",
      icon: "droplets",
      image: "/images/specialties/endocrinology.jpg",
    },
  ] satisfies Specialty[],
};

/** Specialists page (/specialists/). */
export const specialistsPage = {
  eyebrow: "Our Specialists",
  title: "Find the right specialist for you",
  description:
    "Browse our specialists by discipline, view their qualifications and experience, and contact your preferred doctor directly to arrange an appointment.",
};

/**
 * Homepage "Meet Our Specialized Doctors" carousel (copy supplied by Nelson Lab & Medical Complex). */
export const specialists = {
  eyebrow: "Nelson Medical Complex",
  title: "Meet Our Specialized Doctors",
  description:
    "Meet our experienced medical specialists, dedicated to providing expert care, accurate diagnosis, and personalized treatment for your health and well-being.",
  doctors: [
    // Shown first in the carousel.
    {
      slug: "dr-shahid-mahmud",
      name: "Brig. (R) Prof. Dr. Shahid Mahmud",
      headline: "Child Specialist, Paediatric Neurologist",
      photo: "/images/doctors/dr-shahid-mahmud.webp",
      qualifications: [
        "MBBS",
        "MRCPI (IE)",
        "MRCPCH (UK)",
        "FCPS (Paeds)",
        "FRCP (Glasgow)",
        "FRCPI (IE)",
        "FRCP (Edin)",
        "FRCPH (UK)",
        "Fellowship in Neonatal Medicine (UK)",
        "Fellowship in Paediatric Neurology (UK)",
      ],
      roles: [
        "Consultant Neonatologist & Paeds Neurologist, Pak Emirates Hospital, Rawalpindi",
        "Professor of Paediatrics, Army Medical College",
      ],
      phone: { display: "0300-5197469", tel: "+923005197469" },
    },
    {
      slug: "dr-fayyaz-hassan",
      name: "Brig.(R) Dr. Fayyaz Hassan",
      headline: "Associate Professor of Medicine",
      photo: "/images/doctors/dr-fayyaz-hassan.webp",
      qualifications: ["FCPS (Medicine)", "FCPS (Gastroenterology)"],
      roles: [
        "Consultant Medical Specialist",
        "Consultant Gastroenterologist & Hepatologist",
        "Ex-Head of Gastroenterology Department, CMH Rawalpindi",
      ],
      phone: { display: "0311-7756728", tel: "+923117756728" },
    },
    {
      slug: "dr-fartash-sarwar",
      name: "Dr. Fartash Sarwar",
      headline: "M.B.B.S, F.C.P.S (Urology)",
      photo: "/images/doctors/dr-fartash-sarwar.webp",
      qualifications: ["M.B.B.S", "F.C.P.S (Urology)"],
      roles: ["Consultant Urologist, Andrologist and Transplant Surgeon"],
      phone: { display: "0333-5130780", tel: "+923335130780" },
    },
    {
      slug: "dr-sadaf-nasir",
      name: "Dr. Sadaf Nasir",
      headline: "Consultant Neurophysician",
      photo: "/images/doctors/dr-sadaf-nasir.webp",
      qualifications: ["MBBS", "FCPS (Neurology)", "CHPE (NUST)"],
      roles: [
        "Associate Professor of Neurology at Federal Government Polyclinic PGMI Hospital, NSHS (NUST) Islamabad",
      ],
      about:
        "Specialist in Neurological, Spinal, Nerve & Muscle Disorders with special interest in pregnancy and neurological disorders.",
      phone: { display: "0310-8678617", tel: "+923108678617" },
    },
    {
      slug: "dr-amer-sabih-hydri",
      name: "Prof Brig. Dr. Amer Sabih Hydri (R)",
      headline: "ENT Specialist, Head & Neck Surgeon",
      photo: "/images/doctors/dr-amer-sabih-hydri.webp",
      qualifications: ["MBBS", "PGDLO", "MCPS", "FCPS"],
      roles: [
        "ENT Specialist, Head & Neck Surgeon",
        "Professor of ENT, Fazaia Medical College, Islamabad",
      ],
      phone: { display: "0336-5203286", tel: "+923365203286" },
    },
    {
      slug: "dr-sarfraz-ali-zahid",
      name: "Professor Brig. (R) Sarfraz Ali Zahid SI(M)",
      headline: "Professor of Medicine / Cardiology",
      photo: "/images/doctors/dr-sarfraz-ali-zahid.webp",
      qualifications: [
        "MBBS",
        "FCPS (Medicine)",
        "FCPS (Cardiology)",
        "FACP (USA)",
        "MASE (USA)",
      ],
      roles: [
        "Ex Professor of Medicine / Cardiology, AFIC/NIHD Army Medical College Rawalpindi",
      ],
      specialties: ["cardiology"],
      phone: { display: "0341-3721914", tel: "+923413721914" },
    },
  ] satisfies Specialist[],
};

/** Homepage "Nelson Pharmacy" logo carousel shown above the footer. Logo images include their captions. */
export const pharmacyPanel = {
  eyebrow: "Nelson Pharmacy",
  title: "Registered Chemist",
  description:
    "Nelson Pharmacy is a registered chemist for the following organisations.",
  organisations: [
    { name: "State Life of Pakistan", logo: "/images/panel/state-life.png" },
    {
      name: "Ministry of Defence - Rawalpindi",
      logo: "/images/panel/ministry-of-defence.png",
    },
    { name: "Oil & Gas Development Company", logo: "/images/panel/ogdcl.png" },
    {
      name: "Cantonment General Hospital - RWP",
      logo: "/images/panel/cantonment-general-hospital.png",
    },
    {
      name: "Medical Social Services Unit",
      logo: "/images/panel/medical-social-services.png",
    },
    {
      name: "Pakistan Oil Fields Limited",
      logo: "/images/panel/pakistan-oilfields.png",
    },
    {
      name: "Pearl Continental - Rawalpindi",
      logo: "/images/panel/pearl-continental.png",
    },
  ],
};

export const aboutIntro = {
  title:
    "A local facility built around careful testing and clear communication",
  paragraphs: [
    "Nelson Lab & Medical Complex offers laboratory testing and medical services in a single, patient-focused facility.",
    "We aim to make every visit straightforward: clear information before you arrive, respectful care while you are with us, and practical guidance on receiving your report.",
  ],
};

export const mission = {
  title: "Our mission",
  text: "To provide accessible laboratory and medical services delivered with care, accuracy and respect for every patient.",
};

export const vision = {
  title: "Our vision",
  text: "To be a trusted healthcare partner for patients, families and referring clinicians in our community.",
};

export const values: Feature[] = [
  {
    title: "Patient respect",
    description:
      "We treat every patient with courtesy, patience and respect for their privacy.",
    icon: "hand-heart",
  },
  {
    title: "Careful practice",
    description:
      "We follow careful procedures for sample collection, labelling and handling.",
    icon: "shield",
  },
  {
    title: "Clear communication",
    description:
      "We explain processes in plain language and answer questions before every test.",
    icon: "message",
  },
  {
    title: "Confidentiality",
    description: "Personal and medical information is handled with discretion.",
    icon: "badge-check",
  },
];

export const whyChooseUs: Feature[] = [
  {
    title: "Testing and consultations in one place",
    description:
      "Laboratory services and medical consultations under one roof, helping to simplify your visit.",
    icon: "building",
  },
  {
    title: "Guidance before you arrive",
    description:
      "Our team confirms timing and any preparation that applies to your test in advance.",
    icon: "list-checks",
  },
  {
    title: "A calm, private setting",
    description:
      "Samples are collected in a clean, private environment by trained staff.",
    icon: "shield",
  },
  {
    title: "Support with your reports",
    description:
      "We explain how and when to receive your report so you know what to expect.",
    icon: "file-text",
  },
];

export const qualityApproach = {
  title: "Our approach to quality and safety",
  paragraphs: [
    "We are committed to careful practice at every step — from patient identification and sample labelling to handling, testing and reporting.",
    "Details of quality-control procedures, external quality assessment participation and any accreditation will be published here once confirmed.",
  ],
  points: [
    "Patient identity checked before sample collection",
    "Samples labelled and handled following documented procedures",
    "Reports issued through controlled channels",
    "Personal information handled confidentially",
  ],
};

/** "Your Visit" steps shown on the homepage and Medical Services page. */
export const patientJourney: Feature[] = [
  {
    title: "Contact us",
    description: "Call reception or send an inquiry to tell us which test or consultation you need.",
    icon: "phone",
  },
  {
    title: "Prepare",
    description: "We confirm timing and any preparation that applies to your test before you visit.",
    icon: "list-checks",
  },
  {
    title: "Visit",
    description: "Register at reception, then have your sample collected or attend your consultation.",
    icon: "building",
  },
  {
    title: "Receive your report",
    description: "Collect your report as advised and review the results with your doctor.",
    icon: "file-text",
  },
];

export const facilityHighlights: Feature[] = [
  {
    title: "Reception & registration",
    description:
      "A welcoming reception where our team registers your visit and answers your questions.",
    icon: "users",
  },
  {
    title: "Sample collection area",
    description: "A clean, private space for blood and sample collection.",
    icon: "syringe",
  },
  {
    title: "Laboratory",
    description:
      "Where samples are processed and analysed by laboratory staff.",
    icon: "microscope",
  },
  {
    title: "Consultation rooms",
    description: "Private rooms for consultations with clinicians.",
    icon: "stethoscope",
  },
];
