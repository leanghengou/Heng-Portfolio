import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";
import logo from "../../../resources/navi-logo.png";

const FOOTER_GROUPS = [
  {
    title: "UI/UX Design",
    links: [
      { label: "About", to: "/about" },
      { label: "Resume", to: "/resume" },
      { label: "Contact", to: "/#contact" },
    ],
  },
  {
    title: "Projects",
    links: [
      { label: "Design", to: "/project/start-now-app" },
      { label: "Developement", to: "/project/insper-u" },
      { label: "SEO / AEO / GEO", to: "/project/start-now-app" },
    ],
  },
  {
    title: "Social Media",
    links: [
      { label: "Linkedin", to: "https://www.linkedin.com/" },
      { label: "Github", to: "https://github.com/" },
      { label: "Behance", to: "https://www.behance.net/" },
    ],
  },
];

const FooterLink = ({ item }) => {
  const isExternal = item.to.startsWith("http");

  if (isExternal) {
    return (
      <a href={item.to} target="_blank" rel="noreferrer">
        {item.label}
      </a>
    );
  }

  return <Link to={item.to}>{item.label}</Link>;
};

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="site-width-container footer-inner">
        <div className="footer-brand">
          <Link to="/" className="footer-logo-link" aria-label="Heng homepage">
            <img src={logo} alt="Heng" />
          </Link>
          <p className="footer-copyright">© 2026 Heng</p>
          <p className="footer-tagline">Built in Montreal. Product, design, and code.</p>
        </div>

        <nav className="footer-nav" aria-label="Footer navigation">
          {FOOTER_GROUPS.map((group) => (
            <div className="footer-nav-group" key={group.title}>
              <h2>{group.title}</h2>
              <ul>
                {group.links.map((item) => (
                  <li key={item.label}>
                    <FooterLink item={item} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
