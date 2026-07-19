import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./navigation-style.css";

const Chevron = () => (
  <svg
    className="nav-chevron"
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M6 9l6 6 6-6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Logo = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path d="M12 2L2 7l10 5 10-5-10-5z" fill="currentColor" />
    <path
      d="M2 12l10 5 10-5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2 17l10 5 10-5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const PROJECTS = [{ label: "Start Now", to: "/project/start-now-app" }];

const Navigation = () => {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="site-nav">
      <div className="nav-inner">
        <div className="nav-left">
          <Link className="nav-brand" to="/">
            <Logo />
            <span>Heng</span>
          </Link>

          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/resume">Resume</Link></li>
            <li className="nav-dropdown">
              <button className="nav-dropdown-toggle" type="button">
                Projects <Chevron />
              </button>
              <ul className="nav-dropdown-menu">
                {PROJECTS.map((p) => (
                  <li key={p.to}>
                    <Link to={p.to}>{p.label}</Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </div>

        <div className="nav-right">
          <a className="nav-contact" href="#contact">Get in touch</a>

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
          <li><Link to="/" onClick={close}>Home</Link></li>
          <li><Link to="/resume" onClick={close}>Resume</Link></li>
          <li className="nav-mobile-group">Projects</li>
          {PROJECTS.map((p) => (
            <li key={p.to}>
              <Link className="nav-mobile-sub" to={p.to} onClick={close}>
                {p.label}
              </Link>
            </li>
          ))}
        </ul>
        <a className="nav-contact nav-contact-mobile" href="#contact" onClick={close}>
          Get in touch
        </a>
      </div>
    </header>
  );
};

export default Navigation;
