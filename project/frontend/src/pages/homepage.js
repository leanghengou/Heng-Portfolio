import React from "react";
import KineticGrid from "../actions/components/kinetic-grid/kinetic-grid";
import LandingHero from "../actions/components/landing-hero/landing-hero";
import IntroSection from '../actions/components/introduction-section/intro-section';
import UpsSkill from "../actions/components/usp-skill-section/usp-skill";
import Testimonials from "../actions/components/testimonials/testimonials"
import DevProjectBoard from "../actions/components/dev-projct-board/dev-project-board"
import WebDevSection from "../actions/components/web-dev-section-hp/web-dev-section-hp"
import BuilderHero from "../actions/components/builder-hero/builder-hero"
import ProjectCarousel from "../actions/components/project-carousel/project-carousel"
import SkillServices from "../actions/components/skill-services/skill-services"
import TestimonialCarousel from "../actions/components/testimonial-carousel/testimonial-carousel"

const Homepage = ()=>{
    return(
        <div>
     <BuilderHero/>
        {/* <IntroSection/> */}
       <ProjectCarousel/>
       <SkillServices/>
        <TestimonialCarousel/>
       {/* <UpsSkill/> */}
       <WebDevSection/>
       {/* <DevProjectBoard/> */}
{/*     
       <Testimonials/> */}
        </div>
       
    )
}


export default Homepage;