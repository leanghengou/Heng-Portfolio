import React from "react";
import LandingHero from "../actions/components/landing-hero/landing-hero";
import IntroSection from '../actions/components/introduction-section/intro-section';
import UpsSkill from "../actions/components/usp-skill-section/usp-skill";
import Testimonials from "../actions/components/testimonials/testimonials"
import DevProjectBoard from "../actions/components/dev-projct-board/dev-project-board"
import WebDevSection from "../actions/components/web-dev-section-hp/web-dev-section-hp"

const Homepage = ()=>{
    return(
        <div>
        <LandingHero/>
        <IntroSection/>
       <UpsSkill/>
       <WebDevSection/>
       {/* <DevProjectBoard/> */}
       <Testimonials/>
        </div>
       
    )
}


export default Homepage;