import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import "./underlay-nav.css";
import ResumePopup from "../resume-popup/resume-popup";
import hengLogo from "../../../resources/heng-logo.png";

// Menu items mapped to real routes. `to: null` = placeholder (no route yet).
// `popup: "resume"` opens the resume popup instead of navigating.
const MENU = [
  { label: "Home", to: "/" },
  { label: "Projects", to: "/projects" },
  { label: "About", to: "/about" },
  { label: "Resume", popup: "resume" },
  { label: "Services", to: null },
  { label: "Contact", to: null },
];

gsap.registerPlugin(CustomEase);

// Osmo "fixed underlay" navigation. The menu is revealed by sliding the whole
// page content ([data-main]) to the left. Ported from the vanilla snippet into
// a React effect; component-internal nodes are scoped to the root ref, and the
// external [data-main] content wrapper is queried from the document.
const UnderlayNav = () => {
  const rootRef = useRef(null);
  const closeRef = useRef(null); // set inside the effect; closes the menu if open
  const location = useLocation();
  const [resumeOpen, setResumeOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Tint + blur the bar once the page is scrolled off the top. Lenis drives the
  // native scroll position, so a plain window listener covers both.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!CustomEase.get("energy")) {
      CustomEase.create("energy", "M0,0 C0.32,0.72 0,1 1,1");
    }

    const root = rootRef.current;
    if (!root) return undefined;

    const toggleBtn = root.querySelector("[data-underlay-nav-toggle]");
    const toggleLabels = root.querySelectorAll(".underlay-nav__toggle-label");
    const toggleBars = root.querySelectorAll(".underlay-nav__toggle-bar");
    const menuEl = root.querySelector("[data-underlay-nav-menu]");
    const largeItems = root.querySelectorAll("[data-reveal-l]");
    const smallItems = root.querySelectorAll("[data-reveal-s]");
    const menuBorder = root.querySelector(".underlay-nav__bottom-border");
    const mainEl = document.querySelector("[data-main]");
    const overlayEl = root.querySelector("[data-underlay-nav-overlay]");
    const darkEl = root.querySelector(".underlay-nav__dark");
    const corners = root.querySelectorAll(".underlay-nav__corner");
    const overlayBorders = root.querySelectorAll(".underlay-nav__border-row");

    if (!toggleBtn || !menuEl || !mainEl || !overlayEl) return undefined;

    const closedColor = getComputedStyle(toggleBtn).color;
    const openColor = getComputedStyle(menuEl).color;

    let isOpen = false;
    let tl;
    let enterEndTime = 0;
    let resizeTimer;

    const getMenuOffset = () => -menuEl.offsetWidth;

    gsap.set(overlayEl, { visibility: "hidden", pointerEvents: "none" });
    gsap.set(darkEl, { autoAlpha: 0 });
    // No inline transform on mainEl at rest — see the comment in
    // underlay-nav.css for why (it would break position: sticky sitewide).
    gsap.set(toggleLabels, { yPercent: 0 });
    gsap.set(toggleBars, { y: 0, rotation: 0 });
    gsap.set(menuBorder, { scaleX: 0 });
    gsap.set(overlayBorders[0], { yPercent: -100 });
    gsap.set(overlayBorders[1], { yPercent: 100 });
    gsap.set(corners, { scale: 0 });

    // Both paths that land mainEl back at rest (fully closed): finishing the
    // close animation, or reversing out of an in-progress open animation.
    // Strip the inline transform so position: sticky works again for the
    // rest of the site while the menu is closed.
    function restMainEl() {
      gsap.set(mainEl, { clearProps: "transform" });
    }

    function buildTimeline() {
      tl = gsap.timeline({
        paused: true,
        defaults: { ease: "energy", easeReverse: "power2.inOut" },
        onComplete: restMainEl,
        onReverseComplete: restMainEl,
      });

      tl.set(overlayEl, { visibility: "visible", pointerEvents: "auto" }, 0);

      tl.to([mainEl, overlayEl], { x: getMenuOffset, duration: 0.7 }, 0)
        .to(darkEl, { autoAlpha: 1, duration: 0.5 }, 0)
        .to(corners, { scale: 1, duration: 0.5 }, 0)
        .to(overlayBorders, { yPercent: 0, duration: 0.5 }, 0)
        .to(toggleLabels, { yPercent: -100, duration: 0.4 }, 0)
        .to(toggleBtn, { color: openColor, duration: 0.4 }, 0)
        .to(
          toggleBars[0],
          {
            y: "0.25em",
            rotation: 45,
            duration: 0.35,
            ease: "back.out(1.4)",
            easeReverse: "power3.out",
          },
          0.05
        )
        .to(
          toggleBars[1],
          {
            y: "-0.25em",
            rotation: -45,
            duration: 0.35,
            ease: "back.out(1.4)",
            easeReverse: "power3.out",
          },
          0.05
        )
        .fromTo(
          largeItems,
          { autoAlpha: 0, xPercent: 25 },
          { autoAlpha: 1, xPercent: 0, duration: 0.7, stagger: 0.05 },
          0
        )
        .fromTo(
          smallItems,
          { autoAlpha: 0, yPercent: 100 },
          {
            autoAlpha: 1,
            yPercent: 0,
            duration: 0.5,
            stagger: 0.03,
            ease: "power3.out",
          },
          0.3
        )
        .to(menuBorder, { scaleX: 1, duration: 0.5 }, "<");

      enterEndTime = tl.duration();

      tl.addPause();

      tl.to([largeItems, smallItems], { autoAlpha: 0, duration: 0.3 }, "<")
        .to([mainEl, overlayEl], { x: 0, duration: 0.6 }, "<")
        .to(darkEl, { autoAlpha: 0, duration: 0.35, ease: "power2.inOut" }, "<")
        .to(corners, { scale: 0, duration: 0.5 }, "<")
        .to(overlayBorders[0], { yPercent: -100, duration: 0.5 }, "<")
        .to(overlayBorders[1], { yPercent: 100, duration: 0.5 }, "<")
        .to(toggleBtn, { color: closedColor, duration: 0.25 }, "<+=0.1")
        .to(toggleLabels, { yPercent: 0, duration: 0.25, ease: "power3.in" }, "<")
        .to(
          toggleBars,
          { y: 0, rotation: 0, duration: 0.25, ease: "power3.in" },
          "<"
        )
        .set(overlayEl, { visibility: "hidden", pointerEvents: "none" });
    }

    function toggle() {
      isOpen = !isOpen;
      toggleBtn.setAttribute("aria-expanded", String(isOpen));
      toggleBtn.setAttribute("aria-label", isOpen ? "close menu" : "open menu");
      document.body.setAttribute("data-menu-status", isOpen ? "open" : "");

      // lock/unlock smooth scroll while the menu is open
      if (window.__lenis) {
        if (isOpen) window.__lenis.stop();
        else window.__lenis.start();
      }

      if (isOpen) {
        tl.invalidate();
        if (tl.time() >= enterEndTime) tl.timeScale(1).restart();
        else tl.timeScale(1).play();
      } else if (tl.time() < enterEndTime) {
        tl.timeScale(1).reverse();
      } else {
        tl.timeScale(1).play();
      }
    }

    function onOverlayClick() {
      if (isOpen) toggle();
    }

    // Let React (menu link clicks) close the menu.
    closeRef.current = () => {
      if (isOpen) toggle();
    };

    function onKeydown(e) {
      if (e.key === "Escape" && isOpen) {
        toggle();
        toggleBtn.focus();
      }
    }

    function onResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (isOpen) gsap.set([mainEl, overlayEl], { x: getMenuOffset() });
        else tl.invalidate();
      }, 150);
    }

    buildTimeline();

    toggleBtn.addEventListener("click", toggle);
    overlayEl.addEventListener("click", onOverlayClick);
    document.addEventListener("keydown", onKeydown);
    window.addEventListener("resize", onResize);

    return () => {
      clearTimeout(resizeTimer);
      toggleBtn.removeEventListener("click", toggle);
      overlayEl.removeEventListener("click", onOverlayClick);
      document.removeEventListener("keydown", onKeydown);
      window.removeEventListener("resize", onResize);
      if (tl) tl.kill();
      // reset any layout the nav mutated outside itself
      restMainEl();
      document.body.removeAttribute("data-menu-status");
      if (window.__lenis) window.__lenis.start();
    };
  }, []);

  return (
    <div className="underlay-nav" ref={rootRef}>
      <header className="underlay-nav__header">
        <div
          className={`underlay-nav__bar${scrolled ? " is--scrolled" : ""}`}
        >
          <div className="underlay-nav__container site-width-container">
            <a href="/" className="underlay-nav__logo">
              <img
                src={hengLogo}
                alt="Heng"
                className="underlay-nav__logo-img"
              />
            </a>
            <button
              data-underlay-nav-toggle
              aria-expanded="false"
              aria-label="open menu"
              className="underlay-nav__toggle"
            >
              <span className="underlay-nav__toggle-text">
                <span className="underlay-nav__toggle-label">Menu</span>
                <span className="underlay-nav__toggle-label">Close</span>
              </span>
              <span className="underlay-nav__toggle-icon">
                <span className="underlay-nav__toggle-bar" />
                <span className="underlay-nav__toggle-bar" />
              </span>
            </button>
          </div>
        </div>
      </header>
      <nav data-underlay-nav-menu className="underlay-nav__menu">
        <div className="underlay-nav__inner">
          <ul className="underlay-nav__list">
            {MENU.map((item) => {
              const isCurrent = item.to && location.pathname === item.to;
              const className = `underlay-nav__link-large${
                isCurrent ? " w--current" : ""
              }`;
              return (
                <li data-reveal-l key={item.label}>
                  {item.popup ? (
                    <button
                      type="button"
                      className={className}
                      onClick={() => {
                        closeRef.current && closeRef.current();
                        if (item.popup === "resume") setResumeOpen(true);
                      }}
                    >
                      <span className="underlay-nav__link-label">
                        {item.label}
                      </span>
                    </button>
                  ) : item.to ? (
                    <Link
                      to={item.to}
                      aria-current={isCurrent ? "page" : undefined}
                      className={className}
                      onClick={() => closeRef.current && closeRef.current()}
                    >
                      <span className="underlay-nav__link-label">
                        {item.label}
                      </span>
                    </Link>
                  ) : (
                    <a href="#" className="underlay-nav__link-large">
                      <span className="underlay-nav__link-label">
                        {item.label}
                      </span>
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
          <div className="underlay-nav__bottom">
            <div className="underlay-nav__bottom-col">
              <div data-reveal-s>
                <span className="underlay-nav__link-small is--faded">
                  Socials
                </span>
              </div>
              <ul className="underlay-nav__list is--small">
                <li data-reveal-s>
                  <a href="#" className="underlay-nav__link-small">
                    Instagram
                  </a>
                </li>
                <li data-reveal-s>
                  <a href="#" className="underlay-nav__link-small">
                    LinkedIn
                  </a>
                </li>
                <li data-reveal-s>
                  <a href="#" className="underlay-nav__link-small">
                    X/Twitter
                  </a>
                </li>
              </ul>
            </div>
            <div className="underlay-nav__bottom-col">
              <div data-reveal-s>
                <span className="underlay-nav__link-small is--faded">
                  Quick Links
                </span>
              </div>
              <ul className="underlay-nav__list is--small">
                <li data-reveal-s>
                  <a href="#" className="underlay-nav__link-small">
                    Privacy Policy ↗
                  </a>
                </li>
                <li data-reveal-s>
                  <a href="#" className="underlay-nav__link-small">
                    Terms &amp; Conditions ↗
                  </a>
                </li>
              </ul>
            </div>
            <div className="underlay-nav__bottom-border" />
          </div>
        </div>
      </nav>
      <div data-underlay-nav-overlay className="underlay-nav__overlay">
        <div className="underlay-nav__dark" />
        <div className="underlay-nav__borders">
          <div className="underlay-nav__border-row">
            <div className="underlay-nav__border" />
            <div className="underlay-nav__corner" />
          </div>
          <div className="underlay-nav__border-row">
            <div className="underlay-nav__corner is--bottom" />
            <div className="underlay-nav__border" />
          </div>
        </div>
      </div>

      <ResumePopup open={resumeOpen} onClose={() => setResumeOpen(false)} />
    </div>
  );
};

export default UnderlayNav;
