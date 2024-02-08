import React from "react";
import "./skill-icons-style.css"

const SkillIcons=()=>{
    return(
        <div className="site-width-container">
            <SkillTitleSection/>
            <Icons/>
        </div>
    )
}

const SkillTitleSection = ()=>{
    return(
        <div className="skill-icons-title">
            <p><span className="highlight-tag-box-style">without breaking</span></p>
            <h3>My passion and focus is learning.</h3>
            <p>We strive to provide the highest quality clothing at the best prices, so you can look your best without breaking the bank.</p>
        </div>
    )
}

const Icons = ()=>{
    return(
        <div className="fade-in-top  skill-icons-box-fc">
           <div className="skill-icons-box">
           <div className="skill-icons-w-fc">
            <img width="85px" src="https://res.cloudinary.com/dgqfcwu7y/image/upload/v1696560138/Heng%20Website/Group_8704_l9lnqw.svg"/>
            </div>
            <h5>Visual design</h5>
           <p>We strive to provide the highest quality clothing at the best prices.</p>
           </div>
           <div className="skill-icons-box">
           <div className="skill-icons-w-fc">
           <img width="80px" src="https://res.cloudinary.com/dgqfcwu7y/image/upload/v1696556617/Heng%20Website/Group_8681_r0oqbr.png"/>
           </div>
            <h5>Web development</h5>
           <p>We strive to provide the highest quality clothing at the best prices.</p>
           </div>
           <div className="skill-icons-box">
           <div className="skill-icons-w-fc">
           <img width="80px" src="https://res.cloudinary.com/dgqfcwu7y/image/upload/v1696557260/Heng%20Website/Group_8703_wmgn3x.svg"/>
           </div>
            <h5>User experience</h5>
           <p>We strive to provide the highest quality clothing at the best prices.</p>
           </div>
        </div>
    )
}

export default SkillIcons;