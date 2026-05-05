import React from "react";
import './navigation-style.css'
import styled from "styled-components"
import { useState, useRef, useEffect } from "react";






  



const Navigation=()=>{




    return(
        <MenuContainer  className="header-width-container header-box">
            <LogoContainer>
  

       </LogoContainer>
            <MenuLinks> 
                  <ul className="menu-link-container">
                    <li className="current-selected-item"><a href="/">Home</a></li>
                    <li><a href="/">Works</a></li>
                    <li><a href="/resume">Resume</a></li>
                    <li><a href="/">Contact</a></li>
                  </ul>
            </MenuLinks>

               
        </MenuContainer>
   
    )
}









  



const LogoContainer = styled.div`
// background-color:#5319CE;
padding-left:15px;
padding-bottom:15px;
padding-top:10px;
`
const MenuContainer=styled.div`
 display: flex;
  align-items: center;
  justify-content: center;
 
  top: 0;
  width: 100%;
  z-index: 100;
  padding: 20px 0;
`
const MenuLinks=styled.div`
border-radius: 12px;
background: #302f2f14;
border: 1px solid #fdfaff1f;
backdrop-filter: blur(10px);
background-image: radial-gradient(46.99% 43.05% at 2.58% 100%,rgba(255, 255, 255, 0.23) 0,#00000021 100%),radial-gradient(55.18% 55.16% at 12.42% -3.42%,rgba(243, 243, 243, 0.18) 2%,#2d13a826 100%);
`

export default Navigation;