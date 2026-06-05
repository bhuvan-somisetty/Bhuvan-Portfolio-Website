import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface Project {
  name: string;
  category: string;
  about: string;
  image: string;
  techStack: string[];
  link?: string;
}

const projects: Project[] = [
  {
    name: "ClubSphere",
    category: "Campus Management Platform",
    about:
      "A campus club management system for managing clubs, events, announcements, attendance, and QR-based event check-ins.",
    image: "/images/01_clubsphere_card.jpg",
    techStack: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
  },
  {
    name: "AlphaGuard AI",
    category: "AI Safety Platform",
    about:
      "An AI-powered safety platform focused on smart monitoring, behavior insights, alerts, and parent dashboard controls.",
    image: "/images/02_alphaguard_card.jpg",
    techStack: ["Python", "FastAPI", "React", "Tailwind CSS", "OpenAI API"],
  },
  {
    name: "QR Complaint & Feedback System",
    category: "Hostel & Mess Utility",
    about:
      "A QR-based feedback system that helps students submit hostel and mess complaints with category-wise tracking and admin review.",
    image: "/images/03_qr_feedback_card.jpg",
    techStack: ["React", "Node.js", "Express", "MySQL", "Tailwind CSS"],
  },
  {
    name: "Open Source Contributions",
    category: "SDK & Developer Tools",
    about:
      "Contribution work across Hiero SDK, Harbor Satellite, and Jaeger UI involving pull requests, documentation, workflows, API design, and developer experience.",
    image: "/images/04_open_source_card.jpg",
    techStack: ["GitHub Actions", "Go", "TypeScript", "Jaeger UI"],
  },
  {
    name: "Alarm & Reminder API System",
    category: "Python Backend Project",
    about:
      "A Python-based reminder and alarm system built with backend logic, recurring schedules, API-style structure, and modular task management.",
    image: "/images/04_alarm_api_card.jpg",
    techStack: ["Python", "FastAPI", "SQLite", "Celery", "Redis"],
  },
  {
    name: "Nexaris",
    category: "Modern E-Commerce Storefront",
    about:
      "A premium next-generation shopping platform featuring real-time product search, dark-themed responsive design, and modular checkout flows.",
    image: "/images/06_nexaris_card.webp",
    techStack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Redux Toolkit"],
  },
  {
    name: "ResumeIQ Analyzer",
    category: "AI Resume Parser & Optimizer",
    about:
      "An intelligent platform that analyzes resumes against job descriptions, calculating instant ATS scores and providing recruiter-grade AI rewrites.",
    image: "/images/07_resumeiq_card.webp",
    techStack: ["React", "TypeScript", "Python", "FastAPI", "OpenAI API"],
  },
  {
    name: "MovieApp Final",
    category: "Mobile Movie Discovery Platform",
    about:
      "A cross-platform mobile application utilizing TMDB API to discover, search, and explore movies with a premium dark-themed UI and detailed cast information.",
    image: "/images/08_movieapp_card.webp",
    techStack: ["React Native", "Expo", "JavaScript", "TMDB API"],
  },
];

const Work = () => {
  useGSAP(() => {
    let translateX = 0;

    function calcTranslateX() {
      const boxes = document.getElementsByClassName("work-box");
      if (!boxes.length) return 0;
      const rectLeft = document
        .querySelector(".work-container")!
        .getBoundingClientRect().left;
      const rect = boxes[0].getBoundingClientRect();
      const parentWidth =
        boxes[0].parentElement!.getBoundingClientRect().width;
      const padding =
        parseInt(window.getComputedStyle(boxes[0]).padding) / 2;

      // Natural distance to show Card 05 fully.
      // Work's z-index:20 background visually covers Tech Stack during pin.
      const base =
        rect.width * boxes.length - (rectLeft + parentWidth) + padding;
      return base;
    }

    function paintSpacer(self: ScrollTrigger) {
      const spacer = (self.pin as HTMLElement)?.parentElement;
      if (spacer?.classList.contains("gsap-pin-spacer")) {
        spacer.style.backgroundColor = "#0b080c";
        spacer.style.zIndex = "20";
      }
    }

    function buildAnimation() {
      // Kill any existing instance before rebuilding
      ScrollTrigger.getById("work")?.kill(true);

      translateX = calcTranslateX();
      if (!translateX) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".work-section",
          start: "top top",
          end: `+=${translateX}`,
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          id: "work",
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          onInit: paintSpacer,
          onRefresh: paintSpacer,
        },
      });

      tl.to(".work-flex", { x: -translateX, ease: "power1.inOut" });
    }

    // Build once immediately (pre-image sizes)
    buildAnimation();

    // Rebuild after ALL images in the work section have loaded so card
    // dimensions are correct and the pin-end is recalculated accurately
    const imgs = Array.from(
      document.querySelectorAll<HTMLImageElement>(".work-image img")
    );

    let pending = imgs.filter((img) => !img.complete).length;

    if (pending === 0) {
      // All images already cached — just refresh triggers
      ScrollTrigger.refresh();
    } else {
      const onLoad = () => {
        pending--;
        if (pending <= 0) {
          buildAnimation();
          ScrollTrigger.refresh();
        }
      };
      imgs.forEach((img) => {
        if (!img.complete) {
          img.addEventListener("load", onLoad, { once: true });
          img.addEventListener("error", onLoad, { once: true });
        }
      });
    }

    // Safety net: always refresh 600 ms after mount in case load events
    // already fired before we attached listeners
    const safety = setTimeout(() => {
      buildAnimation();
      ScrollTrigger.refresh();
    }, 600);

    return () => {
      clearTimeout(safety);
      ScrollTrigger.getById("work")?.kill(true);
    };
  }, []);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>My <span>Work</span></h2>
        <div className="work-flex">
          {projects.map((proj, index) => (
            <div className="work-box" key={index}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>
                  <div>
                    <h4>{proj.name}</h4>
                    <p>{proj.category}</p>
                  </div>
                </div>
                <h4>About Project</h4>
                <p>{proj.about}</p>

                {proj.techStack && (
                  <div className="work-tech-stack" style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "12px" }}>
                    {proj.techStack.map((tech) => (
                      <span key={tech} style={{ fontSize: "11px", fontWeight: 300, color: "var(--accentColor)", background: "rgba(194, 164, 255, 0.08)", border: "1px solid rgba(194, 164, 255, 0.15)", padding: "3px 8px", borderRadius: "4px" }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                {proj.link && (
                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="live-demo-btn"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      marginTop: "16px",
                      padding: "8px 16px",
                      background: "rgba(194, 164, 255, 0.08)",
                      border: "1px solid rgba(194, 164, 255, 0.25)",
                      color: "#ffffff",
                      borderRadius: "6px",
                      fontSize: "12px",
                      fontWeight: 500,
                      cursor: "pointer",
                      textDecoration: "none",
                      transition: "all 0.25s ease",
                      width: "fit-content"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "var(--accentColor)";
                      e.currentTarget.style.color = "#0b080c";
                      e.currentTarget.style.borderColor = "var(--accentColor)";
                      e.currentTarget.style.boxShadow = "0 5px 15px rgba(194, 164, 255, 0.35)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(194, 164, 255, 0.08)";
                      e.currentTarget.style.color = "#ffffff";
                      e.currentTarget.style.borderColor = "rgba(194, 164, 255, 0.25)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                    Live Demo
                  </a>
                )}
              </div>
              <WorkImage image={proj.image ?? "/images/placeholder.webp"} alt={proj.name} link={proj.link} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
