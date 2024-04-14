
import React from "react";
import styled from "styled-components";
import { useState } from "react";
import "./good-connection-section.css"



const GoodConnectionsSection = ()=>{
    return(
        <div className="site-width-container section-box">
<ConnectionBoxContainer>
        <ConnectionTextContainer className="ConnectionTextContainer">
            <h3>Currently Learning and building good connections.</h3>
            <div className="ConnectionTextBoxes">
            <p>“Heng has a wide range of skills ranging from graphic design, UI/UX to front-end development. He works hard and puts passion into all his projects.”</p>
            <p className="ConnectionTextBoxesAuthor">        
Thierry Larouche
            </p>
            <p className="ConnectionTextBoxesTitle">Chief Technology Officer at Ezshop</p>
            </div>

            <div className="ConnectionTextBoxes">
            <p>“I had the pleasure of working with Heng, during which time I experienced firsthand his dedication to his craft and strong work ethic. He was always...”</p>
            <p className="ConnectionTextBoxesAuthor">        
            Emervyn Lacroix-Bergeron
            </p>
            <p className="ConnectionTextBoxesTitle">Former Website Director at Ezshop</p>
            </div>

        </ConnectionTextContainer>

<ConnectionAuthorContainer>
    <div><svg height="35" viewBox="0 0 254 161" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 161V73.867L30.7331 0H94.3084L74.4223 71.1536H112.688V161H0ZM141.312 161V73.867L172.045 0H235.62L215.734 71.1536H254V161H141.312Z" fill="white"/>
</svg>
</div>
<p>I'm thrilled to recommend Hengster for his exceptional UX/UI design skills. Having worked closely with him, I can attest to his ability to create visually stunning and user-centric designs. Hengster's attention to detail, collaborative mindset, and up-to-date knowledge of design trends make him a standout designer. He consistently delivers top-notch work on time, and his designs truly enhance user experiences. Without a doubt, Hengster would be a valuable addition to any design team.</p>
<div className="focused-review">
    <div><img src="https://res.cloudinary.com/dgqfcwu7y/image/upload/v1712548038/IMG_9604_1_kil76b.png"/></div>
    <div>
    <h5>Alexis Dumas</h5>
    <p>Director, Sales at EZShop</p>
    </div>
</div>
</ConnectionAuthorContainer>

</ConnectionBoxContainer>
        </div>
    )
}



const ConnectionBoxContainer = styled.div`
display:flex;
justify-content:space-between;
padding:50px 0;
height:500px;
gap:50px;
`

const ConnectionAuthorContainer = styled.div`
background-color:green;
width:55%;
padding:30px;
border-radius:5px;
background: linear-gradient(180deg, rgba(255, 255, 255, 0.20) -101.33%, rgba(255, 255, 255, 0.00) 100%);
  box-shadow: 0px 4px 15px 0px rgba(0, 0, 0, 0.34);
  background-image: radial-gradient(46.99% 43.05% at 2.58% 100%,rgba(46,48,56,.4) 0,transparent 100%),radial-gradient(55.18% 55.16% at 12.42% -3.42%,rgba(96, 96, 96, 0.3) 0,transparent 100%);
`
const ConnectionTextContainer = styled.div`
width:35%;
height:auto;
`




export default GoodConnectionsSection