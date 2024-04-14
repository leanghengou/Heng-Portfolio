import React from "react";
import './navigation-style.css'
import styled from "styled-components"
import { useState, useRef, useEffect } from "react";
const headerBox = document.getElementsByClassName("header-box")

const headerOptions={
  root:null,
  rootMargin:"700px 0px",
  threshold:1,
  }





  



const Navigation=()=>{

const [sectionClassGroup, setSectionClassGroup]= useState([])

// useEffect runs anytime value changed
useEffect(()=>{
  const sectionBox = document.getElementsByClassName("section-box")
  setSectionClassGroup(Object.values(sectionBox))

}, [])

const scrollObserver = new IntersectionObserver((entries, scrollObserver)=>{
entries.forEach(entry=>{
  if(entry.isIntersecting){
    console.log("Entries is intersecting! -- > ", entry.isIntersecting, entry.target.innerText)
    
  }else if(!entry.isIntersecting){
    console.log("Entries is intersecting! -- > ", entry.isIntersecting, entry.target.innerText)
  }
},headerOptions)


})

sectionClassGroup.forEach(element => {
  scrollObserver.observe(element)
 
});


    return(
        <MenuContainer  className="header-width-container header-box">
            <LogoContainer>
                  {/* <svg  height="36" viewBox="0 0 179 76" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 75.3214V0.678571H14.8636V27.3549H21.9132V0.678571H36.7768V75.3214H21.9132V41.4777H14.8636V75.3214H0Z" fill="white"/>
<path d="M43.4017 75.3214V0.678571H73.2987V15.0982H58.605V29.6451H72.7042V43.683H58.605V60.7746H74.2754V75.3214H43.4017Z" fill="white"/>
<path d="M79.2441 75.3214V0.678571H94.6173L101.497 36.4308V0.678571H115.936V75.3214H101.327L93.8529 38V75.3214H79.2441Z" fill="white"/>
<path d="M137.977 76C127.303 76 121.966 68.3661 121.966 53.0982V20.9085C121.966 6.96949 128.082 0 140.312 0C145.352 0 149.216 1.01786 151.906 3.05357C154.595 5.06101 156.45 8.00149 157.469 11.875C158.488 15.7485 158.998 20.4702 158.998 26.0402H144.389V19.4241C144.389 17.8125 144.163 16.4695 143.71 15.3951C143.285 14.2924 142.379 13.7411 140.992 13.7411C139.265 13.7411 138.118 14.3207 137.552 15.4799C137.014 16.6391 136.745 17.9115 136.745 19.2969V55.4732C136.745 57.4807 137 59.1205 137.509 60.3929C138.047 61.6369 139.081 62.2589 140.609 62.2589C142.195 62.2589 143.242 61.6369 143.752 60.3929C144.29 59.1205 144.559 57.4524 144.559 55.3884V44.7433H140.567V31.8504H158.828V75.3214H152.84L150.292 69.0446C147.687 73.6815 143.582 76 137.977 76Z" fill="white"/>
<path d="M166.769 55.0067L163.797 0.678571H179L176.027 55.0067H166.769ZM163.797 75.279V62.6406H179V75.279H163.797Z" fill="white"/>
</svg> */}

<img width={"100px"} src="https://res.cloudinary.com/dgqfcwu7y/image/upload/v1712447855/Group_8874_zckx0e.png"/>

       </LogoContainer>
            <MenuLinks> 
                  <ul className="menu-link-container">
                    <li className="current-selected-item"><a href="/">Home</a></li>
                    <li><a href="/">Works</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/">Contact</a></li>
                  </ul>
            </MenuLinks>

            <div>
              <button className="button-dev-project-one">Work with me</button>
            </div>
               
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
padding-left:0px;
display:flex;
align-items:center;
position: fixed;
  left: 50%;
  transform: translate(-50%, -50%);
  top: 70px;

  border-radius:5px;
  z-index:100;

  justify-content: space-between;
`
const MenuLinks=styled.div`
border-radius: 100px;
  border: 1px solid rgba(255,255,255,0.2);;
  background: rgba(0,0,0,.1);
  // box-shadow: 0 0 20px 0 hsla(0,0%,100%,.1);
  backdrop-filter: blur(20px);
`

export default Navigation;