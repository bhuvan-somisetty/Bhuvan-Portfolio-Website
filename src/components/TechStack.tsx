import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./styles/TechStack.css";

// React Icons
import {
  SiPython, SiJavascript, SiTypescript, SiHtml5, SiCss,
  SiReact, SiExpo, SiNodedotjs, SiExpress, SiPostgresql, SiMysql,
  SiMongodb, SiDocker, SiLinux, SiVercel, SiJest, SiFigma, SiPostman,
  SiCanva, SiNumpy, SiPandas, SiScikitlearn, SiCncf, SiHarbor,
  SiGoogle, SiGithub, SiGithubactions, SiGit, SiTailwindcss,
  SiAxios, SiJsonwebtokens, SiJaeger, SiC
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
  level: "Expert" | "Advanced" | "Intermediate" | "Learning";
  color: string;
  icon: any;
  projects: string[];
}

interface ProjectDetail {
  name: string;
  tagline: string;
  overview: string;
  problemSolved: string;
  techStack: { name: string; icon: any; color: string }[];
  features: string[];
  architecture: string;
  database: string;
  apis: string;
  auth: string;
  deployment: string;
  skillsDemonstrated: string[];
  github?: string;
  live?: string;
}

// 75 Skills Database
const SKILLS: Skill[] = [
  // Programming Languages
  { name: "Python", category: "Programming Languages", level: "Advanced", color: "#3776ab", icon: SiPython, projects: ["AlphaGuard AI", "Alarm & Reminder API System", "Akiyam Solutions Internship"] },
  { name: "JavaScript", category: "Programming Languages", level: "Expert", color: "#f7df1e", icon: SiJavascript, projects: ["ClubSphere", "AlphaGuard AI", "QR Complaint & Feedback System", "Nexaris", "ResumeIQ Analyzer", "NeoNexus Internship"] },
  { name: "TypeScript", category: "Programming Languages", level: "Advanced", color: "#3178c6", icon: SiTypescript, projects: ["Nexaris", "NeoNexus Internship"] },
  { name: "SQL", category: "Programming Languages", level: "Advanced", color: "#0078d4", icon: FaDatabase, projects: ["ClubSphere", "AlphaGuard AI", "QR Complaint & Feedback System", "ResumeIQ Analyzer", "Labmentix Internship"] },
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
  { name: "MySQL", category: "Databases", level: "Advanced", color: "#4479a1", icon: SiMysql, projects: ["QR Complaint & Feedback System", "Labmentix Internship"] },
  { name: "MongoDB", category: "Databases", level: "Advanced", color: "#47a248", icon: SiMongodb, projects: ["ClubSphere", "Labmentix Internship"] },
  { name: "Database Design", category: "Databases", level: "Advanced", color: "#f59e0b", icon: FaDatabase, projects: ["ClubSphere", "AlphaGuard AI", "QR Complaint & Feedback System", "ResumeIQ Analyzer"] },

  // AI & Machine Learning
  { name: "NumPy", category: "AI & Machine Learning", level: "Advanced", color: "#013243", icon: SiNumpy, projects: ["Akiyam Solutions Internship", "AI Model Prototypes"] },
  { name: "Pandas", category: "AI & Machine Learning", level: "Advanced", color: "#150458", icon: SiPandas, projects: ["Akiyam Solutions Internship", "Data Processing Workflows"] },
  { name: "Scikit-Learn", category: "AI & Machine Learning", level: "Intermediate", color: "#f7931e", icon: SiScikitlearn, projects: ["Akiyam Solutions Internship", "Predictive Analytics"] },
  { name: "LangChain", category: "AI & Machine Learning", level: "Intermediate", color: "#ffffff", icon: FaBrain, projects: ["AlphaGuard AI Context Engine"] },
  { name: "RAG", category: "AI & Machine Learning", level: "Intermediate", color: "#7c3aed", icon: TbVector, projects: ["AlphaGuard AI (Retrieval-Augmented Generation)"] },
  { name: "LLM Applications", category: "AI & Machine Learning", level: "Advanced", color: "#ec4899", icon: FaRobot, projects: ["AlphaGuard AI", "ResumeIQ Analyzer"] },
  { name: "Prompt Engineering", category: "AI & Machine Learning", level: "Advanced", color: "#14b8a6", icon: TbPrompt, projects: ["AlphaGuard AI", "ResumeIQ Analyzer"] },
  { name: "Deep Learning Fundamentals", category: "AI & Machine Learning", level: "Intermediate", color: "#8b5cf6", icon: TbBrain, projects: ["Akiyam Solutions Internship"] },
  { name: "Computer Vision Fundamentals", category: "AI & Machine Learning", level: "Intermediate", color: "#3b82f6", icon: TbBrain, projects: ["Akiyam Solutions Internship"] },
  { name: "Gemini API", category: "AI & Machine Learning", level: "Advanced", color: "#1a73e8", icon: SiGoogle, projects: ["AlphaGuard AI", "ResumeIQ Analyzer"] },
  { name: "AI Systems", category: "AI & Machine Learning", level: "Advanced", color: "#8b5cf6", icon: FaBrain, projects: ["AlphaGuard AI", "ResumeIQ Analyzer", "Akiyam Solutions Internship"] },
  { name: "ATS Analysis", category: "AI & Machine Learning", level: "Advanced", color: "#10b981", icon: VscChecklist, projects: ["ResumeIQ Analyzer"] },

  // Cloud & DevOps
  { name: "Docker", category: "Cloud & DevOps", level: "Intermediate", color: "#2496ed", icon: SiDocker, projects: ["Open Source Harbor", "Labmentix Internship"] },
  { name: "AWS", category: "Cloud & DevOps", level: "Intermediate", color: "#ff9900", icon: FaAws, projects: ["Labmentix Internship"] },
  { name: "Linux", category: "Cloud & DevOps", level: "Advanced", color: "#fcc624", icon: SiLinux, projects: ["Open Source Harbor", "Open Source Jaeger", "System Administration"] },
  { name: "Git", category: "Cloud & DevOps", level: "Expert", color: "#f05032", icon: SiGit, projects: ["All Projects", "Open Source Contributions"] },
  { name: "GitHub", category: "Cloud & DevOps", level: "Expert", color: "#ffffff", icon: SiGithub, projects: ["All Projects", "Open Source Contributions"] },
  { name: "GitHub Actions", category: "Cloud & DevOps", level: "Advanced", color: "#2088ff", icon: SiGithubactions, projects: ["Open Source Harbor", "Open Source Jaeger", "CI/CD Setup"] },
  { name: "CI/CD Pipelines", category: "Cloud & DevOps", level: "Advanced", color: "#10b981", icon: TbSettingsAutomation, projects: ["Open Source Harbor", "Open Source Jaeger", "Labmentix Internship"] },
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
  { name: "CNCF", category: "Open Source & Collaboration", level: "Advanced", color: "#0086ff", icon: SiCncf, projects: ["Harbor Contributions", "Jaeger UI Contributions"] },
  { name: "Harbor", category: "Open Source & Collaboration", level: "Advanced", color: "#60a5fa", icon: SiHarbor, projects: ["LFX Mentorship (Satellite Integrations & Dev Tooling)"] },
  { name: "Jaeger", category: "Open Source & Collaboration", level: "Advanced", color: "#10b981", icon: SiJaeger, projects: ["Jaeger UI Dashboard Optimizations"] },
  { name: "MifosPay", category: "Open Source & Collaboration", level: "Advanced", color: "#009688", icon: FaMobileAlt, projects: ["Mifos Initiative API & UI Fixes"] },
  { name: "LFX", category: "Open Source & Collaboration", level: "Advanced", color: "#3b82f6", icon: SiLinux, projects: ["Linux Foundation Mentorship Program"] },
  { name: "C4GT", category: "Open Source & Collaboration", level: "Advanced", color: "#f59e0b", icon: FaCodeBranch, projects: ["Code for Gov Tech fellowship"] },
  { name: "GSSoC", category: "Open Source & Collaboration", level: "Advanced", color: "#eab308", icon: FaCodeBranch, projects: ["GirlScript Summer of Code Contributions"] },
  { name: "SSoC", category: "Open Source & Collaboration", level: "Advanced", color: "#f43f5e", icon: FaCodeBranch, projects: ["Social Summer of Code Contributions"] },
  { name: "Pull Requests", category: "Open Source & Collaboration", level: "Expert", color: "#7b61ff", icon: VscGitPullRequest, projects: ["GitHub Contribution Workflow"] },
  { name: "Code Reviews", category: "Open Source & Collaboration", level: "Advanced", color: "#a78bfa", icon: VscChecklist, projects: ["Collaborative Peer Reviews"] },
  { name: "Documentation", category: "Open Source & Collaboration", level: "Expert", color: "#94a3b8", icon: VscChecklist, projects: ["API Reference Docs", "User Guides"] },
  { name: "Bug Fixing", category: "Open Source & Collaboration", level: "Expert", color: "#ef4444", icon: MdOutlineBugReport, projects: ["Harbor, Jaeger UI, MifosPay Issues Resolving"] },
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

// Recruiter snapshot stats
const METRICS = [
  { value: "AI/ML Intern", label: "Akiyam Solutions & Labmentix", desc: "Genomics Data Pipelines & AI Agent integrations" },
  { value: "Open Source Contributor", label: "CNCF Harbor & Jaeger UI", desc: "Core toolings, API fixes & frontend enhancements" },
  { value: "Backend & AI Systems", label: "Specialization Focus", desc: "Robust microservices, vector DBs & RAG systems" },
  { value: "12+ Merged PRs", label: "Global Codebases", desc: "Contributions accepted in CNCF/LF upstream repositories" },
  { value: "8+ Major Projects", label: "Deployed Portfolio", desc: "Full-stack web applications, APIs, and mobile systems" }
];

// Developer Journey Timeline
const JOURNEY = [
  { year: "2025", title: "Started B.Tech CSE (AI/ML)", desc: "Commenced undergraduate studies focusing on computer science, data structures, algorithms, and AI foundations." },
  { year: "2025", title: "Built ClubSphere", desc: "Designed a comprehensive campus club management and event QR check-in platform using React, Node, and MongoDB." },
  { year: "2025", title: "Built QR Complaint System", desc: "Developed a campus hostel feedback utility optimizing complaint tickets processing with MySQL databases." },
  { year: "2026", title: "Started Open Source Contributions", desc: "Began contributing upstream, fixing issues, and configuring CI/CD configurations in open projects." },
  { year: "2026", title: "Contributed to Harbor", desc: "Added integration tests, documentation improvements, and setup satellite configurations for Harbor registry." },
  { year: "2026", title: "Contributed to Jaeger", desc: "Enhanced user dashboard UI, resolving developer workflow items for Jaeger tracing console." },
  { year: "2026", title: "Contributed to MifosPay", desc: "Patched API connection problems, resolved mobile payment interface issues." },
  { year: "2026", title: "AI/ML & SDE Internships", desc: "Interned at Akiyam (AI model engineering), Labmentix (backend optimization), and NeoNexus (web architectures)." },
  { year: "2026", title: "Built ResumeIQ Analyzer", desc: "Architected an AI resume parser checking ATS scores and generating rewrites using Google Gemini APIs." },
  { year: "2026", title: "Built AlphaGuard AI", desc: "Engineered an AI safety platform combining parental dashboards, geofencing coordinates, and AI-powered insights." }
];

// Featured Projects Detail
const FEATURED_PROJECTS: ProjectDetail[] = [
  {
    name: "AlphaGuard AI",
    tagline: "AI-Powered Child Safety Platform",
    overview: "A premium child safety monitoring dashboard that integrates backend logic with AI engines to analyze digital behavior and track geographical coordinates.",
    problemSolved: "Helps parents monitor safety metrics, receive location geofencing updates, and get automated AI summaries of potential alerts without manual checking.",
    techStack: [
      { name: "React", icon: SiReact, color: "#61dafb" },
      { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#336791" },
      { name: "Gemini API", icon: SiGoogle, color: "#1a73e8" }
    ],
    features: [
      "Real-time location geofencing with trigger alert zones",
      "Automated safety insight generation from behavioral logs",
      "Parental dashboard control panel with device toggles",
      "Secure backend data stream utilizing REST APIs"
    ],
    architecture: "Express microservices handling geofence coordinates and scheduling cron jobs for LLM data aggregation.",
    database: "PostgreSQL with spatial indexes for location history coordinates caching.",
    apis: "REST endpoints for device data ingestion and Gemini API SDK calls.",
    auth: "Secured token sessions.",
    deployment: "Vercel production storefront linked with custom backend servers.",
    skillsDemonstrated: ["AI Systems", "Backend Engineering", "Location Tracking", "Geofencing", "Database Design"],
    github: "https://github.com/bhuvan-somisetty/ChildShield",
    live: "https://alphaguard-v2.vercel.app/"
  },
  {
    name: "ResumeIQ Analyzer",
    tagline: "Intelligent ATS Scoring Engine",
    overview: "An AI-powered ATS analyzer parsing documents and comparing them to job descriptions to find skill gaps and recommend corrections.",
    problemSolved: "Allows applicants to immediately verify if their resume aligns with specific target roles, highlighting missing keywords automatically.",
    techStack: [
      { name: "React", icon: SiReact, color: "#61dafb" },
      { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
      { name: "Express.js", icon: SiExpress, color: "#828282" },
      { name: "Gemini API", icon: SiGoogle, color: "#1a73e8" }
    ],
    features: [
      "PDF parsing extraction using optimized text algorithms",
      "Immediate ATS scoring matching keyword density",
      "Actionable recommendations with text rewrite drafts",
      "Clean UI display for side-by-side comparison"
    ],
    architecture: "Text extraction pipeline feeding a prompt context to Gemini model APIs.",
    database: "PostgreSQL caching past candidate scans to compile trends.",
    apis: "REST APIs with document upload streams.",
    auth: "User access control.",
    deployment: "Vercel frontend production build.",
    skillsDemonstrated: ["ATS Analysis", "LLM Applications", "Prompt Engineering", "Gemini API", "API Design"],
    github: "https://github.com/bhuvan-somisetty/resumeiq-ai",
    live: "https://resumeiq-ai-eight.vercel.app/"
  },
  {
    name: "ClubSphere",
    tagline: "Campus Management Portal",
    overview: "An all-in-one campus platform enabling organizations to register, publish event announcements, and track student attendance.",
    problemSolved: "Eliminates paper sheets and manual data collection, shifting event coordination onto digital check-in systems.",
    techStack: [
      { name: "React", icon: SiReact, color: "#61dafb" },
      { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
      { name: "MongoDB", icon: SiMongodb, color: "#47a248" },
      { name: "REST APIs", icon: TbApi, color: "#ff6b35" }
    ],
    features: [
      "Dynamic QR code generator linked to active event sessions",
      "Real-time attendance counting dashboard",
      "Secure organizer management dashboards",
      "Push announcements system for campus updates"
    ],
    architecture: "Node Express REST architecture handling QR session tokens.",
    database: "MongoDB collections structuring student IDs, event maps, and schedules.",
    apis: "Internal REST routes managing database writes.",
    auth: "JWT secure cookies authentication.",
    deployment: "Vercel web production build.",
    skillsDemonstrated: ["QR Integration", "Database Design", "Authentication", "REST APIs", "Backend Development"],
    github: "https://github.com/bhuvan-somisetty/CLUBSPHERE_",
    live: "https://clubsphere-two.vercel.app/"
  },
  {
    name: "QR Complaint Management System",
    tagline: "Campus Utility ticket manager",
    overview: "A feedback collector allowing students to scan area QR codes and file facility requests directly to campus staff.",
    problemSolved: "Shortens time to fix hostel and dining hall problems by routing tickets immediately to correct maintenance categories.",
    techStack: [
      { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
      { name: "Express.js", icon: SiExpress, color: "#828282" },
      { name: "MySQL", icon: SiMysql, color: "#4479a1" },
      { name: "REST APIs", icon: TbApi, color: "#ff6b35" }
    ],
    features: [
      "Locational QR code targets mapping campus halls",
      "Categorized ticket routing with urgency markers",
      "Administrative dashboard checking issue resolutions",
      "Student notification log reporting ticket states"
    ],
    architecture: "Server-side Express controllers handling complaint status updates.",
    database: "MySQL relational design tracking complaints, categories, and staff.",
    apis: "Endpoints for submission, status reviews, and admin toggles.",
    auth: "Token validation.",
    deployment: "Render servers hosting API streams, Vercel frontend storefront.",
    skillsDemonstrated: ["Database Design", "Express.js", "API Design", "Authentication"],
    github: "https://github.com/bhuvan-somisetty/Hostel-Mess-Feedback-System",
    live: "https://psthostel.vercel.app/"
  }
];

// Open Source impact database
const OPEN_SOURCE = [
  {
    org: "CNCF Harbor",
    role: "LFX Mentorship Contributor",
    desc: "Contributed to harbor-satellite setups and local developer tooling configurations.",
    impacts: [
      "Added Docker registry testing setups to verify satellite communication stability.",
      "Configured automated workflow checks validating pull request styles and syntax.",
      "Wrote reference documentation explaining installation steps for local sandbox environments."
    ]
  },
  {
    org: "CNCF Jaeger",
    role: "Jaeger UI Contributor",
    desc: "Refactored parts of the query tracing UI component console to improve developer experience.",
    impacts: [
      "Patched interface bugs, resolving layout inconsistencies on tracing panels.",
      "Assisted in configuring automated checks confirming UI styles during bundle phases.",
      "Refined tracing console documentation guidelines."
    ]
  },
  {
    org: "Mifos Initiative",
    role: "MifosPay Contributor",
    desc: "Helped resolve client authentication bugs and layout errors on payment screens.",
    impacts: [
      "Resolved mobile screen overlaps, ensuring fluid display on multiple Android resolutions.",
      "Patched local server API responses handling user connection states.",
      "Maintained unit test checks validating authentication modules."
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
  
  // Mapping explorer state (Project-to-Skill Mapping)
  const [activeMapProject, setActiveMapProject] = useState(0);

  // Skill Tooltip State
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);

  useEffect(() => {
    const projTarget = 8;
    const prsTarget = 12;
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
      return levelWeight[b.level] - levelWeight[a.level];
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
            An overview of technical depth, engineering trajectory, open source contributions, and production-tested systems.
          </p>
        </div>

        {/* SECTION 1 — RECRUITER SNAPSHOT */}
        <div className="section-block">
          <h3 className="section-title-tag">Recruiter Snapshot</h3>
          <div className="snapshot-grid">
            <div className="snapshot-card glass-panel">
              <div className="snapshot-badge">Role</div>
              <h4>AI / ML Intern</h4>
              <p>Akiyam Solutions & Labmentix</p>
              <span className="snapshot-detail">Building genomics workflows & fine-tuning AI logic pipelines</span>
            </div>
            
            <div className="snapshot-card glass-panel">
              <div className="snapshot-badge">Open Source</div>
              <h4>CNCF Contributor</h4>
              <p>Harbor & Jaeger UI</p>
              <span className="snapshot-detail">Mentee and contributor with merged PRs in CNCF registry upstream</span>
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
              <p>Across Open Repositories</p>
              <span className="snapshot-detail">Code updates merged in global CNCF & payment library codebases</span>
            </div>

            <div className="snapshot-card glass-panel">
              <div className="snapshot-value">{countState.projects}</div>
              <h4>Major Deployed Projects</h4>
              <p>Real-World Applications</p>
              <span className="snapshot-detail">Campus check-ins, safety dashboards, and ATS scanners</span>
            </div>
          </div>
        </div>

        {/* SECTION 2 — WHAT I'M BUILDING (Spotlight Card) */}
        <div className="section-block">
          <div className="spotlight-card glass-panel">
            <div className="spotlight-header">
              <div className="spotlight-indicator">
                <span className="pulse-dot"></span>
                Currently Building
              </div>
              <h3>AlphaGuard AI</h3>
            </div>
            <p className="spotlight-description">
              AI-powered Child Safety Platform focused on monitoring, location intelligence, safety alerts, parental controls, and AI-powered insights.
            </p>
            <div className="spotlight-focus">
              <h4>Current Focus Areas:</h4>
              <div className="focus-tags">
                <span className="focus-tag">AI Systems</span>
                <span className="focus-tag">Backend Engineering</span>
                <span className="focus-tag">Open Source</span>
                <span className="focus-tag">Developer Tooling</span>
                <span className="focus-tag">Scalable Web Applications</span>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3 — DEVELOPER JOURNEY (Timeline) */}
        <div className="section-block">
          <h3 className="section-title-tag">Developer Journey Timeline</h3>
          <div className="journey-timeline">
            <div className="timeline-track"></div>
            {JOURNEY.map((item, idx) => (
              <div className="timeline-node" key={idx}>
                <div className="timeline-dot-wrapper">
                  <div className="timeline-dot"></div>
                </div>
                <div className="timeline-content glass-panel">
                  <div className="timeline-year">{item.year}</div>
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 4 — FEATURED PROJECTS */}
        <div className="section-block">
          <h3 className="section-title-tag">Featured Projects & Tech Stacks</h3>
          <div className="featured-projects-grid">
            {FEATURED_PROJECTS.map((proj, idx) => (
              <div className="project-detail-card glass-panel" key={idx}>
                <div className="proj-header-row">
                  <h4>{proj.name}</h4>
                  <div className="proj-links-wrapper">
                    {proj.github && (
                      <a href={proj.github} target="_blank" rel="noopener noreferrer" className="proj-link-btn" aria-label="View Source Code">
                        <SiGithub /> Code
                      </a>
                    )}
                    {proj.live && (
                      <a href={proj.live} target="_blank" rel="noopener noreferrer" className="proj-link-btn" aria-label="View Live Demo">
                        <TbExternalLink /> Live Demo
                      </a>
                    )}
                  </div>
                </div>
                <div className="proj-tagline">{proj.tagline}</div>
                
                <div className="proj-info-block">
                  <h5>Overview</h5>
                  <p>{proj.overview}</p>
                </div>

                <div className="proj-info-block">
                  <h5>Problem Solved</h5>
                  <p>{proj.problemSolved}</p>
                </div>

                <div className="proj-info-block">
                  <h5>Core Tech Stack</h5>
                  <div className="proj-tech-badges">
                    {proj.techStack.map((tech) => {
                      const Icon = tech.icon;
                      return (
                        <span className="tech-badge" key={tech.name} style={{ "--tech-color": tech.color } as React.CSSProperties}>
                          <Icon className="tech-badge-icon" /> {tech.name}
                        </span>
                      );
                    })}
                  </div>
                </div>

                <div className="proj-info-block">
                  <h5>Architecture Highlights</h5>
                  <p className="architecture-text">{proj.architecture}</p>
                  <ul className="arch-specs">
                    <li><strong>Database:</strong> {proj.database}</li>
                    <li><strong>APIs:</strong> {proj.apis}</li>
                    <li><strong>Deployment:</strong> {proj.deployment}</li>
                  </ul>
                </div>
              </div>
            ))}
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
                  <p>CNCF Harbor Satellite contributor focusing on Docker registry sandbox deployments.</p>
                </div>
                <div className="program-item">
                  <span className="prog-title">C4GT Fellowship</span>
                  <p>Code for Gov Tech Fellow contributing to public digital infrastructure codebases.</p>
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
                              <span className={`tooltip-level-tag level-${skill.level.toLowerCase()}`}>
                                {skill.level}
                              </span>
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

        {/* SECTION 7 — PROJECT TO SKILL MAPPING */}
        <div className="section-block">
          <h3 className="section-title-tag">Project-to-Skill Mapping Explorer</h3>
          <div className="project-mapping-explorer glass-panel">
            <div className="mapping-tabs-sidebar">
              {FEATURED_PROJECTS.map((proj, idx) => (
                <button
                  key={idx}
                  className={`mapping-tab-btn ${activeMapProject === idx ? "tab-active" : ""}`}
                  onClick={() => setActiveMapProject(idx)}
                >
                  0{idx + 1}. {proj.name}
                </button>
              ))}
            </div>

            <div className="mapping-detail-view">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMapProject}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="mapping-content-panel"
                >
                  <h4>{FEATURED_PROJECTS[activeMapProject].name}</h4>
                  <p className="mapping-tagline">{FEATURED_PROJECTS[activeMapProject].tagline}</p>
                  
                  <div className="mapping-specs-grid">
                    <div className="spec-col">
                      <h5>Architecture</h5>
                      <p>{FEATURED_PROJECTS[activeMapProject].architecture}</p>
                    </div>

                    <div className="spec-col">
                      <h5>Database Layer</h5>
                      <p>{FEATURED_PROJECTS[activeMapProject].database}</p>
                    </div>

                    <div className="spec-col">
                      <h5>APIs & Auth</h5>
                      <p>{FEATURED_PROJECTS[activeMapProject].apis} <br /> {FEATURED_PROJECTS[activeMapProject].auth}</p>
                    </div>

                    <div className="spec-col">
                      <h5>Deployment</h5>
                      <p>{FEATURED_PROJECTS[activeMapProject].deployment}</p>
                    </div>
                  </div>

                  <div className="mapping-skills-group">
                    <h5>Demonstrated Engineering Skills:</h5>
                    <div className="mapping-skills-badges">
                      {FEATURED_PROJECTS[activeMapProject].skillsDemonstrated.map((s, index) => (
                        <span className="mapping-skill-badge" key={index}>{s}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TechStack;
