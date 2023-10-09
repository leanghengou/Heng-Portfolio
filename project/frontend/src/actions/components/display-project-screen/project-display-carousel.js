import React from "react";
import { useState } from "react";
import "./project-display-carousel.css"

const DisplayScreen = ()=>{
    return(
        <div>
       <FocusScreen/>
       <CarouselSlides/>
       </div>
    )
}

const FocusScreen = ()=>{
    return(
        <div className="focus-screen-container">
            <div className="focus-screen-image-box">
            <a><img src="https://i.postimg.cc/L8RZT2Hz/Mask-group.png"/></a>
            </div>
            <div className="focus-screen-text-box">
                <p><span>Inspirational</span></p>
                <h3>Perspective 101</h3>
                <p>We strive to provide the highest quality clothing at the best prices, so you can look your best without breaking the bank.</p>
            </div>
        </div>
    )
}



const CarouselSlides = ()=>{
    const totalSlides = [
{img:"https://res.cloudinary.com/dgqfcwu7y/image/upload/v1696817382/Heng%20Website/d14racjcrcor4loua4vd.png"},
{img:"https://res.cloudinary.com/dgqfcwu7y/image/upload/v1696817382/Heng%20Website/y42wnqqee8ess1bzkncz.png"},
{img:"https://res.cloudinary.com/dgqfcwu7y/image/upload/v1696818138/Heng%20Website/er477gjcjkps7djel9rw.png"},
{img:"https://res.cloudinary.com/dgqfcwu7y/image/upload/v1696817382/Heng%20Website/tjwpf603trm56psatrdw.png"},
{img:"https://res.cloudinary.com/dgqfcwu7y/image/upload/v1696817382/Heng%20Website/jtkkfkpj3auulumdeuau.png"},
    ]
    const [slideNum, setSlideNum] = useState(3);
    console.log("slideNum -----", slideNum)
    const slideNext = ()=>{
      
        if(slideNum >= 5){
            setSlideNum(slideNum-4)
        }else{
            setSlideNum(slideNum+1)
        }
    }

    const slidePrev = ()=>{
        
       
        if(slideNum <= 1){
            setSlideNum(slideNum+4)
        }else{
            setSlideNum(slideNum-1)
        }
    }
    return(
        <div className="carousel-slide-container">
      
           {totalSlides.map((value,index)=>{
            console.log(index)

            if( index===2){

                console.log("This is index 3", index)
                return(
                    <div className="selected-slide" key={index}>
                        <div>
                        <img  src={`${value.img}`}/>
                        </div>
                        </div>
                )
               }else{
                return(
                    <div key={index}>
                        <div>
                        <img src={`${value.img}`}/>
                        </div>
                        </div>
                )
               }
            }

           )}


            <div onClick={slidePrev} id="prevSlide" className="prev-slide"><img src="https://res.cloudinary.com/dgqfcwu7y/image/upload/v1696813958/Heng%20Website/wadpbfsxxjdutkyl59je.svg"/></div>
            <div onClick={slideNext} id="nextSlide" className="next-slide"><img src="https://res.cloudinary.com/dgqfcwu7y/image/upload/v1696813958/Heng%20Website/cgsx5cmhgx5toxkswgvr.svg"/></div>
        </div>
    )
}



export default DisplayScreen;