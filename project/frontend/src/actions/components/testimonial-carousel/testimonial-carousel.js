import React from "react";
import "./testimonial-carousel.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import alexisImg from "../../../resources/alexis.png";
import theirryImg from "../../../resources/theirry.png";
import mervImg from "../../../resources/merv.png";
import charlesImg from "../../../resources/iagree-ai.png";

const TESTIMONIALS = [
  {
    author: "Thierry Larouche",
    role: "Ex Chief Technology Officer at Ezshop",
    img: theirryImg,
    quote:
      "Leangheng has a wide range of skills ranging from graphic design, UI/Ux to front-end development. He works hard and puts passion into all his projects.",
  },
  {
    author: "Alexis Dumas",
    role: "Sales Director at Ezshop",
    img: alexisImg,
    quote:
      "I'm thrilled to recommend Heng for his exceptional UX/UI design skills. His attention to detail, collaborative mindset, and up-to-date knowledge of design trends make him a standout designer who consistently delivers top-notch work on time.",
  },
  {
    author: "Charles Lesieur",
    role: "Founder of iAgree.ai",
    img: charlesImg,
    quote:
      "Heng brings a contagious enthusiasm, eagerness to learn, and perfectionism that more than compensate for his relatively junior status. He was able to quickly understand our processes and bring value to our product almost immediately.",
  },
  {
    author: "Emervyn Lacroix-Bergeron",
    role: "Website Director",
    img: mervImg,
    quote:
      "I had the pleasure of working with Heng and experienced firsthand his dedication to his craft and strong work ethic. His attention to detail is second to none and he was a great asset to our team.",
  },

    {
    author: "Andrian Savaldore",
    role: "Founder of iAgree.ai",
    img: charlesImg,
    quote:
      "Heng brings a contagious enthusiasm, eagerness to learn, and perfectionism that more than compensate for his relatively junior status. He was able to quickly understand our processes and bring value to our product almost immediately.",
  },
];

const TestimonialCarousel = () => {
  return (
    <section className="testimonial-carousel">
      <div className="site-width-container">
        <div className="testimonial-carousel-header">
          <p className="testimonial-carousel-eyebrow">{"{ Testimonials }"}</p>
          <h2 className="testimonial-carousel-title">Meaningful Connections</h2>
          <p className="testimonial-carousel-sub">
            I'm Flo, a UX/UI designer based in Italy. I have 10 years experience
            in user interfaces and product design.
          </p>
        </div>

        <Swiper
          modules={[Pagination]}
          spaceBetween={20}
          slidesPerView={3}
          className="testimonial-carousel-swiper"
          breakpoints={{
            0: { slidesPerView: 1.05, spaceBetween: 12 },
            640: { slidesPerView: 2, spaceBetween: 16 },
            1024: { slidesPerView: 3, spaceBetween: 20 },
          }}
        >
          {TESTIMONIALS.map((item, i) => (
            <SwiperSlide key={i}>
              <article className="testimonial-card">
                <div className="testimonial-card-head">
                  <img
                    className="testimonial-card-avatar"
                    src={item.img}
                    alt={item.author}
                  />
                  <div className="testimonial-card-meta">
                    <h3 className="testimonial-card-author">{item.author}</h3>
                    <p className="testimonial-card-role">{item.role}</p>
                  </div>
                </div>
                <span className="testimonial-card-divider" />
                <p className="testimonial-card-quote">{item.quote}</p>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
