import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { smoother } from "./Navbar";
import "./styles/Experience.css";

interface Internship {
  company: string;
  role: string;
  duration: string;
  bullets: string[];
  logo: React.ReactNode;
  offerLetterPages: string[];
}

interface OfferLetterModalProps {
  company: string;
  pages: string[];
  currentPageIndex: number;
  onClose: () => void;
  onNextPage: () => void;
  onPrevPage: () => void;
  onDownload: () => void;
}

const OfferLetterModal = ({
  company,
  pages,
  currentPageIndex,
  onClose,
  onNextPage,
  onPrevPage,
  onDownload,
}: OfferLetterModalProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    if (smoother) {
      smoother.paused(true);
    }
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (smoother) {
        smoother.paused(false);
      }
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      className="offer-modal-content"
      style={{
        background: "rgba(20, 15, 25, 0.85)",
        border: "1px solid rgba(194, 164, 255, 0.25)",
        borderRadius: "20px",
        width: "90vw",
        maxWidth: "950px",
        height: "85vh",
        maxHeight: "85vh",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 25px 60px rgba(0, 0, 0, 0.8), 0 0 50px rgba(160, 100, 255, 0.15)",
        overflow: "hidden",
        boxSizing: "border-box",
      }}
      initial={{ scale: 0.92, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.92, opacity: 0 }}
      transition={{ type: "spring", duration: 0.45 }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div
        className="offer-modal-header"
        style={{
          padding: "18px 25px",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "rgba(15, 10, 20, 0.3)",
        }}
      >
        <h3 style={{ margin: 0, fontSize: "18px", color: "#ffffff", fontWeight: 600 }}>
          {company} - Offer Letter
        </h3>
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <button
            onClick={onDownload}
            className="toolbar-btn download-btn"
            title="Download Document"
            aria-label="Download Document"
            style={{
              padding: "6px 12px",
              fontSize: "12px",
              background: "rgba(194, 164, 255, 0.1)",
              border: "1px solid rgba(194, 164, 255, 0.25)",
              color: "#ffffff",
              borderRadius: "6px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "4px",
              fontWeight: 500,
              transition: "all 0.2s ease",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Download
          </button>
          <button
            className="offer-modal-close-btn"
            onClick={onClose}
            aria-label="Close modal"
            style={{
              background: "transparent",
              border: "none",
              color: "rgba(255, 255, 255, 0.5)",
              fontSize: "28px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "color 0.2s ease",
              lineHeight: 1,
              padding: "0 5px",
            }}
          >
            &times;
          </button>
        </div>
      </div>

      {/* Body */}
      <div
        className="offer-modal-body"
        style={{
          padding: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(0, 0, 0, 0.4)",
          flexGrow: 1,
          overflow: "hidden",
          boxSizing: "border-box",
        }}
      >
        <img
          src={pages[currentPageIndex]}
          alt={`${company} Offer Letter - Page ${currentPageIndex + 1}`}
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            width: "auto",
            height: "auto",
            objectFit: "contain",
            display: "block",
          }}
        />
      </div>

      {/* Footer (with pagination controls if multi-page) */}
      <div
        className="offer-modal-footer"
        style={{
          padding: "18px 25px",
          borderTop: "1px solid rgba(255, 255, 255, 0.08)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "rgba(15, 10, 20, 0.6)",
        }}
      >
        <div className="offer-modal-page-info" style={{ fontSize: "14px", color: "rgba(255, 255, 255, 0.5)" }}>
          {pages.length > 1 ? (
            `Page ${currentPageIndex + 1} of ${pages.length}`
          ) : (
            "Single-page Document"
          )}
        </div>

        {pages.length > 1 && (
          <div className="offer-modal-nav-btns" style={{ display: "flex", gap: "12px" }}>
            <button
              className="offer-modal-nav-btn"
              onClick={onPrevPage}
              disabled={currentPageIndex === 0}
              aria-label="Previous Page"
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                color: "#ffffff",
                padding: "8px 16px",
                borderRadius: "6px",
                fontSize: "13px",
                fontWeight: 500,
                cursor: currentPageIndex === 0 ? "not-allowed" : "pointer",
                opacity: currentPageIndex === 0 ? 0.3 : 1,
                transition: "all 0.2s ease",
              }}
            >
              Previous
            </button>
            <button
              className="offer-modal-nav-btn"
              onClick={onNextPage}
              disabled={currentPageIndex === pages.length - 1}
              aria-label="Next Page"
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                color: "#ffffff",
                padding: "8px 16px",
                borderRadius: "6px",
                fontSize: "13px",
                fontWeight: 500,
                cursor: currentPageIndex === pages.length - 1 ? "not-allowed" : "pointer",
                opacity: currentPageIndex === pages.length - 1 ? 0.3 : 1,
                transition: "all 0.2s ease",
              }}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

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

  const LabmentixLogo = (
    <svg width="34" height="34" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="labmentix-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
      </defs>
      <path d="M16 4C19.3137 4 22 6.68629 22 10C22 13.3137 19.3137 16 16 16C12.6863 16 10 13.3137 10 10C10 6.68629 12.6863 4 16 4Z" fill="url(#labmentix-grad)" opacity="0.8" />
      <path d="M16 16C19.3137 16 22 18.6863 22 22C22 25.3137 19.3137 28 16 28C12.6863 28 10 25.3137 10 22C10 18.6863 12.6863 16 16 16Z" fill="url(#labmentix-grad)" opacity="0.8" />
      <path d="M10 16C10 12.6863 12.6863 10 16 10C19.3137 10 22 12.6863 22 16C22 19.3137 19.3137 22 16 22C12.6863 22 10 19.3137 10 16Z" fill="url(#labmentix-grad)" />
    </svg>
  );

  const AkiyamLogo = (
    <svg width="34" height="34" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="akiyam-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#ef4444" />
        </linearGradient>
      </defs>
      <path d="M8 24L16 8L24 24" stroke="url(#akiyam-grad)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 16H20" stroke="url(#akiyam-grad)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  const internships: Internship[] = [
    {
      company: "NeoNexus Innovations LLP",
      role: "Software Development Intern",
      duration: "June 2026 – Present",
      logo: NeoNexusLogo,
      bullets: [
        "Collaborating on the development of scalable web applications using React, TypeScript, and Node.js.",
        "Enhancing user experiences by implementing responsive layouts, smooth transitions, and premium modern UI components.",
        "Optimizing application loading times and API response handling, improving overall application performance by 25%.",
        "Participating in code reviews and agile methodologies to ensure clean code structure and rapid deployment cycles.",
      ],
      offerLetterPages: ["/images/offer_neonexus.png"],
    },
    {
      company: "Labmentix",
      role: "Software Development Intern",
      duration: "May 2026 – Present",
      logo: LabmentixLogo,
      bullets: [
        "Developing features for AI/ML powered platforms, integrating backend services and machine learning model predictions.",
        "Creating RESTful APIs and securing authentication workflows, ensuring robust data handling and privacy compliance.",
        "Collaborating with cross-functional teams to design database schemas and optimize query performance in MySQL/MongoDB.",
        "Deploying cloud solutions and maintaining CI/CD pipelines to guarantee stable and continuous integration of new features.",
      ],
      offerLetterPages: ["/images/offer_labmentix.png"],
    },
    {
      company: "Akiyam Solutions Pvt. Ltd.",
      role: "AI Engineer Intern",
      duration: "June 2026 – Present",
      logo: AkiyamLogo,
      bullets: [
        "Architecting and fine-tuning artificial intelligence models to solve complex real-world data analysis challenges.",
        "Designing and building intelligent data pipelines, preprocessings, and model evaluation modules in Python.",
        "Leveraging transcription factor binding sites (TFBS) or advanced machine learning libraries to analyze genomic datasets.",
        "Contributing to the production deployment of AI agents and maintaining high-performance inference services.",
      ],
      offerLetterPages: ["/images/offer_akiyam_1.png", "/images/offer_akiyam_2.png"],
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
          Hands-on industry experience across software development, AI engineering, open-source collaboration, and real-world product development.
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

      {/* Offer Letter Lightbox Modal rendered via Portal outside layout transforms */}
      {createPortal(
        <AnimatePresence>
          {modalState.isOpen && (
            <motion.div
              key="offer-modal-overlay"
              className="offer-modal-overlay"
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                backgroundColor: "rgba(5, 3, 6, 0.9)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                zIndex: 999999,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
            >
              <OfferLetterModal
                company={modalState.company}
                pages={modalState.pages}
                currentPageIndex={modalState.currentPageIndex}
                onClose={closeModal}
                onNextPage={nextPage}
                onPrevPage={prevPage}
                onDownload={handleDownload}
              />
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
};

export default Experience;
