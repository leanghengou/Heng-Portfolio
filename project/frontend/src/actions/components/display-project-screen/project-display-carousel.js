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
        console.log("ElementTop:", elementTop,"Element Visible:",elementVisible, "Window Height:", windowHeight, elementTop < windowHeight - elementVisible
        
        )

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
                realating:["Illustration", "Poster Design"],
                subTitle:"30 Days of Daily Posters was my personal project that I challenged myself to make one poster everyday.",
                colorVibe:"linear-gradient(to top, #040300a3, #000000f7),radial-gradient(circle at top, #234be8,#ff950c00);"
    },
    {
        tag:"Workout App",
        img:"https://res.cloudinary.com/dgqfcwu7y/image/upload/v1696873824/Heng%20Website/ucghcebtxltl9o8xnqqz.jpg",
        title:"StartNow",
        date:"January 27th 2022",
        realating:["UI/UX", "Mobile App", "Case Study"],
        subTitle:"StartNow is my first UX case study project that I did in order to learn about UX process, and strategy. I also designed visual for the project to make it both UI and UX project.",
        colorVibe:"linear-gradient(to top, #040300a3, #000000f7),radial-gradient(circle at top, #2ce214,#ff950c00);"
    },
    {   
        tag:"Magazine",
        img:"https://res.cloudinary.com/dgqfcwu7y/image/upload/v1696818138/Heng%20Website/er477gjcjkps7djel9rw.png",
        title:"Perspective 101 Vol.1",
        date:"February 1st 2022",
        realating:["Illustration", "Layout Design", "Graphic Design"],
        subTitle:"Perspective 101 is the collection of theses. It was to share their personal stories and thoughts on certain topic to the readers.",
        colorVibe:"linear-gradient(to top, #040300a3, #000000f7), radial-gradient(circle at top, #e6b700,#ff950c00);"
    },
    {   
        tag:"Branding",
        img:"https://res.cloudinary.com/dgqfcwu7y/image/upload/v1696873824/Heng%20Website/czmc1vs8r9u7zv7pnuov.jpg",
        title:"Everybody Fitness",
        date:"August 29th 2020",
        realating:["Bradning Indentity", "Logo"],
        subTitle:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        colorVibe:"linear-gradient(to top, #040300a3, #000000f7),radial-gradient(circle at top, #01a99c,#ff950c00);"
    },
    {   
        tag:"Branding",
        img:"https://res.cloudinary.com/dgqfcwu7y/image/upload/v1696873824/Heng%20Website/l1qsuahthxvbhulyzbym.jpg",
        title:"Fight Hunger",
        date:"September 6th 2020",
        realating:["Bradning Indentity", "Logo"],
        subTitle:"Fight Hunger, the international campaign which established to war against the world starvation.",
        colorVibe:"linear-gradient(to top, #040300a3, #000000f7),radial-gradient(circle at top, #ac261b,#ff950c00);"
    }
    ]

const DisplayScreen = ()=>{
    const [slideNum, setSlideNum] = useState(0);
    return(
        <div className="revealAnimation">
       <FocusScreen slideNum={slideNum} setSlideNum={setSlideNum} totalSlides={totalSlides}/>
       <CarouselSlides  slideNum={slideNum} setSlideNum={setSlideNum} totalSlides={totalSlides}/>
       </div>
       
    )
}

const FocusScreen = ({totalSlides, slideNum,setSlideNum})=>{
    let currentProject = totalSlides[slideNum]
    console.log("HEYYYY",currentProject.colorVibe)
    return(
        <FocusScreenContainer colorVibe={currentProject.colorVibe}>
            <div className="focus-screen-image-box">
            <FearturedImageSlide bgImg = {currentProject.img}/>
            </div>
            <div className="focus-screen-text-box">
                <p><span>{currentProject.tag}</span></p>
                <h3>{currentProject.title}</h3>
                <p>{currentProject.subTitle}</p>
            </div>
        </FocusScreenContainer>
    )
}



const CarouselSlides = ({totalSlides, slideNum,setSlideNum})=>{
 

    const slideNext = ()=>{
      
        if(slideNum >= 4){
            setSlideNum(slideNum-4)
        }else{
            setSlideNum(slideNum+1)
        }
    }

    const slidePrev = ()=>{
        
       
        if(slideNum <= 0){
            setSlideNum(slideNum+4)
        }else{
            setSlideNum(slideNum-1)
        }
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
                        
                        
                        setSlideNum(index)
                    }} className="selected-slide" key={index}>
                        <ImageSlide image={value.img}/>
                        </div>
                        
                )
               }else{
                return(
                    <div onClick={ ()=>{
                        reveal()
                        setSlideNum(index)
                    
                    }} key={index}>
                     
                        <ImageSlide image={value.img}/>
                    
                        </div>
                )
               }
            }

           )}

{/* ----------------------------------Carousel buttons -------------------------- */}
    {/* <div onClick={slidePrev} id="prevSlide" className="prev-slide"><img src="https://res.cloudinary.com/dgqfcwu7y/image/upload/v1696813958/Heng%20Website/wadpbfsxxjdutkyl59je.svg"/></div>
            <div onClick={slideNext} id="nextSlide" className="next-slide"><img src="https://res.cloudinary.com/dgqfcwu7y/image/upload/v1696813958/Heng%20Website/cgsx5cmhgx5toxkswgvr.svg"/></div> */}
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

const FearturedImageSlide= styled.div`
width:500px;
height:350px;
background-position:center;
background-image: url(${(props)=>props.bgImg});
background-size:cover;
border-radius:3px;
cursor:pointer;

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