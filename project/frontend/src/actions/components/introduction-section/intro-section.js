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
import hengImg from "../../../resources/heng-hero-banner.png"

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

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const IntroSection = ()=>{


  const techSkill = [nextjs,react, typescript,javascript, github, shopify ,  lightspeed,  webflow,adobe, figma]
    return(
        <section  className="homepage intro-section">

<div className="hero-bg-hp"></div>
<div className="hero-section site-width-container">
      <img className="heng-img-hero-hp" src={hengImg}/>
        
        <div className="intro-section-container section-box">

        <h2>Call me Heng.</h2>
        <p>I’m Flo, a UX/UI designer based in Italy. I have 10 years experience in user interfaces and product design. I can help you build innovative digital products from UX research to UI design and prototyping. </p>



<div class="skill-marquee">
  <div class="skill-track">


<div className="skill-ball-hp contain">

   {techSkill.map((icon,index)=>{
      return <img key={index} src={icon} />
    })}
</div>


{/* ---------------loop--------------------- */}

<div className="skill-ball-hp contain">

   {techSkill.map((icon,index)=>{
      return <img key={index} src={icon} />
    })}
</div>
</div>
</div>
         <a className="btn">View project <div class="arrow-wrapper">
        <div class="arrow"></div></div></a>


        </div>



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
      <article className="intro-card work">
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



