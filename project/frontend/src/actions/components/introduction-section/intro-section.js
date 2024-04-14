import React from "react";
import "./intro-section-style.css"
import styled from "styled-components";

const IntroSection = ()=>{
    return(
        <div className="intro-section-container section-box">



<div className="site-width-container intro-section-container-flex">

    <HengIllustration>
    <img className="heng-illustration" src="https://res.cloudinary.com/dgqfcwu7y/image/upload/v1711932752/Heng%20Website/rjirobo2ysfokivso73z.svg"/>
        </HengIllustration>


            <div className="intro-section-container-text-cotnainer">
              <p><span className="highlight-tag-box-style">Web Design & Front-end Developer</span></p>
<h1>Call me <span style={{color: '#5319CE'}}>Heng.</span></h1>
<p>Through a combination of creativity, collaboration, and continuous learning, I aim to push the boundaries of design and technology to deliver impactful solutions that leave a lasting impression.</p>
   
   <InfiniteSkillLogos/>
            </div>
        </div>

        </div>

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



