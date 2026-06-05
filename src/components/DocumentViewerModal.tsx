import { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./styles/Experience.css";

interface DocumentViewerModalProps {
  isOpen: boolean;
  title: string;
  subtitle?: string;
  pages: string[];
  currentPageIndex: number;
  onClose: () => void;
  onNextPage?: () => void;
  onPrevPage?: () => void;
  onDownload: () => void;
}
const DocumentViewerModal = ({
  isOpen,
  title,
  subtitle,
  pages,
  currentPageIndex,
  onClose,
  onNextPage,
  onPrevPage,
  onDownload,
}: DocumentViewerModalProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="document-modal-overlay"
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
          onClick={onClose}
        >
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
                {title}
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
                overflowY: "auto",
                overflowX: "hidden",
                boxSizing: "border-box",
              }}
            >
              <img
                src={pages[currentPageIndex]}
                alt={`${title} - Page ${currentPageIndex + 1}`}
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

            {/* Footer */}
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
                {subtitle || (pages.length > 1 ? `Page ${currentPageIndex + 1} of ${pages.length}` : "Single-page Document")}
              </div>

              {pages.length > 1 && onNextPage && onPrevPage && (
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
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default DocumentViewerModal;
