import React from "react";
import { useState } from "react";
import "./dev-project.css"




const DevProjectScreen = ()=>{
    const [blurEffect, setBlurEffect]=useState("")
    const clickStick= (e)=>{
             setBlurEffect("blurEffect")
        const currentTagTarget= e.currentTarget
        currentTagTarget.classList.add(`unBlurEffect`);
    }
    const clickStick2= (e)=>{
    const currentTagTarget= e.currentTarget
    setBlurEffect("")
    currentTagTarget.classList.remove(`unBlurEffect`);
}
    return(
        <div className="dev-project-screen-full-container">
        <div className="dev-project-screen-text-container">
          <h5><span>Development projects</span></h5>
                <h3>Recent Git projects</h3>
                <p>We strive to provide the highest quality clothing at the best prices, so you can look your best without breaking the bank.</p>
                <div className="button-container-dev-project">
                <button className="button-dev-project-one">View all</button> <button className="button-dev-project-two">Visit my Github</button>
                </div>
            </div>

            <div className="dev-project-screen-stickers-container">
                <div onMouseOver={clickStick} onMouseOut={clickStick2} id={blurEffect} className="sticker-dev-project position-sdp-1">
                <h4>Escape the Warzone</h4>
                <p>We strive to provide the highest quality clothing at the best prices.</p>
                </div>
                <div  onMouseOver={clickStick} onMouseOut={clickStick2}  id={blurEffect} className="sticker-dev-project position-sdp-2">
                <h4>Escape the Warzone</h4>
                <p>We strive to provide the highest quality  clothing at the best prices.</p>
                </div>
                <div  onMouseOver={clickStick} onMouseOut={clickStick2} id={blurEffect} className="sticker-dev-project position-sdp-3">
                <h4>Escape the Warzone</h4>
                <p>We strive to provide the highest quality clothing at the best prices.</p>
                </div>
                <div  onMouseOver={clickStick} onMouseOut={clickStick2} id={blurEffect} className="sticker-dev-project position-sdp-4">
                <h4>Escape the Warzone</h4>
                <p>We strive to provide the highest quality clothing at the best prices.</p>
                </div>
            </div>
        </div>
    )
}

export default DevProjectScreen;
