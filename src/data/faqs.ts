import type { FaqCategory, FaqItem } from "@/types";

/**
 * Frequently asked questions.
 *
 * Answers are written so they do not state facility policies that have not
 * been confirmed. Replace with the facility's confirmed answers and set
 * `status` to "verified".
 */
export const faqCategories: FaqCategory[] = [
  { id: "appointments", name: "Appointments & Visits" },
  { id: "testing", name: "Laboratory Testing" },
  { id: "reports", name: "Reports & Results" },
];

export const faqs: FaqItem[] = [
  {
    id: "do-i-need-an-appointment",
    categoryId: "appointments",
    question: "Do I need an appointment?",
    answer: [
      "Please contact our team before your visit. We will let you know whether an appointment is needed for your test or consultation and suggest a suitable time.",
    ],
    status: "sample",
  },
  {
    id: "what-to-bring",
    categoryId: "appointments",
    question: "What should I bring to my visit?",
    answer: [
      "We recommend bringing a valid photo ID, your doctor's request form or prescription (if you have one) and any previous reports that may be relevant.",
    ],
    status: "sample",
  },
  {
    id: "online-booking-confirmation",
    categoryId: "appointments",
    question: "Does submitting the online form confirm my appointment?",
    answer: [
      "No. The online form sends an inquiry to our team. Your appointment is only confirmed once a member of our team contacts you directly.",
    ],
    status: "verified",
  },
  {
    id: "test-preparation",
    categoryId: "testing",
    question: "Do I need to prepare for my test?",
    answer: [
      "Some tests require preparation, such as fasting, while many do not. Preparation depends on the specific test, so please contact our team before your visit and follow any instructions from your doctor.",
    ],
    status: "sample",
  },
  {
    id: "doctor-request",
    categoryId: "testing",
    question: "Do I need a doctor's request to have a test?",
    answer: [
      "Please contact our team to discuss your requirements. Where you have a request form from your doctor, bring it with you so we can process the correct tests.",
    ],
    status: "sample",
  },
  {
    id: "report-timing",
    categoryId: "reports",
    question: "When will my report be ready?",
    answer: [
      "Reporting times vary between tests. Our team will tell you when to expect your report at the time your sample is collected.",
    ],
    status: "sample",
  },
  {
    id: "interpreting-results",
    categoryId: "reports",
    question: "Can the laboratory explain what my results mean?",
    answer: [
      "Laboratory results should be interpreted by your doctor, who can consider them alongside your symptoms and medical history. Our team can help with administrative questions about your report.",
    ],
    status: "verified",
  },
];

/** A shorter selection for the homepage. */
export const featuredFaqIds = [
  "do-i-need-an-appointment",
  "what-to-bring",
  "test-preparation",
  "report-timing",
  "online-booking-confirmation",
];

export const featuredFaqs = featuredFaqIds
  .map((id) => faqs.find((faq) => faq.id === id))
  .filter((faq): faq is FaqItem => Boolean(faq));

/** Questions for the Laboratory Services page (tests, scans and procedures). Keep to five. */
export const labFaqs: FaqItem[] = [
  {
    id: "lab-doctor-request",
    categoryId: "testing",
    question: "Do I need a doctor's request for a test or scan?",
    answer: [
      "Please bring your doctor's request form or prescription if you have one, so we can carry out exactly the tests or scans your doctor has asked for.",
      "If you don't have a request, contact our team before your visit and we will let you know what is needed for the test or scan you are interested in.",
    ],
    status: "sample",
  },
  {
    id: "lab-preparation",
    categoryId: "testing",
    question: "How should I prepare for my test or scan?",
    answer: [
      "It depends on the test. Some blood tests, such as fasting glucose or a lipid profile, may need fasting; some ultrasound scans need a full bladder; and barium studies usually need special preparation. Many tests need no preparation at all.",
      "Please contact our team before your visit so we can confirm what applies to you, and tell us if you are or might be pregnant before any X-ray, CT or contrast study.",
    ],
    status: "sample",
  },
  {
    id: "lab-mri-safety",
    categoryId: "testing",
    question: "Can I have an MRI if I have metal implants or a pacemaker?",
    answer: [
      "MRI uses a strong magnetic field, so some pacemakers, implants and metal fragments are not safe in the scanner. Please tell our team about any implants, devices or previous surgery before your appointment so we can check whether the scan is suitable.",
      "If you feel anxious in enclosed spaces, our open MRI is open at the sides, which many patients find more comfortable.",
    ],
    status: "sample",
  },
  {
    id: "lab-pcr-vs-serology",
    categoryId: "testing",
    question: "What is the difference between PCR and serology tests?",
    answer: [
      "A PCR test looks for the genetic material (DNA or RNA) of a virus or other organism, so it can show whether the organism itself is present in your sample.",
      "A serology test looks for antibodies or antigens in your blood, which can show whether your body has been exposed to an infection or is responding to one. Your doctor will decide which test is right for you.",
    ],
    status: "sample",
  },
  {
    id: "lab-results",
    categoryId: "reports",
    question: "When will my results be ready, and who explains them?",
    answer: [
      "Reporting times vary between tests and scans. Our team will tell you when to expect your report when your sample is collected or your scan is done.",
      "Your results should be interpreted by your doctor, who can consider them alongside your symptoms and medical history.",
    ],
    status: "sample",
  },
];
