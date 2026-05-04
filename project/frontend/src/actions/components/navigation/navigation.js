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
                    <li><a href="/about">About</a></li>
                    <li><a href="/">Contact</a></li>
                  </ul>
            </MenuLinks>

               
        </MenuContainer>
   
    )
}









  



const LogoContainer = styled.div`
// background-color:#5319CE;
padding-left:15px;
padding-bottom:10px;
padding-top:10px;
`
const MenuContainer=styled.div`
 display: flex;
  align-items: center;
  justify-content: center;
 position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
  padding: 10px 0;
`
const MenuLinks=styled.div`
border-radius: 8px;
  background: #00000078;
  border: 1px solid #ffffff2b;
  backdrop-filter: blur(10px);
`

export default Navigation;