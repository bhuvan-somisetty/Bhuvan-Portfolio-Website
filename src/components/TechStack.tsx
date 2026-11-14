import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./styles/TechStack.css";

// React Icons
import {
  SiPython, SiJavascript, SiTypescript, SiHtml5, SiCss,
  SiReact, SiExpo, SiNodedotjs, SiExpress, SiPostgresql, SiMysql,
  SiMongodb, SiDocker, SiLinux, SiVercel, SiJest, SiFigma, SiPostman,
  SiCanva, SiNumpy, SiPandas, SiScikitlearn,
  SiGoogle, SiGithub, SiGithubactions, SiGit, SiTailwindcss,
  SiAxios, SiJsonwebtokens, SiC
} from "react-icons/si";
import { FaDatabase, FaBrain, FaRobot, FaLock, FaGlobe, FaMobileAlt, FaCodeBranch, FaSearch, FaSortAmountDown } from "react-icons/fa";
import { FaAws } from "react-icons/fa6";
import { TbApi, TbBrain, TbPrompt, TbSettingsAutomation, TbVector, TbListTree, TbExternalLink } from "react-icons/tb";
import { MdOutlineBugReport, MdOutlineLocationOn, MdOutlineMap } from "react-icons/md";
import { VscChecklist, VscGitPullRequest, VscTerminalLinux, VscVscode } from "react-icons/vsc";
import { GoPlay } from "react-icons/go";

// Types
interface Skill {
  name: string;
  category: string;
  level?: "Expert" | "Advanced" | "Intermediate" | "Learning";
  color: string;
  icon: any;
  projects: string[];
}

// Skills Database
const SKILLS: Skill[] = [
  // Programming Languages
  { name: "Python", category: "Programming Languages", level: "Advanced", color: "#3776ab", icon: SiPython, projects: ["AlphaGuard AI", "Alarm & Reminder API System"] },
  { name: "JavaScript", category: "Programming Languages", level: "Expert", color: "#f7df1e", icon: SiJavascript, projects: ["ClubSphere", "AlphaGuard AI", "QR Complaint & Feedback System", "Nexaris", "ResumeIQ Analyzer", "NeoNexus Internship"] },
  { name: "TypeScript", category: "Programming Languages", level: "Advanced", color: "#3178c6", icon: SiTypescript, projects: ["Nexaris", "NeoNexus Internship"] },
  { name: "SQL", category: "Programming Languages", level: "Advanced", color: "#0078d4", icon: FaDatabase, projects: ["ClubSphere", "AlphaGuard AI", "QR Complaint & Feedback System", "ResumeIQ Analyzer"] },
  { name: "C", category: "Programming Languages", level: "Intermediate", color: "#a8b9cc", icon: SiC, projects: ["Data Structures & Algorithms (Academic)"] },

  // Frontend
  { name: "HTML5", category: "Frontend", level: "Expert", color: "#e34c26", icon: SiHtml5, projects: ["ClubSphere", "AlphaGuard AI", "QR Complaint & Feedback System", "Nexaris", "ResumeIQ Analyzer"] },
  { name: "CSS3", category: "Frontend", level: "Expert", color: "#1572b6", icon: SiCss, projects: ["ClubSphere", "AlphaGuard AI", "QR Complaint & Feedback System", "Nexaris", "ResumeIQ Analyzer"] },
  { name: "Tailwind CSS", category: "Frontend", level: "Advanced", color: "#06b6d4", icon: SiTailwindcss, projects: ["Nexaris", "NeoNexus Internship"] },
  { name: "React.js", category: "Frontend", level: "Expert", color: "#61dafb", icon: SiReact, projects: ["ClubSphere", "AlphaGuard AI", "QR Complaint & Feedback System", "Nexaris", "ResumeIQ Analyzer"] },
  { name: "React Native", category: "Frontend", level: "Advanced", color: "#61dafb", icon: FaMobileAlt, projects: ["MovieApp Final"] },
  { name: "Expo", category: "Frontend", level: "Advanced", color: "#ffffff", icon: SiExpo, projects: ["MovieApp Final"] },
  { name: "Responsive Design", category: "Frontend", level: "Expert", color: "#3b82f6", icon: FaGlobe, projects: ["ClubSphere", "AlphaGuard AI", "QR Complaint & Feedback System", "Nexaris", "ResumeIQ Analyzer", "MovieApp Final"] },

  // Backend
  { name: "Node.js", category: "Backend", level: "Expert", color: "#339933", icon: SiNodedotjs, projects: ["ClubSphere", "AlphaGuard AI", "QR Complaint & Feedback System", "ResumeIQ Analyzer"] },
  { name: "Express.js", category: "Backend", level: "Expert", color: "#828282", icon: SiExpress, projects: ["ClubSphere", "QR Complaint & Feedback System", "ResumeIQ Analyzer"] },
  { name: "REST APIs", category: "Backend", level: "Expert", color: "#ff6b35", icon: TbApi, projects: ["ClubSphere", "AlphaGuard AI", "QR Complaint & Feedback System", "Alarm & Reminder API System", "Nexaris", "MovieApp Final"] },
  { name: "API Design", category: "Backend", level: "Advanced", color: "#10b981", icon: TbApi, projects: ["ClubSphere", "AlphaGuard AI", "QR Complaint & Feedback System", "Alarm & Reminder API System"] },
  { name: "Backend Development", category: "Backend", level: "Expert", color: "#6366f1", icon: FaDatabase, projects: ["ClubSphere", "AlphaGuard AI", "QR Complaint & Feedback System", "ResumeIQ Analyzer", "Alarm & Reminder API System"] },
  { name: "Software Development", category: "Backend", level: "Expert", color: "#a855f7", icon: FaCodeBranch, projects: ["ClubSphere", "AlphaGuard AI", "QR Complaint & Feedback System", "ResumeIQ Analyzer", "Open Source Contributions"] },

  // Databases
  { name: "PostgreSQL", category: "Databases", level: "Advanced", color: "#336791", icon: SiPostgresql, projects: ["ClubSphere", "AlphaGuard AI", "ResumeIQ Analyzer"] },
  { name: "MySQL", category: "Databases", level: "Advanced", color: "#4479a1", icon: SiMysql, projects: ["QR Complaint & Feedback System"] },
  { name: "MongoDB", category: "Databases", level: "Advanced", color: "#47a248", icon: SiMongodb, projects: ["ClubSphere"] },
  { name: "Database Design", category: "Databases", level: "Advanced", color: "#f59e0b", icon: FaDatabase, projects: ["ClubSphere", "AlphaGuard AI", "QR Complaint & Feedback System", "ResumeIQ Analyzer"] },

  // AI & Machine Learning
  { name: "NumPy", category: "AI & Machine Learning", level: "Advanced", color: "#013243", icon: SiNumpy, projects: ["AI Model Prototypes"] },
  { name: "Pandas", category: "AI & Machine Learning", level: "Advanced", color: "#150458", icon: SiPandas, projects: ["Data Processing Workflows"] },
  { name: "Scikit-Learn", category: "AI & Machine Learning", level: "Intermediate", color: "#f7931e", icon: SiScikitlearn, projects: ["Predictive Analytics"] },
  { name: "LangChain", category: "AI & Machine Learning", level: "Intermediate", color: "#ffffff", icon: FaBrain, projects: ["AlphaGuard AI Context Engine"] },
  { name: "RAG", category: "AI & Machine Learning", level: "Intermediate", color: "#7c3aed", icon: TbVector, projects: ["AlphaGuard AI (Retrieval-Augmented Generation)"] },
  { name: "LLM Applications", category: "AI & Machine Learning", level: "Advanced", color: "#ec4899", icon: FaRobot, projects: ["AlphaGuard AI", "ResumeIQ Analyzer"] },
  { name: "Prompt Engineering", category: "AI & Machine Learning", level: "Advanced", color: "#14b8a6", icon: TbPrompt, projects: ["AlphaGuard AI", "ResumeIQ Analyzer"] },
  { name: "Deep Learning Fundamentals", category: "AI & Machine Learning", level: "Intermediate", color: "#8b5cf6", icon: TbBrain, projects: [] },
  { name: "Computer Vision Fundamentals", category: "AI & Machine Learning", level: "Intermediate", color: "#3b82f6", icon: TbBrain, projects: [] },
  { name: "Gemini API", category: "AI & Machine Learning", level: "Advanced", color: "#1a73e8", icon: SiGoogle, projects: ["AlphaGuard AI", "ResumeIQ Analyzer"] },
  { name: "AI Systems", category: "AI & Machine Learning", level: "Advanced", color: "#8b5cf6", icon: FaBrain, projects: ["AlphaGuard AI", "ResumeIQ Analyzer"] },
  { name: "ATS Analysis", category: "AI & Machine Learning", level: "Advanced", color: "#10b981", icon: VscChecklist, projects: ["ResumeIQ Analyzer"] },

  // Cloud & DevOps
  { name: "Docker", category: "Cloud & DevOps", level: "Intermediate", color: "#2496ed", icon: SiDocker, projects: ["Open Source Contributions"] },
  { name: "AWS", category: "Cloud & DevOps", level: "Intermediate", color: "#ff9900", icon: FaAws, projects: [] },
  { name: "Linux", category: "Cloud & DevOps", level: "Advanced", color: "#fcc624", icon: SiLinux, projects: ["Open Source Contributions", "System Administration"] },
  { name: "Git", category: "Cloud & DevOps", level: "Expert", color: "#f05032", icon: SiGit, projects: ["All Projects", "Open Source Contributions"] },
  { name: "GitHub", category: "Cloud & DevOps", level: "Expert", color: "#ffffff", icon: SiGithub, projects: ["All Projects", "Open Source Contributions"] },
  { name: "GitHub Actions", category: "Cloud & DevOps", level: "Advanced", color: "#2088ff", icon: SiGithubactions, projects: ["Open Source Contributions", "CI/CD Setup"] },
  { name: "CI/CD Pipelines", category: "Cloud & DevOps", level: "Advanced", color: "#10b981", icon: TbSettingsAutomation, projects: ["Open Source Contributions"] },
  { name: "Render", category: "Cloud & DevOps", level: "Advanced", color: "#46e3b7", icon: GoPlay, projects: ["Alarm & Reminder API System"] },
  { name: "Vercel", category: "Cloud & DevOps", level: "Expert", color: "#ffffff", icon: SiVercel, projects: ["ClubSphere", "AlphaGuard AI", "Nexaris", "ResumeIQ Analyzer"] },

  // Testing
  { name: "Jest", category: "Testing", level: "Intermediate", color: "#c21325", icon: SiJest, projects: ["Open Source UI Testing", "NeoNexus Internship"] },
  { name: "Unit Testing", category: "Testing", level: "Advanced", color: "#10b981", icon: VscChecklist, projects: ["Open Source QA", "NeoNexus Internship"] },
  { name: "Integration Testing", category: "Testing", level: "Advanced", color: "#6366f1", icon: VscChecklist, projects: ["Open Source QA", "NeoNexus Internship"] },

  // Computer Science Fundamentals
  { name: "Data Structures", category: "Computer Science Fundamentals", level: "Advanced", color: "#a855f7", icon: TbListTree, projects: ["Academic Algorithms", "LeetCode Problem Solving"] },
  { name: "Algorithms", category: "Computer Science Fundamentals", level: "Advanced", color: "#6366f1", icon: TbListTree, projects: ["Academic Algorithms", "LeetCode Problem Solving"] },
  { name: "Object-Oriented Programming", category: "Computer Science Fundamentals", level: "Advanced", color: "#3b82f6", icon: TbListTree, projects: ["Class Hierarchy Models", "Modular Backend Design"] },
  { name: "DBMS", category: "Computer Science Fundamentals", level: "Advanced", color: "#06b6d4", icon: FaDatabase, projects: ["Relational/NoSQL Database Design"] },
  { name: "Operating Systems", category: "Computer Science Fundamentals", level: "Intermediate", color: "#10b981", icon: SiLinux, projects: ["System Engineering Concepts"] },
  { name: "Problem Solving", category: "Computer Science Fundamentals", level: "Expert", color: "#ec4899", icon: FaBrain, projects: ["Technical Challenges", "LeetCode Solutions"] },

  // Open Source & Collaboration
  { name: "Pull Requests", category: "Open Source & Collaboration", level: "Expert", color: "#7b61ff", icon: VscGitPullRequest, projects: ["GitHub Contribution Workflow"] },
  { name: "Code Reviews", category: "Open Source & Collaboration", level: "Advanced", color: "#a78bfa", icon: VscChecklist, projects: ["Collaborative Peer Reviews"] },
  { name: "Documentation", category: "Open Source & Collaboration", level: "Expert", color: "#94a3b8", icon: VscChecklist, projects: ["API Reference Docs", "User Guides"] },
  { name: "Bug Fixing", category: "Open Source & Collaboration", level: "Expert", color: "#ef4444", icon: MdOutlineBugReport, projects: ["Open Source Contributions"] },
  { name: "Developer Tooling", category: "Open Source & Collaboration", level: "Advanced", color: "#6366f1", icon: VscTerminalLinux, projects: ["CI/CD Pipelines", "Local Dev Environments Setup"] },

  // Tools & Platforms
  { name: "Postman", category: "Tools & Platforms", level: "Expert", color: "#ff6c37", icon: SiPostman, projects: ["REST API Testing"] },
  { name: "Thunder Client", category: "Tools & Platforms", level: "Advanced", color: "#743de0", icon: TbApi, projects: ["VS Code API Testing"] },
  { name: "VS Code", category: "Tools & Platforms", level: "Expert", color: "#007acc", icon: VscVscode, projects: ["Primary Dev Workspace"] },
  { name: "Figma", category: "Tools & Platforms", level: "Intermediate", color: "#f24e1e", icon: SiFigma, projects: ["UI/UX Design Mockups"] },
  { name: "Canva", category: "Tools & Platforms", level: "Advanced", color: "#00c4cc", icon: SiCanva, projects: ["Design Presentations & Assets"] },
  { name: "Axios", category: "Tools & Platforms", level: "Expert", color: "#5a29e4", icon: SiAxios, projects: ["React Data Fetching Modules"] },
  { name: "Authentication", category: "Tools & Platforms", level: "Expert", color: "#10b981", icon: FaLock, projects: ["ClubSphere", "QR Complaint & Feedback System", "ResumeIQ Analyzer"] },
  { name: "Google OAuth", category: "Tools & Platforms", level: "Advanced", color: "#4285f4", icon: SiGoogle, projects: ["ClubSphere", "ResumeIQ Analyzer"] },
  { name: "JWT Authentication", category: "Tools & Platforms", level: "Expert", color: "#d63aff", icon: SiJsonwebtokens, projects: ["ClubSphere", "QR Complaint & Feedback System", "ResumeIQ Analyzer"] },
  { name: "QR Integration", category: "Tools & Platforms", level: "Advanced", color: "#10b981", icon: FaGlobe, projects: ["ClubSphere", "QR Complaint & Feedback System"] },
  { name: "Location Tracking", category: "Tools & Platforms", level: "Advanced", color: "#3b82f6", icon: MdOutlineLocationOn, projects: ["AlphaGuard AI"] },
  { name: "Geofencing", category: "Tools & Platforms", level: "Advanced", color: "#a855f7", icon: MdOutlineMap, projects: ["AlphaGuard AI"] },
  { name: "Mobile Development", category: "Tools & Platforms", level: "Advanced", color: "#61dafb", icon: FaMobileAlt, projects: ["MovieApp Final"] },
  { name: "Workflow Automation", category: "Tools & Platforms", level: "Advanced", color: "#3b82f6", icon: TbSettingsAutomation, projects: ["Alarm & Reminder API System", "GitHub Actions CI"] }
];

// Open Source organizations
const OPEN_SOURCE = [
  {
    org: "Jam",
    role: "Organization Member & Contributor",
    desc: "joinmarket-webui/jam: the web interface for JoinMarket.",
    impacts: [
      "Member of the joinmarket-webui organization and its implementation contributors team.",
      "Reviews and pull requests go through the maintainers' process."
    ]
  },
  {
    org: "MetaCall core",
    role: "Open Source Contributor",
    desc: "metacall/core: a polyglot runtime for calling functions across programming languages.",
    impacts: [
      "Open source contributor to the core repository."
    ]
  },
  {
    org: "gittuf",
    role: "Open Source Contributor",
    desc: "gittuf/gittuf: a security layer for Git repositories with signed policies for who can change what.",
    impacts: [
      "Open source contributor to the gittuf repository."
    ]
  },
  {
    org: "GRASS GIS",
    role: "Open Source Contributor",
    desc: "OSGeo/grass: open source geospatial processing and analysis engine from OSGeo.",
    impacts: [
      "Open source contributor to the GRASS GIS repository."
    ]
  }
];

// Magnetic Hover Component
const MagneticBubble = ({ children, color }: { children: React.ReactNode; color: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.3, y: y * 0.3 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="magnetic-wrapper"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: position.x === 0 && position.y === 0 ? "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)" : "transform 0.05s linear",
        "--glow-color": color
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
};

const TechStack = () => {
  // Stats counters state
  const [countState, setCountState] = useState({ projects: 0, prs: 0, tech: 0 });
  
  // Showcase Grid states
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("default");
  
  // Skill Tooltip State
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);

  useEffect(() => {
    const projTarget = 8;
    const prsTarget = 250;
    const techTarget = SKILLS.length;

    let proj = 0;
    let prs = 0;
    let tech = 0;

    const timer = setInterval(() => {
      let updated = false;
      if (proj < projTarget) { proj++; updated = true; }
      if (prs < prsTarget) { prs++; updated = true; }
      if (tech < techTarget) { tech += Math.min(3, techTarget - tech); updated = true; }

      setCountState({ projects: proj, prs: prs, tech: tech });

      if (!updated) {
        clearInterval(timer);
      }
    }, 45);

    return () => clearInterval(timer);
  }, []);

  // Filter skills
  const categories = ["All", ...Array.from(new Set(SKILLS.map((s) => s.category)))];
  
  const filteredSkills = SKILLS.filter((s) => {
    const matchesCategory = activeCategory === "All" || s.category === activeCategory;
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort skills
  const sortedSkills = [...filteredSkills].sort((a, b) => {
    if (sortOrder === "alphabetical") {
      return a.name.localeCompare(b.name);
    }
    if (sortOrder === "proficiency") {
      // Custom sorting based on levels
      const levelWeight = { Expert: 4, Advanced: 3, Intermediate: 2, Learning: 1 };
      return (b.level ? levelWeight[b.level] : 0) - (a.level ? levelWeight[a.level] : 0);
    }
    return 0; // default order
  });

  return (
    <div className="techstack-section" id="tech-stack">
      <div className="techstack-wrapper">
        
        {/* Title */}
        <div className="ts-header">
          <h2 className="ts-title">
            Developer <span>Impact Showcase</span>
          </h2>
          <p className="ts-subtitle">
            A quick overview of experience, open source contributions and the technologies behind my projects.
          </p>
        </div>

        {/* SECTION 1 — RECRUITER SNAPSHOT */}
        <div className="section-block">
          <h3 className="section-title-tag">Recruiter Snapshot</h3>
          <div className="snapshot-grid">
            <div className="snapshot-card glass-panel">
              <div className="snapshot-badge">Role</div>
              <h4>Software Development Intern</h4>
              <p>NeoNexus Innovations LLP</p>
              <span className="snapshot-detail">Built scalable React, TypeScript and Node.js web apps; improved performance by 25%</span>
            </div>
            
            <div className="snapshot-card glass-panel">
              <div className="snapshot-badge">Open Source</div>
              <h4>Open Source Contributor</h4>
              <p>Jam, MetaCall core, gittuf & GRASS GIS</p>
              <span className="snapshot-detail">Contributions across LFX Mentorship, C4GT, GSoC, Summer of Bitcoin, GSSoC and SSoC</span>
            </div>

            <div className="snapshot-card glass-panel">
              <div className="snapshot-badge">Focus</div>
              <h4>Backend & AI Systems</h4>
              <p>Engineering Specialization</p>
              <span className="snapshot-detail">Passionate about scalable microservices, vector DBs & RAG structures</span>
            </div>

            <div className="snapshot-card glass-panel">
              <div className="snapshot-value">{countState.prs}+</div>
              <h4>Merged Pull Requests</h4>
              <p>Across Open Source Programs</p>
              <span className="snapshot-detail">Pull requests merged across open source programs and organizations</span>
            </div>
          </div>
        </div>

        {/* SECTION 5 — OPEN SOURCE IMPACT DASHBOARD */}
        <div className="section-block">
          <h3 className="section-title-tag">Open Source Impact Dashboard</h3>
          <div className="os-impact-dashboard">
            {OPEN_SOURCE.map((item, idx) => (
              <div className="os-card glass-panel" key={idx}>
                <div className="os-card-header">
                  <h4>{item.org}</h4>
                  <span className="os-role">{item.role}</span>
                </div>
                <p className="os-desc">{item.desc}</p>
                <div className="os-contributions">
                  <h5>Contributions & Improvements:</h5>
                  <ul>
                    {item.impacts.map((imp, index) => (
                      <li key={index}>{imp}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
            <div className="os-programs-summary glass-panel">
              <h4>Program Achievements & Fellowships</h4>
              <div className="programs-grid">
                <div className="program-item">
                  <span className="prog-title">LFX Mentorship</span>
                  <p>Linux Foundation mentorship program for open source contributors.</p>
                </div>
                <div className="program-item">
                  <span className="prog-title">C4GT Fellowship</span>
                  <p>Code for Gov Tech Fellow contributing to public digital infrastructure codebases.</p>
                </div>
                <div className="program-item">
                  <span className="prog-title">GSoC & Summer of Bitcoin</span>
                  <p>Open source summer programs.</p>
                </div>
                <div className="program-item">
                  <span className="prog-title">GSSoC & SSoC</span>
                  <p>Contributor to several repository toolings, merging pull requests and helping resolve bugs.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 6 — TECH STACK SHOWCASE */}
        <div className="section-block">
          <h3 className="section-title-tag">Interactive Tech Stack Grid</h3>
          
          {/* Controls */}
          <div className="ts-controls glass-panel">
            {/* Search */}
            <div className="search-box-wrapper">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search technologies..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-input"
              />
            </div>

            {/* Sort */}
            <div className="sort-box-wrapper">
              <FaSortAmountDown className="sort-icon" />
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="sort-select"
              >
                <option value="default">Default Order</option>
                <option value="proficiency">Sort by Level</option>
                <option value="alphabetical">Alphabetical</option>
              </select>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="category-scroll-wrapper">
            <div className="category-pills">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`category-pill ${activeCategory === cat ? "pill-active" : ""}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat === "All" ? "All Stack" : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid Area */}
          <div className="skills-showcase-container">
            <motion.div className="skills-bubbles-grid" layout>
              <AnimatePresence mode="popLayout">
                {sortedSkills.map((skill) => {
                  const Icon = skill.icon;
                  return (
                    <motion.div
                      key={skill.name}
                      layout
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.28 }}
                      className="tech-bubble-wrapper"
                      onMouseEnter={() => setHoveredSkill(skill)}
                      onMouseLeave={() => setHoveredSkill(null)}
                    >
                      <MagneticBubble color={skill.color}>
                        <div className="skill-bubble-card">
                          <Icon className="skill-bubble-icon" style={{ color: skill.color }} />
                        </div>
                      </MagneticBubble>
                      <span className="skill-card-label">{skill.name}</span>

                      {/* Tooltip nested inside the wrapper */}
                      <AnimatePresence>
                        {hoveredSkill?.name === skill.name && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="skill-hover-tooltip"
                            style={{
                              bottom: "100%",
                              left: "50%",
                              transform: "translate(-50%, -10px)",
                              position: "absolute"
                            }}
                          >
                            <div className="tooltip-header" style={{ "--glow-color": skill.color } as React.CSSProperties}>
                              <span className="tooltip-name">{skill.name}</span>
                              {skill.level && (
                                <span className={`tooltip-level-tag level-${skill.level.toLowerCase()}`}>
                                  {skill.level}
                                </span>
                              )}
                            </div>
                            <div className="tooltip-projects">
                              <div className="tooltip-proj-title">Used In:</div>
                              <ul className="tooltip-proj-list">
                                {skill.projects.map((p, idx) => (
                                  <li key={idx}>• {p}</li>
                                ))}
                              </ul>
                            </div>
                            <div className="tooltip-arrow" style={{ borderTopColor: "rgba(14, 9, 21, 0.95)" }}></div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TechStack;
