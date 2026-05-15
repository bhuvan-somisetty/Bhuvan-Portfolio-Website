import { PropsWithChildren, useEffect, useState } from "react";
import About from "./About";
import Career from "./Career";
import Contact from "./Contact";
import Cursor from "./Cursor";
import Landing from "./Landing";
import Navbar from "./Navbar";
import SocialIcons from "./SocialIcons";
import WhatIDo from "./WhatIDo";
import Work from "./Work";
import setSplitText from "./utils/splitText";
import { initialFX } from "./utils/initialFX";
import "./styles/TechStack.css";

const SKILLS = [
  { name: "Python",         icon: "🐍", color: "#3776ab" },
  { name: "JavaScript",     icon: "JS", color: "#f7df1e" },
  { name: "TypeScript",     icon: "TS", color: "#3178c6" },
  { name: "HTML",           icon: "🌐", color: "#e34c26" },
  { name: "CSS",            icon: "🎨", color: "#1572b6" },
  { name: "PHP",            icon: "🐘", color: "#8892bf" },
  { name: "Go",             icon: "Go", color: "#00add8" },
  { name: "React",          icon: "⚛️", color: "#61dafb" },
  { name: "React Native",   icon: "📱", color: "#61dafb" },
  { name: "Expo",           icon: "📦", color: "#ffffff" },
  { name: "Node.js",        icon: "🟢", color: "#339933" },
  { name: "Express.js",     icon: "Ex", color: "#aaaaaa" },
  { name: "PostgreSQL",     icon: "🐘", color: "#336791" },
  { name: "MySQL",          icon: "🗄️", color: "#4479a1" },
  { name: "MongoDB",        icon: "🍃", color: "#47a248" },
  { name: "SQL",            icon: "DB", color: "#0078d4" },
  { name: "Git",            icon: "🔀", color: "#f05032" },
  { name: "GitHub",         icon: "🐙", color: "#ffffff" },
  { name: "GitHub Actions", icon: "⚙️", color: "#2088ff" },
  { name: "Vercel",         icon: "▲",  color: "#ffffff" },
  { name: "Render",         icon: "🚀", color: "#46e3b7" },
  { name: "REST APIs",      icon: "🔗", color: "#ff6b35" },
  { name: "JWT Auth",       icon: "🔑", color: "#d63aff" },
  { name: "Google OAuth",   icon: "🔐", color: "#4285f4" },
  { name: "Bcrypt",         icon: "🔒", color: "#7b61ff" },
  { name: "Axios",          icon: "Ax", color: "#5a29e4" },
  { name: "Postman",        icon: "📮", color: "#ff6c37" },
  { name: "VS Code",        icon: "💻", color: "#007acc" },
  { name: "Figma",          icon: "🎯", color: "#f24e1e" },
  { name: "Canva",          icon: "🖼️", color: "#00c4cc" },
  { name: "Pull Requests",  icon: "🔃", color: "#7b61ff" },
  { name: "Code Review",    icon: "👁️", color: "#a78bfa" },
  { name: "CI/CD",          icon: "✅", color: "#22c55e" },
  { name: "Documentation",  icon: "📝", color: "#94a3b8" },
];

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
    setTimeout(() => {
      initialFX();
    }, 100);
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
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
            <Work />

            {/* ── Tech Stack ─────────────────────────────────── */}
            <div
              style={{
                display: "block",
                width: "100%",
                minHeight: "700px",
                backgroundColor: "#100820",
                padding: "120px 40px 100px",
                boxSizing: "border-box",
                position: "relative",
                zIndex: 10,
              }}
            >
              {/* Heading */}
              <h2
                style={{
                  textAlign: "center",
                  fontSize: "clamp(36px, 5vw, 68px)",
                  fontWeight: 400,
                  margin: "0 0 16px",
                  background: "linear-gradient(0deg,#7f40ff,#ffffff)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                My <strong style={{ fontWeight: 600 }}>Tech Stack</strong>
              </h2>
              <p
                style={{
                  textAlign: "center",
                  color: "rgba(255,255,255,0.45)",
                  fontSize: "15px",
                  margin: "0 auto 56px",
                  maxWidth: "560px",
                  lineHeight: 1.6,
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
                  gap: "24px 20px",
                  maxWidth: "1200px",
                  margin: "0 auto",
                }}
              >
                {SKILLS.map((skill) => (
                  <div
                    key={skill.name}
                    className="tech-bubble"
                    title={skill.name}
                    style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}
                  >
                    <div
                      className="tech-bubble-inner"
                      style={{
                        ["--bubble-color" as string]: skill.color,
                        width: "80px",
                        height: "80px",
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.04)",
                        border: `1px solid ${skill.color}44`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "26px",
                        transition: "transform 0.3s ease, box-shadow 0.3s ease",
                        cursor: "default",
                      }}
                    >
                      {skill.icon}
                    </div>
                    <span
                      style={{
                        fontSize: "10px",
                        color: "rgba(255,255,255,0.5)",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                        textAlign: "center",
                        maxWidth: "80px",
                        lineHeight: 1.3,
                      }}
                    >
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            {/* ── End Tech Stack ─────────────────────────────── */}

            <Contact />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
