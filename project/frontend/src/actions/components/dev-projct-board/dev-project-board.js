
import React from "react";
import styled from "styled-components";
import { useState } from "react";
import "./dev-project-board.css"



const DevProjectBoard = ()=>{
  return(
    <div>
        <div className="site-width-container dev-project-board-container">

          
            <div class="dev-project-board-text-container">
                <h5><span className="highlight-tag-box-style">Development projects</span></h5>
                <h3>Recent Git projects</h3>
                <p>We strive to provide the highest quality clothing at the best prices, so you can look your best without breaking the bank.</p>
                <div class="button-container-dev-project">
                    <button class="button-dev-project-one">View all</button> 
                    <button class="button-dev-project-two">Visit my Github</button>
                    </div>
            </div>
            <div class="project-board">
            <div class="dev-project-board"></div>
            <div className="project-dev-card-one">
<CardTitle>Escape the war zone</CardTitle>
<CardDescription>You can look your best without breaking the bank.</CardDescription>
              
            </div>
            <div style={{color:"#005457"}} className="project-dev-card-two">
            <CardTitle >InsperU</CardTitle>
<CardDescription>You can look your best without breaking the bank.</CardDescription>
            </div>
            <div className="project-dev-card-three"></div>
            <div className="project-dev-card-four"></div>
            <div className="project-dev-card-five"></div>
            </div>
        </div>
    </div>
  )
}


const CardTitle = styled.h5`
text-transform:uppercase;
font-size:12px;
letter-spacing:2px;
margin:0px;
`


const CardDescription= styled.p`
font-size:13px;
line-height:1.37em;
`
export default DevProjectBoard