import React from "react";
import "./intro-section-style.css"
import styled from "styled-components";
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import saintEmberImg from "../../../resources/Mask-group-8.webp";
import startnowimg from "../../../resources/startnow-intro-img.png";
import tDaysChallange from "../../../resources/30days-challange-img.webp";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const IntroSection = ()=>{
    return(
        <section  className="intro-section">
        <div className="intro-section-container section-box">

        <h2>Call me Heng.</h2>
        <p>I’m Flo, a UX/UI designer based in Italy. I have 10 years experience in user interfaces and product design. I can help you build innovative digital products from UX research to UI design and prototyping. </p>

         <a className="btn">View project <div class="arrow-wrapper">
        <div class="arrow"></div>

    </div></a>
        </div>






 <Swiper
  modules={[Pagination]}
  spaceBetween={16}
  slidesPerView={3}
  centeredSlides={false}
//   pagination={{ clickable: true }}
  className="intro-carousel"
  breakpoints={{
    640: { slidesPerView: 1.3, spaceBetween: 18 },
    768: { slidesPerView: 2, spaceBetween: 20 },
    1024: { slidesPerView: 3, spaceBetween: 24 },
  }}
>
  {[
    { title: "30 days challenges", desc: "Find out about my works: read through my case studies, have a look at final designs and try out prototypes I’ve built.",img:tDaysChallange },
    { title: "Start Now Fitness App", desc: "React builds with responsive, pixel-tight execution.", img:startnowimg },
    { title: "Saint Embers", desc: "Reusable components, consistent spacing, scalable styles.", img:saintEmberImg },
    { title: "Speed", desc: "Ship fast, iterate smart, keep code maintainable.", img:saintEmberImg },
  ].map((item) => (
    <SwiperSlide key={item.title}>
      <article className="intro-card">
    <div className="card-project-container">
        <p>{ item.goat }</p>
        <h3>{item.title}</h3>
        <p>{item.desc}</p>
        <a className="btn">View project <div class="arrow-wrapper">
        <div class="arrow"></div>

    </div></a>
        </div>
        <img src={item.img} />
    
     
      </article>
    </SwiperSlide>
  ))}
</Swiper>
     


     
</section>
    )
}



const InfiniteSkillLogos = ()=>{
    return(
        <div className="skill-logos-slides">

            <div className="skill-slides">
                <img src="https://res.cloudinary.com/dgqfcwu7y/image/upload/v1712461759/Group_8880_ocbvtt.png"/>
            <img  src="https://res.cloudinary.com/dgqfcwu7y/image/upload/v1712461757/Group_8879_gcsne9.png"/>
           <img  src="https://res.cloudinary.com/dgqfcwu7y/image/upload/v1712461756/Group_8878_cbkypd.png"/>
        <img  src="https://res.cloudinary.com/dgqfcwu7y/image/upload/v1712461755/Group_8877_djrtds.png"/>
           <img src="https://res.cloudinary.com/dgqfcwu7y/image/upload/v1712461753/Group_8876_bidbmq.png"/>
           </div>
           <div className="skill-slides">
                <img src="https://res.cloudinary.com/dgqfcwu7y/image/upload/v1712461759/Group_8880_ocbvtt.png"/>
            <img  src="https://res.cloudinary.com/dgqfcwu7y/image/upload/v1712461757/Group_8879_gcsne9.png"/>
           <img  src="https://res.cloudinary.com/dgqfcwu7y/image/upload/v1712461756/Group_8878_cbkypd.png"/>
        <img  src="https://res.cloudinary.com/dgqfcwu7y/image/upload/v1712461755/Group_8877_djrtds.png"/>
           <img src="https://res.cloudinary.com/dgqfcwu7y/image/upload/v1712461753/Group_8876_bidbmq.png"/>
           </div>
        </div>
    )
}

const HengIllustration= styled.div`
width:35%;
height:auto;
`



export default IntroSection;



