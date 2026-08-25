import React, { useEffect, useState } from "react";
import "./resume-popup.css";

const ChevronIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 16 16"
    width="12"
    height="12"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M3.5 6l4.5 4.5L12.5 6"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const RESUME_PDF = "/leangheng-ou-resume.pdf";

const EXPERIENCE = [
  {
    title: "Freelance Designer / Developer + SEO",
    company: "Self-employed · Freelance",
    dates: "May 2026 – Present · Montreal, QC",
    bullets: [
      "Design and build Shopify storefronts and custom features for direct clients, from UX through frontend implementation.",
      "Recent work includes a custom loyalty program, dynamic cart rewards, and Klaviyo-integrated cart recovery for Decorolala.",
    ],
  },
  {
    title: "UI/UX Designer & Frontend Developer",
    company: "EZShop · Full-time",
    dates: "Mar 2022 – Mar 2026 · Montreal, QC",
    bullets: [
      "Designed end-to-end UI/UX for e-commerce clients on Shopify, delivering polished storefronts in Figma.",
      "Built and maintained responsive frontends for multiple client websites.",
      "Improved site performance, technical SEO, and conversion rates across client accounts.",
      "Collaborated with clients to deliver custom web solutions tailored to their brand and business goals.",
    ],
  },
  {
    title: "Graphic Designer",
    company: "Vasco Design International · Contract",
    dates: "Jul 2021 – Oct 2021 · Montreal, QC",
    bullets: [
      "Developed brand identity assets and marketing collateral for client campaigns.",
      "Ensured visual consistency across print and digital deliverables.",
    ],
  },
  {
    title: "UI Designer",
    company: "Blü Creative · Internship",
    dates: "Mar 2021 – Jul 2021 · Montreal, QC",
    bullets: [
      "Contributed to UI design projects and web concepts in collaboration with the creative team.",
      "Produced wireframes and prototypes to communicate design intent.",
    ],
  },
  {
    title: "Graphic Designer",
    company: "iagree AI · Internship",
    dates: "Oct 2020 – Nov 2020 · Montreal, QC",
    bullets: [
      "Created illustrations and visual assets to support product and marketing initiatives.",
    ],
  },
];

const EDUCATION = [
  {
    title: "Diploma, Full Stack Web Development",
    meta: "2022",
    school: "Concordia University",
    description:
      "Intensive full-stack program covering HTML, CSS, JavaScript, React, Node.js, Express, and MongoDB, built around shipping complete web applications from database to interface.",
  },
  {
    title: "Associate's Degree, Graphic Design",
    meta: "Apr 2019 – Nov 2020",
    school: "Shadd Health & Business Centre",
    description:
      "Studied typography, layout, branding, and production for both print and digital across the Adobe suite, building the visual foundation I still design interfaces on today.",
  },
];

const SKILLS = [
  { label: "Frontend", items: ["HTML/CSS", "JavaScript", "TypeScript", "React.js", "Node.js", "Express.js", "MongoDB"] },
  { label: "Design", items: ["Figma", "Adobe Illustrator", "Adobe InDesign", "User Interface Design", "Branding & Identity"] },
  { label: "CMS & Tools", items: ["WordPress", "Shopify Liquid", "Webflow", "Elementor", "Duda", "Rain (Lightspeed)", "Git & GitHub", "DNS & Domain Management"] },
  { label: "SEO & Growth", items: ["Technical SEO", "Search Engine Optimisation", "Conversion Rate Optimisation", "Performance & SEO"] },
];

const LANGUAGES = [
  { label: "English", level: "Full Professional Proficiency" },
  { label: "French", level: "Professional Working Proficiency" },
];

const ResumePopup = ({ open, onClose }) => {
  // Collapsed by default; holds the labels of currently-expanded categories.
  const [openSkills, setOpenSkills] = useState(() => new Set());
  const toggleSkill = (label) => {
    setOpenSkills((prev) => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Lock the page (stop Lenis + freeze html/body) while the popup is open
  useEffect(() => {
    if (!open) return;
    const lenis = window.__lenis;
    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.overflow;
    const prevBody = body.style.overflow;

    lenis?.stop();
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";

    return () => {
      lenis?.start();
      html.style.overflow = prevHtml;
      body.style.overflow = prevBody;
    };
  }, [open]);

  return (
    <div className={`resume-popup-root ${open ? "is-open" : ""}`} aria-hidden={!open}>
      <div className="resume-popup-backdrop" onClick={onClose} data-lenis-prevent />

      {/* .resume-popup-frame carries the shape/scale animation; it never
          scrolls, so the close button (an absolute child of it, not of the
          scrolling grid) stays put while the grid below scrolls internally. */}
      <div className="resume-popup-frame">
        <div className="resume-popup-actions">
          <a className="resume-popup-download" href={RESUME_PDF} download>
            Download PDF
          </a>
          <button className="resume-popup-close" onClick={onClose}>
            Close tab <span aria-hidden="true">✕</span>
          </button>
        </div>

        <div
          className="resume-popup"
          role="dialog"
          aria-modal="true"
          aria-label="Resume"
        >
        <div className="resume-popup-col resume-popup-col-left" data-lenis-prevent>
          <h1 className="resume-popup-name">
            Heng <span className="resume-popup-name-full">Leangheng Ou</span>
          </h1>
          <p className="resume-popup-bio">
            UI/UX Designer &amp; Frontend Developer with 4+ years of experience
            designing and building websites and e-commerce stores. Based in
            Montreal, specializing in Shopify, frontend development, technical
            SEO, and conversion-focused user experiences.
          </p>

          {EXPERIENCE.map((job, i) => (
            <div className="resume-popup-entry" key={i}>
              <h3 className="resume-popup-entry-title">{job.title}</h3>
              <p className="resume-popup-entry-dates">
                {job.company}
                <br />
                {job.dates}
              </p>
              <ul className="resume-popup-entry-bullets">
                {job.bullets.map((bullet, bi) => (
                  <li key={bi}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="resume-popup-col resume-popup-col-right" data-lenis-prevent>
          <h1 className="resume-popup-heading">Education</h1>

          {EDUCATION.map((school, i) => (
            <div className="resume-popup-entry" key={i}>
              <h3 className="resume-popup-entry-title">{school.title}</h3>
              <p className="resume-popup-entry-dates">
                {school.school}
                <br />
                {school.meta}
              </p>
              {school.description && (
                <p className="resume-popup-entry-body">{school.description}</p>
              )}
            </div>
          ))}

          <div className="resume-popup-entry">
            <h3 className="resume-popup-section-title">Skills</h3>
            <div className="resume-popup-accordion">
              {SKILLS.map((group) => {
                const isOpen = openSkills.has(group.label);
                const slug = group.label.toLowerCase().replace(/[^a-z0-9]+/g, "-");
                const panelId = `resume-skill-panel-${slug}`;
                const triggerId = `resume-skill-trigger-${slug}`;
                return (
                  <div className="resume-popup-accordion-item" key={group.label}>
                    <button
                      type="button"
                      id={triggerId}
                      className="resume-popup-accordion-trigger"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => toggleSkill(group.label)}
                    >
                      <span>{group.label}</span>
                      <ChevronIcon
                        className={`resume-popup-accordion-chevron${
                          isOpen ? " is-open" : ""
                        }`}
                      />
                    </button>
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={triggerId}
                      className={`resume-popup-accordion-panel${
                        isOpen ? " is-open" : ""
                      }`}
                    >
                      <div className="resume-popup-accordion-panel-inner">
                        <div className="resume-popup-pills">
                          {group.items.map((skill, si) => (
                            <span className="resume-popup-pill" key={si}>
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="resume-popup-entry no-border">
            <h3 className="resume-popup-section-title">Languages</h3>
            {LANGUAGES.map((lang, i) => (
              <p className="resume-popup-language" key={i}>
                <strong>{lang.label}</strong>: {lang.level}
              </p>
            ))}
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePopup;
