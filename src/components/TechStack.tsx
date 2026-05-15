import React from "react";
import "./styles/TechStack.css";

const skills = [
  // Languages
  { name: "Python",          icon: "🐍",  color: "#3776ab" },
  { name: "JavaScript",      icon: "JS",  color: "#f7df1e" },
  { name: "TypeScript",      icon: "TS",  color: "#3178c6" },
  { name: "HTML",            icon: "🌐",  color: "#e34c26" },
  { name: "CSS",             icon: "🎨",  color: "#1572b6" },
  { name: "PHP",             icon: "🐘",  color: "#8892bf" },
  { name: "Go",              icon: "Go",  color: "#00add8" },
  // Frontend
  { name: "React",           icon: "⚛️",  color: "#61dafb" },
  { name: "React Native",    icon: "📱",  color: "#61dafb" },
  { name: "Expo",            icon: "📦",  color: "#ffffff" },
  // Backend
  { name: "Node.js",         icon: "🟢",  color: "#339933" },
  { name: "Express.js",      icon: "Ex",  color: "#aaaaaa" },
  // Databases
  { name: "PostgreSQL",      icon: "🐘",  color: "#336791" },
  { name: "MySQL",           icon: "🗄️",  color: "#4479a1" },
  { name: "MongoDB",         icon: "🍃",  color: "#47a248" },
  { name: "SQL",             icon: "DB",  color: "#0078d4" },
  // DevOps / VCS
  { name: "Git",             icon: "🔀",  color: "#f05032" },
  { name: "GitHub",          icon: "🐙",  color: "#ffffff" },
  { name: "GitHub Actions",  icon: "⚙️",  color: "#2088ff" },
  { name: "Vercel",          icon: "▲",   color: "#ffffff" },
  { name: "Render",          icon: "🚀",  color: "#46e3b7" },
  // Auth / APIs
  { name: "REST APIs",       icon: "🔗",  color: "#ff6b35" },
  { name: "JWT Auth",        icon: "🔑",  color: "#d63aff" },
  { name: "Google OAuth",    icon: "🔐",  color: "#4285f4" },
  { name: "API Keys",        icon: "🗝️",  color: "#ec4899" },
  { name: "Bcrypt",          icon: "🔒",  color: "#7b61ff" },
  { name: "Axios",           icon: "Ax",  color: "#5a29e4" },
  // Tools
  { name: "Postman",         icon: "📮",  color: "#ff6c37" },
  { name: "VS Code",         icon: "💻",  color: "#007acc" },
  { name: "Figma",           icon: "🎯",  color: "#f24e1e" },
  { name: "Canva",           icon: "🖼️",  color: "#00c4cc" },
  { name: "Thunder Client",  icon: "⚡",  color: "#743de0" },
  // Practices
  { name: "Pull Requests",   icon: "🔃",  color: "#7b61ff" },
  { name: "Code Review",     icon: "👁️",  color: "#a78bfa" },
  { name: "CI Checks",       icon: "✅",  color: "#22c55e" },
  { name: "Documentation",   icon: "📝",  color: "#94a3b8" },
];

const TechStack = () => {
  return (
    <div
      className="techstack-section"
      style={{ display: "block", width: "100%", minHeight: "400px" }}
    >
      <div className="techstack-container">
        <h2 className="techstack-title">
          My <span>Tech Stack</span>
        </h2>
        <p className="techstack-subtitle">
          Technologies, tools, and practices I use to build real-world digital products.
        </p>
        <div className="techstack-bubbles">
          {skills.map((skill, i) => (
            <div
              className="tech-bubble"
              key={skill.name}
              style={{ animationDelay: `${((i % 8) * 0.18).toFixed(2)}s` }}
              title={skill.name}
            >
              <div
                className="tech-bubble-inner"
                style={{ "--bubble-color": skill.color } as React.CSSProperties}
              >
                <span
                  className="tech-text-icon"
                  style={{ color: skill.color, fontSize: "22px" }}
                >
                  {skill.icon}
                </span>
              </div>
              <span className="tech-label">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechStack;
