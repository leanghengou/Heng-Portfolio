import React, { useEffect } from "react";
import "./project-carousel.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import saintEmberImg from "../../../resources/Mask-group-8.webp";
import startnowimg from "../../../resources/startnow-intro-img.png";
import tDaysChallange from "../../../resources/30days-challange-img.webp";

import { gsap, Power3 } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  { title: "30 days challenges", desc: "Find out about my works: read through my case studies, have a look at final designs and try out prototypes I’ve built.", img: tDaysChallange, tags: ["Design", "Creative"] },
  { title: "Start Now Fitness App", desc: "React builds with responsive, pixel-tight execution.", img: startnowimg, tags: ["Design", "UI/UX"] },
  { title: "Saint Embers", desc: "Reusable components, consistent spacing, scalable styles.", img: saintEmberImg, tags: ["eCommerce", "Web Development", "Design", "Shopify"] },
  { title: "Speed", desc: "Ship fast, iterate smart, keep code maintainable.", img: saintEmberImg, tags: ["Design", "UI/UX", "Web Development", "Shopify"] },
  { title: "Speed", desc: "Ship fast, iterate smart, keep code maintainable.", img: saintEmberImg, tags: ["Design", "UI/UX", "Web Development", "Shopify"] },
];

const ProjectCarousel = () => {
  useEffect(() => {
    gsap.to(".intro-carousel", {
      scrollTrigger: ".intro-carousel",
      start: "top top",
      y: -32,
      duration: 0.7,
      delay: 0.5,
      opacity: 1,
      ease: Power3.easeOut,
    });
  }, []);

  return (
    <section className="project-carousel">
      <div className="site-width-container">
        <div className="project-carousel-header">
          <p className="project-carousel-eyebrow">01 / Works</p>
          <h2 className="project-carousel-title">
            Where I build things that don't have a brief yet.
          </h2>
        </div>
      <Swiper
        modules={[Pagination]}
        spaceBetween={10}
        slidesPerView={2}
        centeredSlides={false}
        className="intro-carousel"
        breakpoints={{
          0: { slidesPerView: 1.05, spaceBetween: 10 },
          640: { slidesPerView: 1.4, spaceBetween: 10 },
          1024: { slidesPerView: 2, spaceBetween: 10 },
          1440: { slidesPerView: 2.2, spaceBetween: 10 },
        }}
        style={{ opacity: 0 }}
      >
        {PROJECTS.map((item, i) => (
          <SwiperSlide key={i}>
            <article className="project-card">
              <div className="project-card-media">
                <img src={item.img} alt={item.title} />
              </div>

              <div className="project-card-body">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>

                <div className="bubble-tag-all-container">
                  {item.tags.map((tag, index) => (
                    <div key={index} className={`bubble-tag-container ${tag.replace(/[\/\s]+/g, "-").toLowerCase()}`}>
                      <div className={`bubble-tag-item ${tag.replace(/[\/\s]+/g, "-").toLowerCase()}`}>
                        <p>{tag}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <a className="btn">
                  View project
                  <div className="arrow-wrapper">
                    <div className="arrow"></div>
                  </div>
                </a>
              </div>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
      </div>
    </section>
  );
};

export default ProjectCarousel;
