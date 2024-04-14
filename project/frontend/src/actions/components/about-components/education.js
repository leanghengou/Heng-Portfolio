import React from "react";
import { useState } from "react";
import "./about-style.css"



const EducationSection = ()=>{
    return(
        <div className="header-width-container about-div-edu-section">
        <div className="skillsshowcase-text-content">
            <h3>Education</h3>
            <p>We strive to provide the highest quality clothing at the best prices, so you can look your best without breaking the bank.</p>
        </div>
        <div className="education-board">
<div className="education-board-detail">
<div className="education-board-school-subject">
<h4>Concordia University</h4>
<p>Web-development bootcamp</p>
</div>
<div>2022</div>
</div>
<div className="education-board-detail">
<div className="education-board-school-subject">
<h4>Shadd</h4>
<p>Computer Graphic</p>
</div>
<div>
<p>2019 - 2021</p>
</div>
</div>
        </div>
        </div>
    )
}

export default EducationSection