import React from "react";
import IntroSection from '../actions/components/introduction-section/intro-section';
import UpsSkill from "../actions/components/usp-skill-section/usp-skill";
import Testimonials from "../actions/components/testimonials/testimonials"
import DevProjectBoard from "../actions/components/dev-projct-board/dev-project-board"

const Homepage = ()=>{
    return(
        <div>
        <IntroSection/>
       <UpsSkill/>
       {/* <DevProjectBoard/> */}
       <Testimonials/>
        </div>
       
    )
}


export default Homepage;