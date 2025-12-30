import React from "react";
import "./resume-board.css"
import styled from "styled-components";


const ResumeBoard = ()=>{
    return(
        <div className="site-width-container">
         
        <div className="resumeBoard-container">

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
        <div className="resumeBoard-box-2">


         <div className="education">
            <h3>Shadd Healthcare</h3>
            <p>Find out about my works: read through my case studies, have a look at final designs and try out prototypes I’ve built.</p>

            <h3>Guy-Concordia Bootcamp</h3>
            <p>Find out about my works: read through my case studies, have a look at final designs and try out prototypes I’ve built.</p>         
        </div>



          <div className="technical-skill">
            <h3>Technical Skill</h3>
            <p>Find out about my works: read through my case studies, have a look at final designs and try out prototypes I’ve built.</p>
           
        </div>


        </div>

        </div>

        </div>

    )
}






export default ResumeBoard;



