import React, { useState, useRef, useEffect } from "react";
import "./web-dev-section-hp.css";
import gsap from "gsap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import insperImg from "../../../resources/insper-u.png";
import moonImg from "../../../resources/moon-example.png";
import topicBgInsper from "../../../resources/inper-u-topic-bg.png";

const WebDevSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
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

  // Track mobile breakpoint to switch to a carousel
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Animate image when activeIndex changes
  useEffect(() => {
    if (!imgRef.current) return;

    if (isMobile) {
      // Mobile: blur-in when switching slides
      gsap.fromTo(
        imgRef.current,
        { opacity: 0, filter: "blur(18px)", scale: 1.04 },
        {
          opacity: 1,
          filter: "blur(0px)",
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
        }
      );
    } else {
      // Desktop: slide up
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
    }
  }, [activeIndex, isMobile]);

  // Desktop: auto-advance the active card every 7s (mobile uses Swiper autoplay).
  // Re-runs on activeIndex change, so hovering a card restarts the countdown.
  useEffect(() => {
    if (isMobile) return;
    const id = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % projects.length);
    }, 7000);
    return () => clearTimeout(id);
  }, [isMobile, activeIndex, projects.length]);

  const renderCard = (item, index) => (
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
        {item.codingLanguage.map((stack, i) => (
          <li key={i}>{stack}</li>
        ))}
      </ul>
      <a className="btn">
        View project
        <div className="arrow-wrapper">
          <div className="arrow"></div>
        </div>
      </a>

      <div className="card-progress" aria-hidden="true">
        <span className="card-progress-bar"></span>
      </div>
    </div>
  );

  const header = (
    <div className="web-dev-header">
      <p className="web-dev-eyebrow">03 / Development</p>
      <h2 className="web-dev-title">
        Where I turn ideas into working products.
      </h2>
    </div>
  );

  return (
    <div className="full-width-container">
    <div className="site-width-container">

      {/* Mobile: header sits above the image + content */}
      {isMobile && header}

      <div className="web-dev-section-flex">

        {/* LEFT SIDE */}
        <div className="web-dev-item">
          {/* Desktop: header stays in the left column above the cards */}
          {!isMobile && header}

          {isMobile ? (
            <Swiper
              modules={[Autoplay]}
              slidesPerView={1}
              spaceBetween={12}
              loop={true}
              autoplay={{ delay: 7000, disableOnInteraction: false }}
              touchStartPreventDefault={false}
              threshold={6}
              className="web-dev-mobile-swiper"
              onSlideChange={(s) => setActiveIndex(s.realIndex)}
            >
              {projects.map((item, index) => (
                <SwiperSlide key={index}>{renderCard(item, index)}</SwiperSlide>
              ))}
            </Swiper>
          ) : (
            projects.map((item, index) => renderCard(item, index))
          )}
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
