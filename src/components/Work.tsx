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
  link?: string;
  buttonLabel?: string;
}

const projects: Project[] = [
  {
    name: "ClubSphere",
    category: "Campus Management Platform",
    about:
      "A campus club management system for managing clubs, events, announcements, attendance, and QR-based event check-ins.",
    image: "/images/01_clubsphere_card.jpg",
    link: "https://clubsphere-two.vercel.app/",
    buttonLabel: "Live Demo",
  },
  {
    name: "AlphaGuard AI",
    category: "AI Safety Platform",
    about:
      "An AI-powered safety platform focused on smart monitoring, behavior insights, alerts, and parent dashboard controls.",
    image: "/images/02_alphaguard_card.jpg",
    link: "https://child-shield.vercel.app",
    buttonLabel: "Live Demo",
  },
  {
    name: "QR Complaint & Feedback System",
    category: "Hostel & Mess Utility",
    about:
      "A QR-based feedback system that helps students submit hostel and mess complaints with category-wise tracking and admin review.",
    image: "/images/03_qr_feedback_card.jpg",
    link: "https://psthostel.vercel.app/",
    buttonLabel: "Live Demo",
  },
  {
    name: "Open Source Contributions",
    category: "SDK & Developer Tools",
    about:
      "Contribution work across Hiero SDK, Harbor Satellite, and Jaeger UI involving pull requests, documentation, workflows, API design, and developer experience.",
    image: "/images/04_open_source_card.jpg",
  },
  {
    name: "Alarm & Reminder API System",
    category: "Python Backend Project",
    about:
      "A Python-based reminder and alarm system built with backend logic, recurring schedules, API-style structure, and modular task management.",
    image: "/images/04_alarm_api_card.jpg",
  },
  {
    name: "Nexaris",
    category: "Modern E-Commerce Storefront",
    about:
      "A premium next-generation shopping platform featuring real-time product search, dark-themed responsive design, and modular checkout flows.",
    image: "/images/06_nexaris_card.webp",
    link: "https://nexaris-shopping.vercel.app/",
    buttonLabel: "Live Demo",
  },
  {
    name: "ResumeIQ Analyzer",
    category: "AI Resume Parser & Optimizer",
    about:
      "An intelligent platform that analyzes resumes against job descriptions, calculating instant ATS scores and providing recruiter-grade AI rewrites.",
    image: "/images/07_resumeiq_card.webp",
    link: "https://resumeiq-ai-eight.vercel.app/",
    buttonLabel: "Live Demo",
  },
  {
    name: "MovieApp Final",
    category: "Mobile Movie Discovery Platform",
    about:
      "A cross-platform mobile application utilizing TMDB API to discover, search, and explore movies with a premium dark-themed UI and detailed cast information.",
    image: "/images/08_movieapp_card.webp",
    link: "https://expo.dev/accounts/bhuvan_somisetty/projects/MovieAppFinal/builds/9f8a3db6-859e-4dfe-8648-4cdc2c24e4e5",
    buttonLabel: "Get APK",
  },
];

/* External-link SVG icon */
const ExternalLinkIcon = () => (
  <svg
    width="11"
    height="11"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

/* Download / APK icon */
const DownloadIcon = () => (
  <svg
    width="11"
    height="11"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const Work = () => {
  useGSAP(() => {
    function calcTranslateX(): number {
      const boxes = document.querySelectorAll<HTMLElement>(".work-box");
      if (!boxes.length) return 0;

      // Temporarily clear any transform to get clean, untranslated coordinates
      const flex = document.querySelector<HTMLElement>(".work-flex");
      const origTransform = flex ? flex.style.transform : "";
      if (flex) flex.style.transform = "none";

      const lastBox = boxes[boxes.length - 1];
      const lastRight = lastBox.getBoundingClientRect().right;
      const viewportW = window.innerWidth;

      if (flex) flex.style.transform = origTransform;

      return Math.max(0, lastRight - viewportW);
    }

    function paintSpacer(self: ScrollTrigger) {
      const spacer = (self.pin as HTMLElement)?.parentElement;
      if (spacer?.classList.contains("gsap-pin-spacer")) {
        spacer.style.backgroundColor = "#0b080c";
        spacer.style.zIndex = "20";
      }
    }

    console.log("[WORK] useGSAP setup: creating ScrollTrigger");
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: () => `+=${calcTranslateX()}`,
        scrub: 1,
        pin: true,
        invalidateOnRefresh: true,
        id: "work",
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        onInit: paintSpacer,
        onRefresh: paintSpacer,
      },
    });

    tl.to(".work-flex", {
      x: () => -calcTranslateX(),
      ease: "none",
    });

    // Refresh layout once all images load to ensure correct bounding box measurements
    const imgs = Array.from(
      document.querySelectorAll<HTMLImageElement>(".work-image img")
    );
    const onLoad = () => {
      console.log("[WORK] Image loaded, refreshing ScrollTrigger");
      ScrollTrigger.refresh();
    };
    imgs.forEach((img) => {
      if (!img.complete) {
        img.addEventListener("load", onLoad, { once: true });
        img.addEventListener("error", onLoad, { once: true });
      }
    });

    return () => {
      console.log("[WORK] useGSAP cleanup: destroying ScrollTrigger work and cleaning spacers");
      const trig = ScrollTrigger.getById("work");
      if (trig) {
        trig.kill(true);
      }
      tl.kill();

      // Forcefully clean up any remaining pin spacers from the DOM
      const spacers = document.querySelectorAll(".pin-spacer-work");
      spacers.forEach((spacer) => {
        const workEl = spacer.querySelector("#work");
        if (workEl && spacer.parentNode) {
          spacer.parentNode.insertBefore(workEl, spacer);
        }
        spacer.remove();
      });

      imgs.forEach((img) => {
        img.removeEventListener("load", onLoad);
        img.removeEventListener("error", onLoad);
      });
    };
  }, []);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
          <span className="work-heading-note">
            — Live Demo buttons available for deployed projects
          </span>
        </h2>
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

                {proj.link && proj.buttonLabel && (
                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="live-demo-btn"
                    aria-label={`${proj.buttonLabel} — ${proj.name}`}
                  >
                    {proj.buttonLabel === "Get APK" ? (
                      <DownloadIcon />
                    ) : (
                      <ExternalLinkIcon />
                    )}
                    {proj.buttonLabel}
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
