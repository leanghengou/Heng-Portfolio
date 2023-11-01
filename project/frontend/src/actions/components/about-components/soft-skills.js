import React from "react";
import { useState } from "react";
import "./about-style.css"



const SoftSkills = ()=>{
    return(
        <div>
        <div className="about-div-section">
        <div className="skillsshowcase-text-content">
            <h3>Soft</h3>
            <p>We strive to provide the highest quality clothing at the best prices, so you can look your best without breaking the bank.</p>
        </div>
        <div>

            <ul className="skillsshowcase-skill-points">
                <li>JavaScript</li>
                <li>React.js</li>
                <li>Express</li>
                <li>Node.js</li>
                <li>MongoDB</li>
            </ul>
        </div>
        </div>
</div>
    )
}

export default SoftSkills