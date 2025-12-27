import React from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import iconUspOne from "../../../resources/icon-usp.png"
import alexisImg from "../../../resources/alexis.png"
import theirryImg from "../../../resources/theirry.png"
import mervImg from "../../../resources/merv.png"
import charlesImg from "../../../resources/iagree-ai.png"

const Testimonials = () => {
  return (

    <div className="margin-top-bottom-space-70 site-width-container-large">
    <div className="collarboration-section">

        <h5>Interested in collaboration?</h5>
<h5>Let's discuss what we can create together.</h5>
       

         <a className="btn">View project <div class="arrow-wrapper">
        <div class="arrow"></div>

    </div></a>
        </div>


        
     <Swiper
  modules={[Pagination]}
  spaceBetween={35}
  slidesPerView={2}
  centeredSlides={true}
  initialSlide={1}
    watchSlidesProgress
  className="intro-carousel testimonial-section-container margin-top-bottom-space-70"
  // breakpoints={{
  //   640: { slidesPerView: 1.3, spaceBetween: 18 },
  //   768: { slidesPerView: 2, spaceBetween: 20 },
  //   1024: { slidesPerView: 2.5, spaceBetween: 24 },
  // }}
>
  {[
    { author: "Alexis Dumas", desc: "I'm thrilled to recommend Heng for his exceptional UX/UI design skills. Having worked closely with him, I can attest to his ability to create visually stunning and user-centric designs. Hengster's attention to detail, collaborative mindset, and up-to-date knowledge of design trends make him a standout designer. He consistently delivers top-notch work on time, and his designs truly enhance user experiences. Without a doubt, Heng would be a valuable addition to any design team.", img:alexisImg, title:"Sales Director at Ezshop"},
    { author: "Thierry Larouche", desc: "Leangheng has a wide range of skills ranging from graphic design, UI/Ux to front-end development. He works hard and puts passion into all his projects.", img:theirryImg, title:"Ex Chief Technology Officer at Ezshop"  },
    {   author: `Emervyn Lacroix-Bergeron`, desc: "I had the pleasure of working with Heng, during which time I experienced firsthand his dedication to his craft and strong work ethic. He was always willing to put in the extra hours to ensure that every detail of his designs was accounted for, and he was never afraid to get his hands dirty to make sure that all of his work could be developed. His attention to detail is second to none and he was a great asset to our team. I highly recommend Heng for any UX/UI design project and have no doubt that he will continue to excel in his craft for many years to come.", img:mervImg, title:"Website Director"},
     {  author: `Charles Lesieur`, desc: "Heng brings a contagious enthusiasm, eagerness to learn, and perfectionism that more than compensate for his relatively junior status. He was able to quickly understand our processes and bring value to our product almost immediately.", img:charlesImg, title:"Founder of iAgree.ai"} 
  ].map((item) => (
    <SwiperSlide key={item.title}>
      <TestimonialCard className="intro-card testimonial">
    <div className="card-testimonial-container">


        <p>{item.desc}</p>
        
        
        </div>
 <div className="card-testimonial-info">

    <TestimonialImg src={item.img}/>

    <div className="card-testimonial-author">
        <h5>{item.author}</h5>
        <p className="testinomial-title">{item.title}</p>
        </div>
        </div>
    
     
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
  background-color: #fbfbfb12;
    opacity:0.5;


      background: radial-gradient(
      120% 120% at 0% 0%,
      #2b2f38 0%,
      #15171c 55%,
      #0c0d10 100%
  );

  /* Border illusion */
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.08),
    inset 0 1px 1px rgba(255, 255, 255, 0.05),
    0 12px 30px rgba(0, 0, 0, 0.55);
    justify-content: space-between;
`

const TestimonialImg = styled.img`
  width: 50px !important;
  border-radius: 10px;

  margin:0px !important;
  
  
box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
`

export default Testimonials;
