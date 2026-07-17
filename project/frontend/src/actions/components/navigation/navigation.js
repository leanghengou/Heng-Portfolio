import React, { useState } from "react";
import "./navigation-style.css";

const Navigation = () => {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <header className="site-nav">
      <nav className={`nav-pill ${open ? "is-open" : ""}`}>
        <div className="nav-bar">
          <a className="nav-logo" href="/" aria-label="Home">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" fill="currentColor" />
              <path
                d="M2 12l10 5 10-5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              <path
                d="M2 17l10 5 10-5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </a>

          <ul className="nav-links">
            <li><a href="/">Pricing</a></li>
            <li><a href="/">Blog</a></li>
            <li><a href="/">Careers</a></li>
          </ul>

          <span className="nav-divider" />

          <a className="nav-login" href="/">Login</a>

          <a className="nav-cta" href="/">
            Get Started <span className="nav-cta-arrow">&rarr;</span>
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

        <div className="nav-mobile-menu">
          <ul>
            <li><a href="/" onClick={closeMenu}>Pricing</a></li>
            <li><a href="/" onClick={closeMenu}>Blog</a></li>
            <li><a href="/" onClick={closeMenu}>Careers</a></li>
            <li><a href="/" onClick={closeMenu}>Login</a></li>
          </ul>
          <a className="nav-cta nav-cta-mobile" href="/" onClick={closeMenu}>
            Get Started <span className="nav-cta-arrow">&rarr;</span>
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
