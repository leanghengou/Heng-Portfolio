import React from "react";
import IntroSection from '../actions/components/introduction-section/intro-section';
import SkillIcons from "../actions/components/skill-icons-section/skill-icons-section";
import DisplayScreen from "../actions/components/display-project-screen/project-display-carousel";
import DevProjectScreen from "../actions/components/development-project-screen/dev-project";
import ContactHomepage from "../actions/components/contact-section/contact-homepage";
import Footer from "../actions/components/footer-components/footer";
const Homepage = ()=>{
    return(
        <div>
        <IntroSection/>
        <SkillIcons /> 
        <DisplayScreen/>
        <DevProjectScreen/>
        <ContactHomepage/>
        {/* <Footer/> */}
        </div>
       
    )
}


export default Homepage;