import React from "react";
import SkillsShowcase from "../actions/components/about-components/skills-list-showcase";
import EducationSection from "../actions/components/about-components/education";
import SoftSkills from "../actions/components/about-components/soft-skills";

const About = ()=>{
    return(
        <div>
       <SkillsShowcase/>
       <EducationSection/>
       <SoftSkills/>
        </div>
       
    )
}


export default About;