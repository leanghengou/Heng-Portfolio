import React, { useEffect, useRef, useState } from "react";
import { gsap, Power3 } from "gsap";
import ParticleSphere from "../particle-sphere/particle-sphere";
import "./skill-services.css";
import iconDesign from "../../../resources/skill-icon-design.png";
import iconDev from "../../../resources/skill-icon-dev.png";
import iconSeo from "../../../resources/skill-icon-seo.png";

import adobe from "../../../resources/skill-icon/adobe.png";
import figma from "../../../resources/skill-icon/figma.png";
import javascript from "../../../resources/skill-icon/javascript.png";
import lightspeed from "../../../resources/skill-icon/lightspeed.png";
import nextjs from "../../../resources/skill-icon/nextjs.png";
import react from "../../../resources/skill-icon/react.png";
import typescript from "../../../resources/skill-icon/typescript.png";
import webflow from "../../../resources/skill-icon/webflow.png";
import shopify from "../../../resources/skill-icon/shopify.png";
import github from "../../../resources/skill-icon/github.png";
import tailwind from "../../../resources/skill-icon/Tailwind_CSS_Logo.png";

const techSkill = [nextjs, react, typescript, javascript, github, shopify, lightspeed, webflow, adobe, figma, tailwind];

const SKILLS = [
  {
    icon: iconDesign,
    title: "UI/UX Design",
    desc: ["Nine years of making software people actually use.", "Three that say the most."],
    tags: ["Figma", "Website Design", "Ecomerce Site"],
  },
  {
    icon: iconDev,
    title: "Web Development",
    desc: ["Nine years of making software people actually use.", "Three that say the most."],
    tags: ["React.js", "Javascript", "Shopify (Liquid)", "Web Performance"],
  },  
  {
    icon: iconSeo,
    title: "Techincal SEO",
    desc: ["Nine years of making software people actually use.", "Three that say the most."],
    tags: ["On-Page SEO", "SEO-Migration"],
  },
];

const SkillServices = () => {
  let skillBallRef = useRef(null);

  // Track the mobile breakpoint. ParticleSphere measures its container size
  // once at mount, so we remount it (via key) whenever we cross 900px to force
  // a fresh measurement at the new box size.
  const [isMobile, setIsMobile] = useState(
    () =>
      typeof window !== "undefined" &&
      !!window.matchMedia &&
      window.matchMedia("(max-width: 900px)").matches
  );
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mql = window.matchMedia("(max-width: 900px)");
    const sync = () => setIsMobile(!!mql.matches);
    sync();
    if (mql.addEventListener) {
      mql.addEventListener("change", sync);
      return () => mql.removeEventListener("change", sync);
    }
    mql.addListener?.(sync);
    return () => mql.removeListener?.(sync);
  }, []);

  useEffect(() => {
    gsap.to(skillBallRef, 0.35, {
      opacity: 1,
      ease: Power3.easeOut,
      delay: 0.2,
      y: -20,
    });
  }, []);

  return (
    <section className="skill-services">
      <div className="skill-services-inner site-width-container">






        <div className="skill-services-left">
          <p className="skill-services-eyebrow">02 / Skill and Services</p>
          <h2 className="skill-services-title">
            Continuesouly learning and connecting the dots
          </h2>

          <div
            ref={(el) => {
              skillBallRef = el;
            }}
            className="skill-marquee"
            style={{ opacity: 0 }}
          >
            <div className="skill-track">
              <div className="skill-ball-hp contain">
                {techSkill.map((icon, index) => (
                  <img key={index} src={icon} alt="" />
                ))}
              </div>

              {/* ---------------loop--------------------- */}

              <div className="skill-ball-hp contain">
                {techSkill.map((icon, index) => (
                  <img key={index} src={icon} alt="" />
                ))}
              </div>
            </div>
          </div>

          <div className="skill-list">
            {SKILLS.map((item, i) => (
              <div className="skill-item" key={i}>
                <div className="skill-item-icon">
                  <img src={item.icon} alt="" aria-hidden="true" />
                </div>

                <div className="skill-item-body">
                  <h3>{item.title}</h3>
                  {item.desc.map((line, j) => (
                    <p key={j}>{line}</p>
                  ))}

                  <div className="skill-tags">
                    {item.tags.map((tag, k) => (
                      <span className="skill-tag" key={k}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

     












  <div className="skill-services-media" aria-hidden="true">
          <div className="skill-services-sphere">
            <ParticleSphere
              key={isMobile ? "mobile" : "desktop"}
              sphereColor="#5B508A"
              particlesCount={9000}
              particleScale={3}
              speed={20}
              scale={8.4}
              cursorOn={true}
            />
          </div>
        </div>
















      </div>
    </section>
  );
};

export default SkillServices;
