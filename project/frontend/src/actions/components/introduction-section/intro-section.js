import React from "react";
import "./intro-section-style.css"

const IntroSection = ()=>{
    return(
        <div className="intro-section-container">
            <div className="intro-section-container-text-cotnainer">
                <div> 
                <h1 >Call me Heng.</h1>
            <p>We strive to provide the highest quality clothing at the best prices, so you can look your best without breaking the bank.</p>
            </div>
            <ul className="intro-section-container-social-media-icons">
                <li><a target="_blank" href="https://www.linkedin.com/in/leanghengou/"><img src="https://res.cloudinary.com/dgqfcwu7y/image/upload/v1696300638/Group_8701_re9bg4.png"/></a></li>
                <li><a target="_blank" href="https://github.com/leanghengou"><img src="https://res.cloudinary.com/dgqfcwu7y/image/upload/v1696300637/Group_8698_rwwtxr.png"/></a></li>
                <li><a target="_blank" href="https://www.behance.net/leanghengou"><img src="https://res.cloudinary.com/dgqfcwu7y/image/upload/v1696300636/Group_8693_je3w9s.png"/></a></li>
                <li><a target="_blank" href="https://www.instagram.com/heng_design/"><img src="https://res.cloudinary.com/dgqfcwu7y/image/upload/v1696300637/Group_8699_jwjrko.png"/></a></li>
            </ul>
           
            </div>
            <div>
                <img className="heng-img-custom" src="https://res.cloudinary.com/dgqfcwu7y/image/upload/v1696956810/Heng%20Website/d29me4zfgfe0ucouhudv.png"/>
            </div>
        </div>
    )
}

export default IntroSection;