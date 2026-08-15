import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./project-carousel.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import saintEmberImg from "../../../resources/Mask-group-8.webp";
import tDaysChallange from "../../../resources/30days-challange-img.webp";
import decorolalaThumb from "../../../resources/Decorolala-thumbmail.png";
import hornetThumb from "../../../resources/Hornet-thubmail.png";
import startNowThumb from "../../../resources/start-now-thubmail.png";

import { gsap, Power3 } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// `slug` points at an existing /project/:slug case study; `href` opens an
// external site instead. Leave both out and the card renders without a link.
const PROJECTS = [
  {
    title: "Decorolala Loyalty & Cart Recovery",
    desc: "Custom Shopify loyalty program, dynamic cart-drawer rewards.",
    img: decorolalaThumb,
    tags: ["eCommerce", "Shopify"],
    slug: "decorolala-loyalty-cart-recovery",
  },
  {
    title: "Start Now Fitness App",
    desc: "React builds with responsive, pixel-tight execution.",
    img: startNowThumb,
    tags: ["Design", "UI/UX"],
    slug: "start-now-app",
  },
  {
    title: "Saint Embers",
    desc: "Reusable components, consistent spacing, scalable styles.",
    img: saintEmberImg,
    tags: ["eCommerce", "Web Development", "Design", "Shopify"],
    slug: "saint-embers",
  },
  {
    title: "Hornet Energy",
    desc: "Designing and building an early e-commerce experience for a growing energy-gel brand.",
    img: hornetThumb,
    tags: ["eCommerce", "Shopify", "Design"],
    slug: "hornet-energy",
  },
  {
    title: "30 Days of Daily Posters",
    desc: "A 30-day exploration of visual communication — one poster every day for 30 days.",
    img: tDaysChallange,
    tags: ["Design", "Creative"],
    slug: "30-days-of-daily-posters",
  },
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

                {item.href ? (
                  <a
                    className="btn"
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View project
                    <div className="arrow-wrapper">
                      <div className="arrow"></div>
                    </div>
                  </a>
                ) : item.slug ? (
                  <Link className="btn" to={`/project/${item.slug}`}>
                    View project
                    <div className="arrow-wrapper">
                      <div className="arrow"></div>
                    </div>
                  </Link>
                ) : (
                  <span className="btn is-disabled">Coming soon</span>
                )}
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
