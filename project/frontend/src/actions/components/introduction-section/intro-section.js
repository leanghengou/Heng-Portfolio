import React, {useRef, useEffect, useLayoutEffect} from "react";
import "./intro-section-style.css"
import styled from "styled-components";
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
import gridImg from "../../../resources/grid-bg.png";
import tailwind from "../../../resources/skill-icon/Tailwind_CSS_Logo.png";
import ParticleSphere from "../particle-sphere/particle-sphere";


import {gsap, Power3} from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger) 









const IntroSection = ()=>{












  const projectRef = useRef(null);











  let introRef = useRef(null)
  let skillBallRef = useRef(null)


  useEffect(()=>{
     gsap.to(
      introRef,
      0.8,
      {
        opacity:1,
      ease: Power3.easeIn
      }
     )

     gsap.to(
      skillBallRef,
      0.35,
      {
        opacity:1,
      ease: Power3.easeOut,
      delay:0.2,
      y:-20,
      }
     )





  },[])

  const techSkill = [nextjs,react, typescript,javascript, github, shopify ,  lightspeed,  webflow,adobe, figma, tailwind]
    return(
        <section  className="homepage intro-section">

<img  className="grid-bg-hero" src={gridImg}/>
<div className="hero-bg-hp"></div>
<div  ref={el=>{
  introRef = el
}} className="hero-section site-width-container" style={{opacity:0}}>
      <div className="hero-kinetic-bg">
        <ParticleSphere
          sphereColor="#5B508A"
          particlesCount={9000}
          particleScale={3}
          speed={20}
          scale={8.4}
          cursorOn={true}
        />
      </div>
      {/* <img  className="heng-img-hero-hp" src={hengImg}/> */}
        
        <div  className="intro-section-container section-box">

        <h2 >Call me Heng.</h2>
        <p>I’m Flo, a UX/UI designer based in Italy. I have 10 years experience in user interfaces and product design. I can help you build innovative digital products from UX research to UI design and prototyping. </p>
      




<div ref={el=>{skillBallRef = el}}  class="skill-marquee" style={{opacity:0}}>
  <div class="skill-track">


<div className="skill-ball-hp contain">

   {techSkill.map((icon,index)=>{
      return <img key={index} src={icon} />
    })}
</div>


{/* ---------------loop--------------------- */}

<div className="skill-ball-hp contain" >

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



