import './site-main.css'
import {BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom"
import Navigation from "./actions/components/navigation/navigation"
// import UnderlayNav from "./actions/components/underlay-nav/underlay-nav"
import PillNav from "./actions/components/pill-nav/pill-nav"
import Cursor from "./actions/components/cursor/cursor"
import CtaScramble from "./actions/components/cta-scramble/cta-scramble"
import PageTransition from "./actions/components/page-transition/page-transition"
import Homepage from './pages/homepage';
import About from './pages/about';
import Footer from "./actions/components/footer/footer"
import Resume from './pages/resume';
import { useEffect, useRef, useState } from "react";
import Lenis from "@studio-freight/lenis";
import ProjectPage from './pages/projectPageTemplate';
import Projects from './pages/projects';
import ProjectsCategory from './pages/projectsCategory';
import PostersGallery from './pages/posters-gallery';

// Routes that own the whole viewport. The posters gallery is a full-screen
// drag surface, so a footer underneath it only gives the page something to
// scroll down to.
const FOOTERLESS_ROUTES = ["/project/30-days-of-daily-posters/gallery"];

const hasFooter = (pathname) =>
  !FOOTERLESS_ROUTES.includes(pathname.replace(/\/+$/, "") || "/");

// Everything that needs the router lives here (useLocation must be inside <Router>).
function AppInner() {
  const location = useLocation();
  // The location actually rendered. It lags behind `location` while the pixel
  // wipe covers the screen, so the page swap happens hidden behind the overlay.
  const [displayLocation, setDisplayLocation] = useState(location);
  const overlayRef = useRef(null);

  useEffect(() => {
    if (location === displayLocation) return undefined;

    let cancelled = false;
    (async () => {
      await overlayRef.current?.cover(); // pixel grid sweeps on, hiding the page
      if (cancelled) return;

      setDisplayLocation(location); // swap route underneath the cover
      window.scrollTo(0, 0);
      if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true });

      // let the new page paint before revealing it
      await new Promise((r) =>
        requestAnimationFrame(() => requestAnimationFrame(r))
      );
      if (cancelled) return;

      await overlayRef.current?.uncover(); // pixel grid sweeps off
    })();

    return () => {
      cancelled = true;
    };
    // Intentionally only on `location`: setDisplayLocation happens inside and
    // must not re-trigger / cancel the in-flight transition.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <div className="app-shell">
      {/* <Navigation /> and <UnderlayNav /> are parked — still on disk, not mounted. */}
      <PillNav />
      <Cursor />{/* outside [data-main] so a nav transform can't break position:fixed */}
      <CtaScramble />{/* text-scramble hover effect on all CTA buttons */}
      <PageTransition ref={overlayRef} />

      {/* [data-main] is the content the underlay nav slides left to reveal */}
      <div data-main className="app-underlay-main">
        <div className="app-main">
          <Routes location={displayLocation}>
            <Route path="/" element={<Homepage />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:category" element={<ProjectsCategory />} />
            <Route path="/about" element={<About />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/project/:slug" element={<ProjectPage />} />
            {/* Sits above /project/:slug — 3 segments, so no overlap with it. */}
            <Route
              path="/project/30-days-of-daily-posters/gallery"
              element={<PostersGallery />}
            />
          </Routes>
        </div>

        {/* Keyed off displayLocation, not location, so the footer disappears
            behind the transition overlay along with the page swap. */}
        {hasFooter(displayLocation.pathname) && <Footer />}
      </div>
    </div>
  );
}

function App() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1,
      smoothWheel: true,
      smoothTouch: false,
      wheelMultiplier: 1.0,
      easing: (t) => 1 - Math.pow(1 - t, 3),
    });

    // Expose so modals/overlays can lock scrolling while open
    window.__lenis = lenis;

    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      if (window.__lenis === lenis) window.__lenis = null;
    };
  }, []);

  return (
    <Router>
      <AppInner />
    </Router>
  );
}


export default App;
