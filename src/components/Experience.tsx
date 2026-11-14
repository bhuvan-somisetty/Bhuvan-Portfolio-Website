import { useState } from "react";
import { motion } from "framer-motion";
import "./styles/Experience.css";
import DocumentViewerModal from "./DocumentViewerModal";

interface Internship {
  company: string;
  role: string;
  duration: string;
  bullets: string[];
  logo: React.ReactNode;
  offerLetterPages: string[];
}


const Experience = () => {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    company: string;
    pages: string[];
    currentPageIndex: number;
  }>({
    isOpen: false,
    company: "",
    pages: [],
    currentPageIndex: 0,
  });


  const openModal = (internship: Internship) => {
    setModalState({
      isOpen: true,
      company: internship.company,
      pages: internship.offerLetterPages,
      currentPageIndex: 0,
    });
  };

  const closeModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };

  const nextPage = () => {
    if (modalState.currentPageIndex < modalState.pages.length - 1) {
      setModalState((prev) => ({
        ...prev,
        currentPageIndex: prev.currentPageIndex + 1,
      }));
    }
  };

  const prevPage = () => {
    if (modalState.currentPageIndex > 0) {
      setModalState((prev) => ({
        ...prev,
        currentPageIndex: prev.currentPageIndex - 1,
      }));
    }
  };

  const handleDownload = () => {
    const currentImage = modalState.pages[modalState.currentPageIndex];
    const link = document.createElement("a");
    link.href = currentImage;
    const ext = currentImage.split('.').pop() || 'png';
    link.download = `${modalState.company.replace(/[\s.]+/g, "_")}_Offer_Letter_Page_${modalState.currentPageIndex + 1}.${ext}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  // Sleek SVG Logos
  const NeoNexusLogo = (
    <svg width="34" height="34" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="neonexus-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
      <circle cx="16" cy="16" r="14" stroke="url(#neonexus-grad)" strokeWidth="2.5" />
      <path d="M10 22V10L16 16L22 10V22" stroke="url(#neonexus-grad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  const internships: Internship[] = [
    {
      company: "NeoNexus Innovations LLP",
      role: "Software Development Intern",
      duration: "June 2026 – September 2026 · 3 months",
      logo: NeoNexusLogo,
      bullets: [
        "Collaborated on the development of scalable web applications using React, TypeScript, and Node.js.",
        "Enhanced user experiences by implementing responsive layouts, smooth transitions, and premium modern UI components.",
        "Optimized application loading times and API response handling, improving overall application performance by 25%.",
        "Participated in code reviews and agile methodologies to ensure clean code structure and rapid deployment cycles.",
      ],
      offerLetterPages: ["/images/offer_neonexus.png"],
    },
  ];

  return (
    <div className="experience-section section-container" id="experience">
      <div className="experience-container">
        {/* Section Header */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Professional <span>Experience</span>
        </motion.h2>

        <motion.p
          className="experience-description"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
        >
          Industry experience building scalable web applications and shipping production-ready features.
        </motion.p>

        {/* Experience Grid */}
        <div className="experience-grid">
          {internships.map((internship, index) => (
            <motion.div
              key={internship.company}
              className="experience-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.15 }}
            >
              <div>
                <div className="experience-card-header">
                  <div className="experience-logo-wrapper">{internship.logo}</div>
                  <div className="experience-title-info">
                    <h3>{internship.company}</h3>
                    <h4>{internship.role}</h4>
                  </div>
                </div>

                <span className="experience-duration">{internship.duration}</span>

                <ul className="experience-bullets">
                  {internship.bullets.map((bullet, idx) => (
                    <li key={idx}>{bullet}</li>
                  ))}
                </ul>
              </div>

              <div className="experience-action-wrapper">
                <button
                  className="experience-btn"
                  onClick={() => openModal(internship)}
                  aria-label={`View Offer Letter for ${internship.company}`}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "4px" }}>
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                  View Offer Letter
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <DocumentViewerModal
        isOpen={modalState.isOpen}
        title={`${modalState.company} - Offer Letter`}
        pages={modalState.pages}
        currentPageIndex={modalState.currentPageIndex}
        onClose={closeModal}
        onNextPage={nextPage}
        onPrevPage={prevPage}
        onDownload={handleDownload}
      />
    </div>
  );
};

export default Experience;
