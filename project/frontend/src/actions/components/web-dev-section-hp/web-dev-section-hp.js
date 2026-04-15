import React, { useState, useRef, useEffect } from "react";
import "./web-dev-section-hp.css";
import gsap from "gsap";

import insperImg from "../../../resources/insper-u.png";
import moonImg from "../../../resources/moon-example.png";
import topicBgInsper from "../../../resources/inper-u-topic-bg.png";

const WebDevSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const imgRef = useRef(null);

  const projects = [
    {
      title: "Insper U",
      role: "Frontend Developer",
      date: "March 11, 2026",
      desc: "A platform where university students share essays and perspectives from their academic projects.",
      image: insperImg,
      bgImg: topicBgInsper,
      codingLanguage: ["React.js", "JavaScript", "CSS", "Node.js"],
    },
    {
      title: "Moon Whisper",
      role: "Frontend Developer",
      date: "April 2026",
      desc: "A minimal sleep-focused app that delivers calming, low-stimulation content to help users unwind at night.",
      image: moonImg,
      bgImg: topicBgInsper,
      codingLanguage: ["TypeScript", "React.js", "CSS"],
    },
  ];

  // Animate image when activeIndex changes
  useEffect(() => {
    if (!imgRef.current) return;

    gsap.fromTo(
      imgRef.current,
      { opacity: 0, y: "120%", scale: 1.27 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.5,
        ease: "power3.out",
      }
    );
  }, [activeIndex]);

  return (
    <div className="full-width-container">
    <div className="site-width-container">
      <div className="web-dev-section-flex">

        {/* LEFT SIDE */}
        <div className="web-dev-item">
          {projects.map((item, index) => {
            return (
              <div
                key={index}
                className={`web-dev-item-content ${
                  activeIndex === index ? "active" : ""
                }`}
                onMouseEnter={() => setActiveIndex(index)}
              >
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <ul className="stack-app-web-dev-section">
                {item.codingLanguage.map((stack)=>{
                    return(
                        <li>{stack}</li>
                    )
                })}

                </ul>
                <a className="btn">
                  View project
                  <div className="arrow-wrapper">
                    <div className="arrow"></div>
                  </div>
                </a>
              </div>
            );
          })}
        </div>

        {/* RIGHT SIDE (IMAGE) */}
        <div className="web-dev-item-banner">
          <img
            ref={imgRef}
            src={projects[activeIndex].image}
            alt={projects[activeIndex].title}
          />
        </div>

      </div>
    </div>
    </div>
  );
};

export default WebDevSection;