import React, {useRef, useEffect, useLayoutEffect} from "react";
import "./intro-section-style.css"
import styled from "styled-components";
import hengImg from "../../../resources/heng-hero-banner.png"

import gridImg from "../../../resources/grid-bg.png";


import {gsap, Power3} from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger) 









const IntroSection = ()=>{












  const projectRef = useRef(null);











  let introRef = useRef(null)


  useEffect(()=>{
     gsap.to(
      introRef,
      0.8,
      {
        opacity:1,
      ease: Power3.easeIn
      }
     )





  },[])

    return(
        <section  className="homepage intro-section">

<img  className="grid-bg-hero" src={gridImg}/>
<div className="hero-bg-hp"></div>
<div  ref={el=>{
  introRef = el
}} className="hero-section site-width-container" style={{opacity:0}}>
      {/* <img  className="heng-img-hero-hp" src={hengImg}/> */}
        
        <div  className="intro-section-container section-box">

        <h2 >Call me Heng.</h2>
        <p>I’m Flo, a UX/UI designer based in Italy. I have 10 years experience in user interfaces and product design. I can help you build innovative digital products from UX research to UI design and prototyping. </p>

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



