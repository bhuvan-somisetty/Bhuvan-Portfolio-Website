import { useEffect, useState, useCallback } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);
export let smoother: ScrollSmoother;

const NAV_ITEMS = [
  { label: "HOME",      href: "#home"       },
  { label: "ABOUT",     href: "#about"      },
  { label: "EDUCATION", href: "#education"  },
  { label: "EXPERIENCE",href: "#experience" },
  { label: "WORK",      href: "#work"       },
  { label: "TECH STACK",href: "#tech-stack" },
  { label: "CONTACT",   href: "#contact"    },
];

const SECTION_IDS = ["home","about","education","experience","work","tech-stack","contact"];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Build smoother on mount
  useEffect(() => {
    smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.7,
      effects: true,
      autoResize: true,
      ignoreMobileResize: true,
    });
    (window as any).smoother = smoother;
    smoother.scrollTop(0);
    smoother.paused(true);

    window.addEventListener("resize", () => {
      ScrollTrigger.refresh(true);
    });

    return () => {
      window.removeEventListener("resize", () => ScrollTrigger.refresh(true));
    };
  }, []);

  // Scroll handler to detect active section
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY + 120; // offset for navbar height
    let current = "home";
    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top + window.scrollY <= scrollY) {
        current = id;
      }
    }
    setActiveSection(current);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Lock/unlock body scroll when mobile menu opens
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const scrollToSection = useCallback((href: string) => {
    const target = href === "#home" ? null : href;
    if (window.innerWidth > 1024 && smoother) {
      if (!target) {
        smoother.scrollTo(0, true);
      } else {
        smoother.scrollTo(target, true, "top 90px");
      }
    } else {
      if (!target) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const el = document.querySelector(target);
        if (el) {
          const offset = 80;
          const top = el.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: "smooth" });
        }
      }
    }
    setMenuOpen(false);
  }, []);

  return (
    <>
      <div className="header">
        {/* Logo */}
        <a href="/#" className="navbar-title navbar-logo" data-cursor="disable">
          BS
        </a>

        {/* Email — hidden on tablet */}
        <a
          href="mailto:somisettybhuvan5@gmail.com"
          className="navbar-connect"
          data-cursor="disable"
        >
          somisettybhuvan5@gmail.com
        </a>

        {/* Desktop nav links */}
        <ul className="nav-links-desktop">
          {NAV_ITEMS.map(({ label, href }) => (
            <li key={href} className={activeSection === href.slice(1) ? "nav-active" : ""}>
              <a
                data-href={href}
                href={href}
                onClick={(e) => { e.preventDefault(); scrollToSection(href); }}
              >
                <HoverLinks text={label} />
              </a>
            </li>
          ))}
        </ul>

        {/* Hamburger button — visible on mobile/tablet */}
        <button
          className={`hamburger${menuOpen ? " hamburger--open" : ""}`}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className="hamburger__line" />
          <span className="hamburger__line" />
          <span className="hamburger__line" />
        </button>
      </div>

      {/* Mobile overlay */}
      {menuOpen && (
        <div
          className="mobile-menu-overlay"
          onClick={(e) => { if (e.target === e.currentTarget) setMenuOpen(false); }}
        >
          <nav className="mobile-menu-nav">
            <div className="mobile-menu-header">
              <span className="mobile-menu-brand">BS</span>
              <button
                className="mobile-menu-close"
                aria-label="Close menu"
                onClick={() => setMenuOpen(false)}
              >
                &times;
              </button>
            </div>
            <ul className="mobile-menu-list">
              {NAV_ITEMS.map(({ label, href }) => (
                <li key={href} className={activeSection === href.slice(1) ? "mobile-nav-active" : ""}>
                  <a
                    href={href}
                    onClick={(e) => { e.preventDefault(); scrollToSection(href); }}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="mailto:somisettybhuvan5@gmail.com"
              className="mobile-menu-email"
            >
              somisettybhuvan5@gmail.com
            </a>
          </nav>
        </div>
      )}

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
