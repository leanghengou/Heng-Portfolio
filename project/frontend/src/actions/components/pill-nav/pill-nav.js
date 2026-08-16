import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./pill-nav.css";
import ResumePopup from "../resume-popup/resume-popup";
import { PROJECTS, FILTERS } from "../../../pages/projects";
import hengAvatar from "../../../resources/heng-favicon.png";

// Right-hand pill row. `to` = route link, `popup` = opens an overlay instead of
// navigating, `hash` = same-page anchor, `status` = green availability dot,
// `mega` = hovering opens the projects mega menu (the pill still navigates).
const ITEMS = [
  { label: "Projects", to: "/projects", mega: true },
  { label: "Resume", popup: "resume", plus: true },
  { label: "About", to: "/about" },
  // Matches the footer's existing "/#contact" link. See note in pill-nav.css.
  { label: "Contact", hash: "/#contact", status: true },
];

// One column per category, in the order they read across the menu. Both the
// labels and the /projects/<slug> routes come from the listing page's own
// FILTERS, so a category added there shows up here automatically.
const MEGA_COLUMNS = ["development", "design", "ecommerce", "seo"].map((slug) =>
  FILTERS.find((f) => f.slug === slug)
);

// Hover intent. OPEN_DELAY means a pointer merely crossing the bar on its way
// somewhere else doesn't throw up an overlay and lock the page; CLOSE_DELAY
// covers the ~20px gap between the pill and the panel, which would otherwise
// register as a mouseleave mid-reach.
const OPEN_DELAY = 130;
const CLOSE_DELAY = 180;

// Checked at event time, not render time, so a resize or a hybrid device
// (touchscreen laptop) is read correctly on each interaction.
const canHover = () => window.matchMedia("(hover: hover)").matches;

const PillNav = () => {
  const location = useLocation();
  const [resumeOpen, setResumeOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);

  const hoverTimer = useRef(null);

  // Only one overlay at a time — both lock page scroll, and whichever unmounted
  // second would otherwise restore `overflow` while the other still needs it.
  const openMega = () => {
    clearTimeout(hoverTimer.current);
    setResumeOpen(false);
    setMegaOpen(true);
  };
  const openResume = () => {
    clearTimeout(hoverTimer.current);
    setMegaOpen(false);
    setResumeOpen(true);
  };
  const closeMega = () => {
    clearTimeout(hoverTimer.current);
    setMegaOpen(false);
  };

  // Both sides of the hover are deferred: the pill and the panel are separate
  // top-level elements, so crossing between them fires a real mouseleave.
  const hoverOpen = () => {
    if (!canHover()) return;
    clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(openMega, OPEN_DELAY);
  };
  const hoverClose = () => {
    if (!canHover()) return;
    clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setMegaOpen(false), CLOSE_DELAY);
  };
  const hoverKeep = () => {
    if (!canHover()) return;
    clearTimeout(hoverTimer.current);
  };

  useEffect(() => () => clearTimeout(hoverTimer.current), []);

  // Tint + blur the bar once the page is scrolled off the top. Lenis drives the
  // native scroll position, so a plain window listener covers both.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // A route change while these are open would leave them stranded over the new
  // page, so close them on navigate.
  useEffect(() => {
    setResumeOpen(false);
    setMegaOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!megaOpen) return undefined;
    const onKeydown = (e) => {
      if (e.key === "Escape") closeMega();
    };
    document.addEventListener("keydown", onKeydown);
    return () => document.removeEventListener("keydown", onKeydown);
  }, [megaOpen]);

  // Lock the page (stop Lenis + freeze html/body) while the menu is open —
  // same approach as resume-popup.js, so the two behave identically.
  useEffect(() => {
    if (!megaOpen) return undefined;
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
  }, [megaOpen]);

  return (
    <>
      {/* Full-screen dim behind the panel. z-index sits just under the bar so
          the nav stays legible above it, like the resume popup's backdrop. */}
      <div
        className={`pill-nav__backdrop${megaOpen ? " is--open" : ""}`}
        onClick={closeMega}
        onMouseEnter={hoverClose}
        aria-hidden="true"
      />

      <header
        className={`site-width-container pill-nav${
          scrolled ? " is--scrolled" : ""
        }`}
      >
        <Link to="/" className="pill-nav__avatar" aria-label="Heng — home">
          <img src={hengAvatar} alt="" className="pill-nav__avatar-img" />
        </Link>

        <nav className="pill-nav__items" aria-label="Main">
          {ITEMS.map((item) => {
            const isCurrent = item.to && location.pathname === item.to;
            const inner = (
              <>
                {item.status && <span className="pill-nav__status" />}
                <span className="pill-nav__label">{item.label}</span>
                {item.plus && (
                  <span className="pill-nav__plus" aria-hidden="true">
                    +
                  </span>
                )}
              </>
            );

            if (item.mega) {
              return (
                <Link
                  key={item.label}
                  to={item.to}
                  aria-current={isCurrent ? "page" : undefined}
                  aria-expanded={megaOpen}
                  className={`pill-nav__pill${megaOpen ? " is--open" : ""}${
                    location.pathname.startsWith("/projects")
                      ? " is--current"
                      : ""
                  }`}
                  onMouseEnter={hoverOpen}
                  onMouseLeave={hoverClose}
                  // Keyboard users get no hover, so focus opens it directly.
                  onFocus={openMega}
                  onClick={(e) => {
                    // Where hover exists, clicking through to /projects is the
                    // point. On touch there's no hover to open the panel with,
                    // so the tap toggles it instead of navigating.
                    if (!canHover()) {
                      e.preventDefault();
                      megaOpen ? closeMega() : openMega();
                    }
                  }}
                >
                  {inner}
                </Link>
              );
            }

            if (item.popup) {
              const isOpen = resumeOpen && item.popup === "resume";
              return (
                <button
                  key={item.label}
                  type="button"
                  className={`pill-nav__pill${isOpen ? " is--open" : ""}`}
                  aria-expanded={isOpen}
                  onClick={() =>
                    isOpen ? setResumeOpen(false) : openResume()
                  }
                >
                  {inner}
                </button>
              );
            }

            if (item.hash) {
              return (
                <a key={item.label} href={item.hash} className="pill-nav__pill">
                  {inner}
                </a>
              );
            }

            return (
              <Link
                key={item.label}
                to={item.to}
                aria-current={isCurrent ? "page" : undefined}
                className={`pill-nav__pill${isCurrent ? " is--current" : ""}`}
              >
                {inner}
              </Link>
            );
          })}
        </nav>
      </header>

      {/* Sits outside <header> on purpose: .pill-nav__items scrolls
          horizontally on mobile and would clip a nested panel, and a
          backdrop-filtered ancestor would trap position:fixed children.
          .site-width-container supplies the width/centring — don't set width
          here too, it'd collide with that class at equal specificity. */}
      <div
        className={`site-width-container pill-nav__mega${
          megaOpen ? " is--open" : ""
        }`}
        aria-hidden={!megaOpen}
        data-lenis-prevent
        onMouseEnter={hoverKeep}
        onMouseLeave={hoverClose}
      >
        <div className="pill-nav__mega-grid">
          {MEGA_COLUMNS.map((col) => {
            const items = PROJECTS.filter((p) => p.tags.includes(col.value));
            return (
              <div className="pill-nav__mega-col" key={col.slug}>
                <span className="pill-nav__mega-eyebrow">Project</span>
                <Link
                  to={`/projects/${col.slug}`}
                  className="pill-nav__mega-title"
                  tabIndex={megaOpen ? undefined : -1}
                >
                  {col.short || col.label}
                </Link>

                {/* Rule doubles as the list separator — no list, no rule. */}
                {items.length > 0 && <span className="pill-nav__mega-rule" />}

                <ul className="pill-nav__mega-list">
                  {items.map((p) => (
                    <li key={p.title}>
                      {/* Matches the listing page: no slug means no case study
                          to link to yet, so it renders as plain text. */}
                      {p.slug ? (
                        <Link
                          to={`/project/${p.slug}`}
                          className="pill-nav__mega-item"
                          tabIndex={megaOpen ? undefined : -1}
                        >
                          <span className="pill-nav__mega-item-title">
                            {p.title}
                          </span>
                          <span className="pill-nav__mega-item-desc">
                            {p.desc}
                          </span>
                        </Link>
                      ) : (
                        <span className="pill-nav__mega-item is--static">
                          <span className="pill-nav__mega-item-title">
                            {p.title}
                          </span>
                          <span className="pill-nav__mega-item-desc">
                            {p.desc}
                          </span>
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="pill-nav__mega-foot">
          <Link
            to="/projects"
            className="pill-nav__mega-all"
            tabIndex={megaOpen ? undefined : -1}
          >
            All projects <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>

      <ResumePopup open={resumeOpen} onClose={() => setResumeOpen(false)} />
    </>
  );
};

export default PillNav;
