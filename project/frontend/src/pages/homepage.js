import React from "react";
import IntroSection from '../actions/components/introduction-section/intro-section';
import SkillIcons from "../actions/components/skill-icons-section/skill-icons-section";
import DisplayScreen from "../actions/components/display-project-screen/project-display-carousel";
import DevProjectScreen from "../actions/components/development-project-screen/dev-project";
import ContactHomepage from "../actions/components/contact-section/contact-homepage";
import GoodConnectionsSection from "../actions/components/good-connections/good-connection-section";
import Footer from "../actions/components/footer/footer";
import DesignProjectsSlides from "../actions/components/design-projects-slides/design-projects-slides";
import DevProjectBoard from "../actions/components/dev-projct-board/dev-project-board";
import SkillBalls from "../actions/components/skill-balls/skill-ball";
const Homepage = ()=>{
    return(
        <div>
        <IntroSection/>
        <GoodConnectionsSection/>
        <SkillIcons /> 
        <DesignProjectsSlides/>
        {/* <DisplayScreen/> */}
        <DevProjectBoard/>
        {/* <DevProjectScreen/> */}
        {/* <ContactHomepage/> */}
      
        <SkillBalls/>
        <Footer/>
        </div>
       
    )
}


export default Homepage;