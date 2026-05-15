import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const projects = [
  {
    name: "ClubSphere",
    category: "Campus Management Platform",
    about:
      "A campus club management system for managing clubs, events, announcements, attendance, and QR-based event check-ins.",
    image: "/images/01_clubsphere_card.jpg",
  },
  {
    name: "AlphaGuard AI",
    category: "AI Safety Platform",
    about:
      "An AI-powered safety platform focused on smart monitoring, behavior insights, alerts, and parent dashboard controls.",
    image: "/images/02_alphaguard_card.jpg",
  },
  {
    name: "QR Complaint & Feedback System",
    category: "Hostel & Mess Utility",
    about:
      "A QR-based feedback system that helps students submit hostel and mess complaints with category-wise tracking and admin review.",
    image: "/images/03_qr_feedback_card.jpg",
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

      // Base distance + one full card-width buffer so card 05 is completely
      // in view before the pin releases
      return (
        rect.width * boxes.length -
        (rectLeft + parentWidth) +
        padding +
        rect.width
      );
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
          // @ts-ignore — onInit exists at runtime but not in these TS types
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
              </div>
              <WorkImage image={proj.image ?? "/images/placeholder.webp"} alt={proj.name} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
