import React from "react";
import IntroSection from '../actions/components/introduction-section/intro-section';
import SkillIcons from "../actions/components/skill-icons-section/skill-icons-section";
import DisplayScreen from "../actions/components/display-project-screen/project-display-carousel";
const Homepage = ()=>{
    return(
        <div>
        <IntroSection/>
        <SkillIcons /> 
        <DisplayScreen/>
        </div>
       
    )
}


export default Homepage;