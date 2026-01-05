import React, {useRef, useEffect} from "react";
import "./resume-board.css"
import styled from "styled-components";
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

import {gsap, Power3} from 'gsap'

const techSkill = [nextjs,react, typescript,javascript, github, shopify ,  lightspeed,  webflow,adobe, figma]


const ResumeBoard = ()=>{

let logoItem = useRef(null)
let skillProfile = useRef(null)


useEffect(()=>{
  console.log(logoItem)
  gsap.to(
  logoItem,
  0.7,
  {
    opacity:1,
    y:-29,
    ease: Power3.easeOut
  },



  gsap.to(
    skillProfile,
    0.5,{
      opacity:1,
      delay: 0.2,
      ease:Power3.easeIn
    }
  )
)
  
},[])


    return(
        <div className="site-width-container">
         
        <div ref={el =>{
          logoItem = el
        }} className="resumeBoard-container">

        <div className="resumeBoard-box-1">


        <div className="profile">
            <h2>Leangheng Ou</h2>
            <p>I’m Flo, a UX/UI designer based in Italy. I have 10 years experience in user interfaces and product design. I can help you build innovative digital products from UX research to UI design and prototyping.</p>

        </div>


         <div className="experience">
            <h3 className="experience-team">iAgree Ai <span>Design Intern</span></h3>
            <p>Find out about my works: read through my case studies, have a look at final designs and try out prototypes I’ve built.</p>

              <h3 className="experience-team">Blu Creative <span>User Interface Intern</span></h3>
            <p>Find out about my works: read through my case studies, have a look at final designs and try out prototypes I’ve built.</p>


              <h3 className="experience-team">Vasco Design <span>Graphic Designer & Visual Artist</span></h3>
            <p>Find out about my works: read through my case studies, have a look at final designs and try out prototypes I’ve built.</p>


              <h3 className="experience-team">Ezshop <span>Web Designer | Frontend Developer </span></h3>
            <p>Find out about my works: read through my case studies, have a look at final designs and try out prototypes I’ve built.</p>

        </div>


        </div>
        <div ref={el=>{
          skillProfile = el
        }} className="resumeBoard-box-2">


         <div className="education">
            <h3>Shadd Healthcare</h3>
            <p>Find out about my works: read through my case studies, have a look at final designs and try out prototypes I’ve built.</p>

            <h3>Guy-Concordia Bootcamp</h3>
            <p>Find out about my works: read through my case studies, have a look at final designs and try out prototypes I’ve built.</p>         
        </div>



          <div className="technical-skill">
            <h3>Technical Skill</h3>
            <p>Find out about my works: read through my case studies, have a look at final designs and try out prototypes I’ve built.</p>

          <div className="skill-ball">
<TechSkillBox/>

          </div>
           
        </div>


   <div className="stay-connect">
            <h3>View my projects</h3>
            <p>Find out about my works: read through my case studies, have a look at final designs and try out prototypes I’ve built.</p>
 <a className="btn">View project <div class="arrow-wrapper">
        <div class="arrow"></div>

    </div></a>

         
           
        </div>




        </div>

        </div>

        </div>

    )
}








const TechSkillBox = ()=>{
 return(
  <>
    {techSkill.map((icon,index)=>{
      return <img key={index} src={icon} />
    })}
    </>
 )
  
  
}


export default ResumeBoard;



