import './site-main.css'
import {BrowserRouter as Router, Route, Switch, Routes } from "react-router-dom"
import Navigation from "./actions/components/navigation/navigation"
import UnderlayNav from "./actions/components/underlay-nav/underlay-nav"
import Homepage from './pages/homepage';
import About from './pages/about';
import Footer from "./actions/components/footer/footer"
import Resume from './pages/resume';
import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import ProjectPage from './pages/projectPageTemplate';
import Projects from './pages/projects';



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
    <div className="app-shell">
      {/* <Navigation /> hidden for now — using the UnderlayNav instead */}
      <UnderlayNav />

      {/* [data-main] is the content the underlay nav slides left to reveal */}
      <div data-main className="app-underlay-main">
        <div className="app-main">
        <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:category" element={<Projects />} />
        <Route path="/about" element={<About />} />
        <Route path="/resume" element={<Resume />} />
         <Route path="/project/:slug" element={<ProjectPage />} />
        </Routes>
        </div>

        <Footer/>
      </div>


    </div>
    </Router>
  );
}


export default App;
