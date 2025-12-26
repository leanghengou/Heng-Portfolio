import React from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import iconUspOne from "../../../resources/icon-usp.png"

const Testimonials = () => {
  return (

    <div className="margin-top-bottom-space-70 site-width-container">
    <div className="collarboration-section">

        <h5>Interested in collaboration?</h5>
<h5>Let's discuss what we can create together.</h5>
       

         <a className="btn">View project <div class="arrow-wrapper">
        <div class="arrow"></div>

    </div></a>
        </div>


        
     <Swiper
  modules={[Pagination]}
  spaceBetween={15}
  slidesPerView={2.5}
  centeredSlides={true}
  initialSlide={1}
    watchSlidesProgress
  className="intro-carousel testimonial-section-container margin-top-bottom-space-70"
  breakpoints={{
    640: { slidesPerView: 1.3, spaceBetween: 18 },
    768: { slidesPerView: 2, spaceBetween: 20 },
    1024: { slidesPerView: 2.5, spaceBetween: 24 },
  }}
>
  {[
    { author: "30 days challenges", desc: "Randon has a great ability to blend user-centric design principles with innovative solutions. He has a keen eye for details and how to approach them in an iterative way", title:"Sale Director at Ezshop"},
    { author: "Start Now Fitness App", desc: "Randon has a great ability to blend user-centric design principles with innovative solutions. He has a keen eye for details and how to approach them in an iterative way"  },
    {   author: "Saint Embers", desc: "Randon has a great ability to blend user-centric design principles with innovative solutions. He has a keen eye for details and how to approach them in an iterative way"},
    { author: "Speed", desc: "Randon has a great ability to blend user-centric design principles with innovative solutions. He has a keen eye for details and how to approach them in an iterative way"  },
  ].map((item) => (
    <SwiperSlide key={item.title}>
      <TestimonialCard className="intro-card">
    <div className="card-project-container">


        <p>{item.desc}</p>
        
        </div>
        <img src={item.img} />
    
     
      </TestimonialCard>
    </SwiperSlide>
  ))}
</Swiper>
    </div>
  );
};

const TestimonialCard = styled.div`

display: flex;
  flex-direction: column;
  padding: 30px;
  border-radius: 12px;
 border: 1px solid #fff0;
  background-color: #fbfbfb12;
    opacity:0.5;
`



export default Testimonials;
