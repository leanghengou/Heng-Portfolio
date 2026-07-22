import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./navigation-style.css";
import logo from "../../../resources/navi-logo.png";
import AboutSlidePanel from "../about-slide-panel/about-slide-panel";

const ArrowRight = () => (
  <svg
    className="nav-arrow"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M5 12h14M13 6l6 6-6 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Projects", to: "/project/start-now-app" },
  { label: "About", to: "/about" },
  { label: "Resume", to: "/resume" },
];

const Navigation = () => {
  const [open, setOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const close = () => setOpen(false);

  // On desktop, the "About" link opens the slide-in panel instead of navigating.
  const handleNavClick = (item) => (e) => {
    if (item.label === "About" && window.matchMedia("(min-width: 901px)").matches) {
      e.preventDefault();
      setAboutOpen(true);
    }
  };

  return (
    <header className="site-nav">
      <div className="nav-inner">
        <div className="nav-left">
          <Link className="nav-brand" to="/" onClick={close}>
            <img src={logo} alt="Heng" />
          </Link>

          <nav className="nav-links">
            {NAV_LINKS.map((item, i) => (
              <React.Fragment key={item.to}>
                {i > 0 && <span className="nav-sep" aria-hidden="true">/</span>}
                <Link to={item.to} onClick={handleNavClick(item)}>
                  {item.label}
                </Link>
              </React.Fragment>
            ))}
          </nav>
        </div>

        <div className="nav-right">
          <a className="nav-contact" href="#contact">
            Get in touch <ArrowRight />
          </a>

          <button
            className={`nav-burger ${open ? "is-open" : ""}`}
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div className={`nav-mobile-menu ${open ? "is-open" : ""}`}>
        <ul>
          {NAV_LINKS.map((item) => (
            <li key={item.to}>
              <Link to={item.to} onClick={close}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <a className="nav-contact nav-contact-mobile" href="#contact" onClick={close}>
          Get in touch <ArrowRight />
        </a>
      </div>

      <AboutSlidePanel open={aboutOpen} onClose={() => setAboutOpen(false)} />
    </header>
  );
};

export default Navigation;
