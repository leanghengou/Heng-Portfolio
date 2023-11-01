import React from "react";
import './navigation-style.css'
import styled from "styled-components"
const Navigation=()=>{
    return(
        <MenuContainer>
            <LogoContainer>
                  <p><img src="https://res.cloudinary.com/dgqfcwu7y/image/upload/v1696211356/Group_8696_kloxyu_2_m7zznf.svg"/></p>
            </LogoContainer>
            <MenuLinks> 
                  <ul className="menu-link-container">
                    <li><a href="/">Home</a></li>
                    <li><a href="/">Works</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/">Contact</a></li>
                  </ul>
            </MenuLinks>
               
        </MenuContainer>
   
    )
}

const LogoContainer = styled.div`
background-color:#5319CE;
padding:10px 70px;
`
const MenuContainer=styled.div`
padding:0 10px;
padding-left:0px;
display:flex;
align-items:center;
border-bottom: 1px solid #ffffff3d;
`
const MenuLinks=styled.div`
`

export default Navigation;