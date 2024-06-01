import React from "react";
import "./skill-balls.css"
import styled from "styled-components";

const SkillBalls = ()=>{
    return(
        <div className="skill-ball-section-bg">
         
            <div className="purple-light">

            <svg  height="1700" viewBox="0 0 2013 2013" fill="none" xmlns="http://www.w3.org/2000/svg">
<g opacity="0.5" filter="url(#filter0_f_310_134)">
<circle cx="1006.5" cy="1006.5" r="506.5" fill="#210758"/>
</g>
<mask id="mask0_310_134"  maskUnits="userSpaceOnUse" x="287" y="319" width="1438" height="1375">
<rect x="287" y="319" width="1438" height="1375" fill="url(#paint0_linear_310_134)"/>
</mask>
<g mask="url(#mask0_310_134)">
<circle cx="1006.27" cy="1006.27" r="527.267" fill="url(#paint1_radial_310_134)" fill-opacity="0.3"/>
</g>
<defs>
<filter id="filter0_f_310_134" x="0" y="0" width="2013" height="2013" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="250" result="effect1_foregroundBlur_310_134"/>
</filter>
<linearGradient id="paint0_linear_310_134" x1="1006" y1="-1298.01" x2="1006" y2="2494.74" gradientUnits="userSpaceOnUse">
<stop offset="0.112489" stop-color="#5319CE"/>
<stop offset="1" stop-opacity="0"/>
</linearGradient>
<radialGradient id="paint1_radial_310_134" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(1006.27 1006.27) rotate(90) scale(527.267)">
<stop stop-color="#F9FAD7" stop-opacity="0.3"/>
<stop offset="0.53586" stop-color="#F9FAD7" stop-opacity="0"/>
</radialGradient>
</defs>
</svg>



            </div>
        <div style={{position:"relative", height:"100%"}} className="site-width-container">


        <h5 style={{textAlign:"center"}}><span class="highlight-tag-box-style">Development projects</span></h5>
<BigTitle >Design needs flexibility</BigTitle >
<SkillBallsDescription>We strive to provide the highest quality clothing at the best prices, so you can look your best without breaking the bank. We strive to provide the highest quality clothing at the best prices.</SkillBallsDescription>

<div className="skill-icon-balls-container">
    
<div className="js-ball">
    <img width="85%"  src="https://res.cloudinary.com/dgqfcwu7y/image/upload/v1712461753/Group_8876_bidbmq.png"/>
</div>

<div className="react-ball">
    <img width="75%" src="https://res.cloudinary.com/dgqfcwu7y/image/upload/v1712461755/Group_8877_djrtds.png"/>
</div>


<div className="duda-ball">
    <img width="115px" src="https://res.cloudinary.com/dgqfcwu7y/image/upload/v1712461756/Group_8878_cbkypd.png"/>
</div>

<div className="shopify-ball">
    <img width="130px" src="https://res.cloudinary.com/dgqfcwu7y/image/upload/v1712461759/Group_8880_ocbvtt.png"/>
</div>

<div className="figma-ball">
    <img width="120px" src="https://res.cloudinary.com/dgqfcwu7y/image/upload/v1712461757/Group_8879_gcsne9.png"/>
</div>
<div className="wordpress-ball">
    <img width="150px" src="https://res.cloudinary.com/dgqfcwu7y/image/upload/v1716180517/Group_8868_l6toe0.png"/>
</div>
<div className="lightspeed-ball">
    <img width="100px" src="https://res.cloudinary.com/dgqfcwu7y/image/upload/v1716180812/Group_8890_kbvdx6.png"/>
</div>

<div className="adobe-ball">
    <img width="100px" src="https://res.cloudinary.com/dgqfcwu7y/image/upload/v1716181286/Group_8892_znmf3q.png"/>
</div>

<div className="elementor-ball">
    <img width="120px" src="https://res.cloudinary.com/dgqfcwu7y/image/upload/v1716181930/Group_8893_wxme7u.png"/>
</div>
        </div>
        </div>
        </div>

    )
}






export default SkillBalls;



const BigTitle = styled.h2`
text-align:center;
font-size:85px;
font-family: "Anton", sans-serif;
text-transform:uppercase;
// letter-spacing:5px;
font-weight:400;
margin:0px;
`

const SkillBallsDescription = styled.p`
margin:auto;
font-size:20px;
text-align:center;
width:75%;
`