import React from "react";
import { useState } from "react";
import "./project-display-carousel.css"
import styled from "styled-components"


function reveal() {
    let reveals = document.querySelectorAll(".revealAnimation");
    for (let i = 0; i < reveals.length; i++) {
      let windowHeight = window.innerHeight;
      let elementTop = reveals[i].getBoundingClientRect().top;
      let elementVisible = 150;

      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("active");
      } 
    }
  }




  window.addEventListener("scroll", reveal);

  reveal();
 
const totalSlides = [
    {           tag:"Challange",
                img:"https://res.cloudinary.com/dgqfcwu7y/image/upload/v1696873825/Heng%20Website/wo4usyxue9wlzcwo13bg.jpg",
                title:"30 Days of Daily Posters",
                date:"September 28th 2020",
                relating:["Illustration", "Poster Design"],
                subTitle:"30 Days of Daily Posters was my personal project that I challenged myself to make one poster everyday.",
                colorVibe:"linear-gradient(to top, #040300a3, #000000f7),radial-gradient(circle at top, #234be8,#ff950c00);",
                tagColorVibe:"linear-gradient(to top, #454cbba3, #0a044ff7), radial-gradient(circle at top, #8361f9,#dde1f40d);",
                tagBg:"#180f84"
    },
    {
        tag:"Workout App",
        img:"https://res.cloudinary.com/dgqfcwu7y/image/upload/v1696873824/Heng%20Website/ucghcebtxltl9o8xnqqz.jpg",
        title:"StartNow",
        date:"January 27th 2022",
        relating:["UI/UX", "Mobile App", "Case Study"],
        subTitle:"StartNow is my first UX case study project that I did in order to learn about UX process, and strategy. I also designed visual for the project to make it both UI and UX project.",
        colorVibe:"linear-gradient(to top, #040300a3, #000000f7),radial-gradient(circle at top, #2ce214,#ff950c00);",
        tagColorVibe:"linear-gradient(to top, #108c00, #104f08), radial-gradient(circle at top, #2de315,#083b01);",
        tagBg:"#2de853"
    },
    {   
        tag:"Magazine",
        img:"https://res.cloudinary.com/dgqfcwu7y/image/upload/v1696818138/Heng%20Website/er477gjcjkps7djel9rw.png",
        title:"Perspective 101 Vol.1",
        date:"February 1st 2022",
        relating:["Illustration", "Layout Design", "Graphic Design"],
        subTitle:"Perspective 101 is the collection of theses. It was to share their personal stories and thoughts on certain topic to the readers.",
        colorVibe:"linear-gradient(to top, #040300a3, #000000f7), radial-gradient(circle at top, #e6b700,#ff950c00);",
        tagColorVibe:"linear-gradient(to top, #ffa217, #c66e00),radial-gradient(circle at top, #fb5,#f6fb6100);",
        tagBg:"#ffa217"
    },
    {   
        tag:"Branding",
        img:"https://res.cloudinary.com/dgqfcwu7y/image/upload/v1696873824/Heng%20Website/czmc1vs8r9u7zv7pnuov.jpg",
        title:"Everybody Fitness",
        date:"August 29th 2020",
        relating:["Bradning Indentity", "Logo"],
        subTitle:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        colorVibe:"linear-gradient(to top, #040300a3, #000000f7),radial-gradient(circle at top, #01a99c,#ff950c00);",
        tagColorVibe:"linear-gradient(to top, #01a99c, #004f57), radial-gradient(circle at top, #b3edff,#e2ddf43b);",
        tagBg:"#0a371e"
    },
    {   
        tag:"Branding",
        img:"https://res.cloudinary.com/dgqfcwu7y/image/upload/v1696873824/Heng%20Website/l1qsuahthxvbhulyzbym.jpg",
        title:"Fight Hunger",
        date:"September 6th 2020",
        relating:["Bradning Indentity", "Logo"],
        subTitle:"Fight Hunger, the international campaign which established to war against the world starvation.",
        colorVibe:"linear-gradient(to top, #040300a3, #000000f7),radial-gradient(circle at top, #ac261b,#ff950c00);",
        tagColorVibe:"linear-gradient(to top, #c81d10, #500), radial-gradient(circle at top, #d51506e8,#fff0);",
        tagBg:"#680700"
    }
    ]

const DisplayScreen = ()=>{
    const [slideNum, setSlideNum] = useState(0);
    const [animationClass, setAnimationClass]= useState("")
    
    return(
        <div className="revealAnimation">
       <FocusScreen  animationClass={animationClass} setAnimationClass={setAnimationClass} slideNum={slideNum} setSlideNum={setSlideNum} totalSlides={totalSlides}/>
       <CarouselSlides animationClass={animationClass} setAnimationClass={setAnimationClass}  slideNum={slideNum} setSlideNum={setSlideNum} totalSlides={totalSlides}/>
       </div>
       
    )
}

const FocusScreen = ({totalSlides, slideNum,setSlideNum,setAnimationClass,animationClass})=>{

    let currentProject = totalSlides[slideNum]
    return(
        <FocusScreenContainer className={animationClass} id="focusScreenId" colorVibe={currentProject.colorVibe}>
            <div className="focus-screen-image-box">
            <FearturedImageSlide bgImg = {currentProject.img}/>
            </div>
            <div className="focus-screen-text-box">
                <p><TagTitleBox tagColorVibe={currentProject.tagColorVibe} tagBg={currentProject.tagBg} >{currentProject.tag}</TagTitleBox></p>
                <h3>{currentProject.title}</h3>
                <p>{currentProject.subTitle}</p>
                <div className="focus-screen-relating-box">
                <ul>
                    {
                        currentProject.relating.map((value,index)=>{
                    
                            return(
                                <li>{value}</li>
                            )
                        }
                           
                        )
                    }
                </ul>
            </div>
            </div>

           
        </FocusScreenContainer>
    )
}



const CarouselSlides = ({totalSlides, slideNum,setSlideNum,setAnimationClass})=>{
    const startAnimation = ()=>{
        setAnimationClass("animation-start")
        setTimeout(()=>{
            setAnimationClass("")
        },500)
      }
     
      

    return(
        <div className="carousel-slide-container">
      
           {totalSlides.map((value,index)=>{
      

            if( index===slideNum){

             
                return(
                    <div  onClick={()=>{
                        let reveals2 = document.querySelectorAll(".reveal");
                        for (let i = 0; i < reveals2.length; i++) {                
                              return reveals2[i].classList.add("active");
                          }
                          startAnimation()
                          setTimeout(()=>{
                        setSlideNum(index)
                     
                    },500)
                    }} className="selected-slide" key={index}>
                        <ImageSlide image={value.img}/>
                        </div>
                        
                )
               }else{
                return(
                    <div onClick={ ()=>{
                   
                        startAnimation()
                        setTimeout(()=>{
                        setSlideNum(index)
                        },500)
                    
                    
                    }} key={index}>
                     
                        <ImageSlide image={value.img}/>
                    
                        </div>
                )
               }
            }

           )}

        </div>
    )
}


const FocusScreenContainer= styled.div`
margin-top: 70px;
margin-bottom: 30px;
padding: 50px;
display: flex;
align-items: center;
gap: 50px;
background-color: #04060C;
border-radius: 10px;
border: double 1px transparent;
border-radius: 5px;
background-image: ${props=>props.colorVibe};
background-origin: border-box;
background-clip: padding-box, border-box;
transition: all 1s ease-in-out;
`

const TagTitleBox= styled.span`
text-transform: uppercase;
letter-spacing: 0.2em;
font-size: 12px;
padding: 4px 10px;
border-radius: 3px;
border: 0.2px solid #09060600;
background: ${props=>props.tagBg};
background-image: none;
background-origin: padding-box;
background-clip: border-box;
background-image: ${props=>props.tagColorVibe};
background-origin: border-box;
background-clip: padding-box, border-box;
box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
`

const FearturedImageSlide= styled.div`
width:500px;
height:350px;
background-position:center;
background-image: url(${(props)=>props.bgImg});
background-size:cover;
border-radius:3px;
cursor:pointer;
box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
transition: all 300ms ease-in-out;

&:hover{
    opacity:0.8
}
`
const ImageSlide= styled.div`
width:100%;
height:180px;
background-position:center;
background-image: url(${(props)=>props.image});
background-size:cover;
opacity:0.2;
border-radius:3px;
cursor:pointer;

transition: all 300ms ease-in-out;

&:hover{
    opacity:0.8
}
`


export default DisplayScreen;