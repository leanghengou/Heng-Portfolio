import React, { useState } from "react";
import "./web-dev-section-hp.css";


const WebDevSection = ()=>{
     const [activeIndex, setActiveIndex] = useState(1)



const projects = [
    {
        title :"Insper U",
        role : "Developer",
        date: "March, 11, 2026",
        desc: "Find out about my works: read through my case studies, have a look at final designs and try out prototypes I’ve built.",
        image: "https://picsum.photos/600/800?1",
        codingLanguage: ["React.js", "Javascript", "Node.js"],
    },
       
    {
        title :"Project 1",
        role : "Developer",
        date: "March, 11, 2026",
        desc: "Find out about my works: read through my case studies, have a look at final designs and try out prototypes I’ve built.",
        image: "https://picsum.photos/600/800?1",
        codingLanguage: ["React.js", "Javascript", "Node.js"],
    },
       {
        title :"Project 1",
        role : "Developer",
        date: "March, 11, 2026",
        desc: "Find out about my works: read through my case studies, have a look at final designs and try out prototypes I’ve built.",
        image: "https://picsum.photos/600/800?1",
        codingLanguage: ["React.js", "Javascript", "Node.js"],
    }
]


return(
    <div className="site-width-container">

        <div className="web-dev-section-flex">


{/* Left side  */}

<div className="web-dev-item">
    {
        projects.map((item, index)=>{

            return(
            <div key={index} className={`web-dev-item-content ${
                activeIndex === index ? "active" : ""}`}
                onMouseEnter={()=>{ setActiveIndex(index) }}>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                    <a className="btn">
                View project
                <div className="arrow-wrapper">
                  <div className="arrow"></div>
                </div>
              </a>
               
            </div>
            )
            
        })
    }


</div>


<div className="web-dev-item-banner">
    <img key={activeIndex}
            src={projects[activeIndex].image}
            alt={`${projects[activeIndex].title}`}/>
</div>

        </div>
    </div>
)
}
export default WebDevSection;