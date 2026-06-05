import { PropsWithChildren, useEffect, useState } from "react";
import About from "./About";
import Career from "./Career";
import Experience from "./Experience";
import Contact from "./Contact";
import Cursor from "./Cursor";
import Landing from "./Landing";
import Navbar from "./Navbar";
import SocialIcons from "./SocialIcons";
import WhatIDo from "./WhatIDo";
import Work from "./Work";
import setSplitText from "./utils/splitText";
import { initialFX } from "./utils/initialFX";

/* ─── Skill list with real CDN logos ─────────────────────────────────────── */
const SI = (i: string) => `https://skillicons.dev/icons?i=${i}`;
const DV = (name: string, variant = "original") =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name}/${name}-${variant}.svg`;

const SKILLS = [
  // Languages
  { name: "Python",         src: SI("python"),        color: "#3776ab" },
  { name: "JavaScript",     src: SI("js"),             color: "#f7df1e" },
  { name: "TypeScript",     src: SI("ts"),             color: "#3178c6" },
  { name: "HTML",           src: SI("html"),           color: "#e34c26" },
  { name: "CSS",            src: SI("css"),            color: "#1572b6" },
  { name: "PHP",            src: SI("php"),            color: "#8892bf" },
  { name: "Go",             src: SI("go"),             color: "#00add8" },
  // Frontend / Mobile
  { name: "React",          src: SI("react"),          color: "#61dafb" },
  { name: "React Native",   src: SI("react"),          color: "#61dafb" },
  { name: "Expo",           src: DV("expo","plain"),   color: "#e1e1e1" },
  // Backend
  { name: "Node.js",        src: SI("nodejs"),         color: "#339933" },
  { name: "Express.js",     src: SI("express"),        color: "#aaaaaa" },
  // Databases
  { name: "PostgreSQL",     src: SI("postgres"),       color: "#336791" },
  { name: "MySQL",          src: SI("mysql"),          color: "#4479a1" },
  { name: "MongoDB",        src: SI("mongodb"),        color: "#47a248" },
  { name: "SQL",            src: DV("azuresqldatabase","plain"), color: "#0078d4" },
  // Version Control
  { name: "Git",            src: SI("git"),            color: "#f05032" },
  { name: "GitHub",         src: SI("github"),         color: "#e1e1e1" },
  { name: "GitHub Actions", src: SI("githubactions"),  color: "#2088ff" },
  // Deployment
  { name: "Vercel",         src: SI("vercel"),         color: "#e1e1e1" },
  { name: "Render",         src: "https://images.seeklogo.com/logo-png/52/1/render-logo-png_seeklogo-525912.png", color: "#46e3b7" },
  // Auth & APIs
  { name: "REST APIs",      src: null, icon: "API",    color: "#ff6b35" },
  { name: "JWT Auth",       src: "https://jwt.io/img/logo-asset.svg", color: "#d63aff" },
  { name: "Google OAuth",   src: "https://www.gstatic.com/marketing/webpage/images/logos/googleg/googleg.svg", color: "#4285f4" },
  { name: "API Keys",       src: null, icon: "🗝️",    color: "#ec4899" },
  { name: "Bcrypt",         src: null, icon: "🔒",     color: "#7b61ff" },
  { name: "Axios",          src: "https://axios-http.com/assets/logo.svg", color: "#5a29e4" },
  // Tools
  { name: "Postman",        src: SI("postman"),        color: "#ff6c37" },
  { name: "Thunder Client", src: null, icon: "⚡",     color: "#743de0" },
  { name: "VS Code",        src: SI("vscode"),         color: "#007acc" },
  { name: "Figma",          src: SI("figma"),          color: "#f24e1e" },
  { name: "Canva",          src: DV("canva","plain"),  color: "#00c4cc" },
  // Workflow
  { name: "Pull Requests",  src: null, icon: "PR",     color: "#7b61ff" },
  { name: "Code Review",    src: null, icon: "CR",     color: "#a78bfa" },
  { name: "CI Checks",      src: SI("githubactions"),  color: "#22c55e" },
  { name: "Documentation",  src: null, icon: "📝",    color: "#94a3b8" },
];

/* ─── Bubble hover glow (pure CSS-in-JS, no class dependency) ────────────── */
const bubbleBase: React.CSSProperties = {
  width: "84px",
  height: "84px",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "28px",
  transition: "transform 0.28s cubic-bezier(.34,1.56,.64,1), box-shadow 0.28s ease",
  cursor: "default",
  userSelect: "none",
};

/* ─── Component ───────────────────────────────────────────────────────────── */
const MainContainer = ({ children }: PropsWithChildren) => {
  const [isDesktopView, setIsDesktopView] = useState<boolean>(
    window.innerWidth > 1024
  );

  useEffect(() => {
    const resizeHandler = () => {
      setSplitText();
      setIsDesktopView(window.innerWidth > 1024);
    };
    resizeHandler();
    setTimeout(() => { initialFX(); }, 100);
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, [isDesktopView]);

  return (
    <div className="container-main">
      <Cursor />
      <Navbar />
      <SocialIcons />
      {isDesktopView && children}

      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="container-main">
            <Landing>{!isDesktopView && children}</Landing>
            <About />
            <WhatIDo />
            <Career />
            <Experience />

            {/* ── My Work (5 horizontal scroll cards) ─────────────── */}
            <Work />

            {/* ── Spacer: minimal gap after Work to clear GSAP pin ── */}
            <div
              aria-hidden="true"
              style={{
                height: "20vh",
                width: "100%",
                backgroundColor: "#0b080c",
                display: "block",
              }}
            />

            {/* ── Tech Stack ──────────────────────────────────────────────── */}
            <div
              id="tech-stack"
              style={{
                width: "100%",
                minHeight: "auto",
                paddingTop: "40px",
                paddingBottom: "50px",
                paddingLeft: "6vw",
                paddingRight: "6vw",
                boxSizing: "border-box",
                backgroundColor: "#0b080c",
                borderTop: "1px solid rgba(160,100,255,0.18)",
                position: "relative",
              }}
            >
              {/* Heading */}
              <h2
                style={{
                  textAlign: "center",
                  fontSize: "clamp(56px, 8vw, 110px)",
                  fontWeight: 800,
                  margin: "0 0 18px",
                  lineHeight: 1,
                  letterSpacing: "-2px",
                  color: "#ffffff",
                  filter: "drop-shadow(0 0 50px rgba(168,85,247,0.5))",
                }}
              >
                <span style={{ color: "#ffffff" }}>Tech</span>
                <span
                  style={{
                    background: "linear-gradient(135deg, #c084fc 0%, #a855f7 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    color: "#a855f7",
                  }}
                >
                  Stack
                </span>
              </h2>

              {/* Subtitle */}
              <p
                style={{
                  textAlign: "center",
                  color: "rgba(255,255,255,0.42)",
                  fontSize: "15px",
                  margin: "0 auto 60px",
                  maxWidth: "520px",
                  lineHeight: 1.65,
                  letterSpacing: "0.3px",
                }}
              >
                Technologies, tools, and practices I use to build real-world digital products.
              </p>

              {/* Bubble grid */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  gap: "28px 22px",
                  maxWidth: "1160px",
                  margin: "0 auto",
                }}
              >
                {SKILLS.map((skill) => (
                  <div
                    key={skill.name}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "10px",
                    }}
                    title={skill.name}
                    onMouseEnter={(e) => {
                      const bubble = e.currentTarget.querySelector(".ts-bubble") as HTMLElement;
                      if (bubble) {
                        bubble.style.transform = "scale(1.15) translateY(-4px)";
                        bubble.style.boxShadow = `0 0 20px ${skill.color}55, 0 0 50px ${skill.color}22`;
                        bubble.style.background = `${skill.color}18`;
                        bubble.style.borderColor = `${skill.color}88`;
                      }
                    }}
                    onMouseLeave={(e) => {
                      const bubble = e.currentTarget.querySelector(".ts-bubble") as HTMLElement;
                      if (bubble) {
                        bubble.style.transform = "";
                        bubble.style.boxShadow = "";
                        bubble.style.background = "rgba(255,255,255,0.04)";
                        bubble.style.borderColor = `${skill.color}33`;
                      }
                    }}
                  >
                    {/* Circle bubble — uses real logo if available */}
                    <div
                      className="ts-bubble"
                      style={{
                        ...bubbleBase,
                        background: "rgba(255,255,255,0.04)",
                        border: `1.5px solid ${skill.color}33`,
                      }}
                    >
                      {skill.src ? (
                        <img
                          src={skill.src}
                          alt={skill.name}
                          style={{ width: 46, height: 46, objectFit: "contain" }}
                          onError={(e) => {
                            // If CDN image fails, hide img and show fallback
                            const el = e.currentTarget as HTMLImageElement;
                            el.style.display = "none";
                            const fb = el.nextElementSibling as HTMLElement;
                            if (fb) fb.style.display = "flex";
                          }}
                        />
                      ) : null}
                      <span
                        style={{
                          display: skill.src ? "none" : "flex",
                          fontSize: (skill.icon ?? "").length > 2 ? "13px" : "22px",
                          fontWeight: 700,
                          color: "rgba(255,255,255,0.88)",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "100%",
                          height: "100%",
                          textAlign: "center",
                        }}
                      >
                        {skill.icon ?? skill.name.slice(0, 3).toUpperCase()}
                      </span>
                    </div>

                    {/* Label */}
                    <span
                      style={{
                        fontSize: "10px",
                        fontWeight: 500,
                        color: "rgba(255,255,255,0.45)",
                        textTransform: "uppercase",
                        letterSpacing: "0.6px",
                        textAlign: "center",
                        maxWidth: "84px",
                        lineHeight: 1.3,
                      }}
                    >
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            {/* ── End Tech Stack ──────────────────────────────────── */}

            {/* ── Contact ─────────────────────────────────────────── */}
            <Contact />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
