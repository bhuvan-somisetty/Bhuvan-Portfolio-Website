import { motion } from "framer-motion";
import "./styles/Experience.css";

interface Internship {
  company: string;
  role: string;
  duration: string;
  bullets: string[];
  logo: React.ReactNode;
  highlight?: boolean;
}


const Experience = () => {
  // Sleek SVG Logos
  const NeoNexusLogo = (
    <svg width="34" height="34" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="neonexus-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
      <circle cx="16" cy="16" r="14" stroke="url(#neonexus-grad)" strokeWidth="2.5" />
      <path d="M10 22V10L16 16L22 10V22" stroke="url(#neonexus-grad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  const LeadershipLogo = (
    <svg width="34" height="34" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="lead-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
      </defs>
      <circle cx="16" cy="16" r="14" stroke="url(#lead-grad)" strokeWidth="2.5" />
      <path d="M16 8L18.2 13.6L24 14.2L19.6 18.1L20.9 24L16 21L11.1 24L12.4 18.1L8 14.2L13.8 13.6Z" stroke="url(#lead-grad)" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );

  const internships: Internship[] = [
    {
      company: "NeoNexus Innovations LLP",
      role: "Software Development Intern",
      duration: "June 2026 – September 2026 · 3 months",
      logo: NeoNexusLogo,
      bullets: [
        "Collaborated on the development of scalable web applications using React, TypeScript, and Node.js.",
        "Enhanced user experiences by implementing responsive layouts, smooth transitions, and premium modern UI components.",
        "Optimized application loading times and API response handling, improving overall application performance by 25%.",
        "Participated in code reviews and agile methodologies to ensure clean code structure and rapid deployment cycles.",
      ],
    },
    {
      company: "Polaris School of Technology",
      role: "Hostel & Mess Affairs Secretary (Leadership)",
      duration: "February 2026 – Present",
      logo: LeadershipLogo,
      highlight: true,
      bullets: [
        "Responsible for hostel and mess affairs for students.",
        "Built the QR Complaint and Feedback System so residents can report hostel and mess issues.",
      ],
    },
  ];

  return (
    <div className="experience-section section-container" id="experience">
      <div className="experience-container">
        {/* Section Header */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Professional <span>Experience</span>
        </motion.h2>

        <motion.p
          className="experience-description"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
        >
          Industry experience building scalable web applications, plus student leadership at Polaris School of Technology.
        </motion.p>

        {/* Experience Grid */}
        <div className="experience-grid">
          {internships.map((internship, index) => (
            <motion.div
              key={internship.company}
              className={`experience-card${internship.highlight ? " experience-card-highlight" : ""}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.15 }}
            >
              <div>
                <div className="experience-card-header">
                  <div className="experience-logo-wrapper">{internship.logo}</div>
                  <div className="experience-title-info">
                    <h3>{internship.company}</h3>
                    <h4>{internship.role}</h4>
                  </div>
                </div>

                {internship.highlight && <span className="experience-badge">Leadership</span>}
                <span className="experience-duration">{internship.duration}</span>

                <ul className="experience-bullets">
                  {internship.bullets.map((bullet, idx) => (
                    <li key={idx}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;
