import React, { useEffect } from "react";
import styled from "styled-components";
import iconUspOne from "../../../resources/icon-usp.png"
import iconOne from "../../../resources/icon-1.png"
import iconTwo from "../../../resources/icon-2.png"
import iconThree from "../../../resources/icon-3.png"
import iconFour from "../../../resources/icon-4.png"
import iconFive from "../../../resources/icon-5.png"

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);

const UpsSkill = () => {



  
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".usp-header-anim > *", {
        scrollTrigger: {
          trigger: ".usp-section",
          start: "top 80%",
        },
        y: 20,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
        stagger: 0.12,
      });

      gsap.from(".usp-box-parent", {
        scrollTrigger: {
          trigger: ".usp-grid",
          start: "top 80%",
        },
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
        stagger: 0.12,
        clearProps: "transform,opacity",
      });

      gsap.from(".usp-box-parent.special", {
        scrollTrigger: {
          trigger: ".usp-box.special",
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <UspAllContainer
      ref={sectionRef}
      className="site-width-container usp-section"
    >


      
      <HeaderContainer className="usp-header-anim">
        <SectionHeader>Web Designer & Frontend Developer</SectionHeader>
        <p>
          I design and build modern, responsive websites from clean UI and UX
          thinking to solid frontend code. I focus on clarity, performance, and
          real-world usability.
        </p>
      </HeaderContainer>

      <UspContainer className="site-width-container usp-grid">
        <UspItemBox  className="usp-box-parent">
          <div className="usp-box">
            <IconBox src={iconOne} />
            <Header>Design → Code Workflow</Header>
            <p>
              Translating Figma designs into real products—accurate spacing,
              typography, components, and interactions.
            </p>
          </div>
        </UspItemBox>

        <UspItemBox className="usp-box-parent">
          <div className="usp-box">
            <IconBox src={iconTwo} />
            <Header>Frontend Development</Header>
            <p>
              Building responsive interfaces with HTML, CSS, JavaScript, and
              React, turning designs into clean, maintainable code.
            </p>
          </div>
        </UspItemBox>

        <UspItemBox className="usp-box-parent">
          <div className="usp-box">
            <IconBox src={iconThree} />
            <Header>Responsive & Mobile-First</Header>
            <p>
              Layouts that adapt smoothly to all screen sizes, with mobile-first
              thinking and attention to touch interactions.
            </p>
          </div>
        </UspItemBox>

        <UspItemBox className="usp-box-parent">
          <div className="usp-box">
            <IconBox src={iconFour} />
            <Header>Performance & Clean UI</Header>
            <p>
              Optimizing UI for speed, readability, and smooth interactions
              while keeping the interface minimal and modern.
            </p>
          </div>
        </UspItemBox>

        <UspItemBox className="usp-box-parent">
          <div className="usp-box">
            <IconBox src={iconFive} />
            <Header>CRO (Conversion Rate Optimization)</Header>
            <p>
              Designing pages with clear CTAs, logical user flow, and reduced
              friction to improve engagement and conversions.
            </p>
          </div>
        </UspItemBox>

        <UspItemBoxSpecial className="usp-box-parent">
          <div className="usp-box special">
            <Header>View my resume</Header>
            <p>
              Find out about my works: read through my case studies, have a look
              at final designs and try out prototypes I’ve built.
            </p>

            <a style={{ maxWidth: "170px" }} className="btn">
              View project
              <div className="arrow-wrapper">
                <div className="arrow" />
              </div>
            </a>
          </div>
        </UspItemBoxSpecial>
      </UspContainer>
    </UspAllContainer>
  );
};





const UspAllContainer = styled.div`
margin:50px auto;
`;
const UspContainer = styled.div`
  display: flex;
    flex-wrap:wrap;
    gap:25px;
`;

const UspItemBox = styled.div`
display: flex;
  flex-direction: column;
  width: 31%;
  padding: 1px;
  border-radius: 12px;


background-image: radial-gradient(46.99% 43.05% at 2.58% 100%,rgba(183, 193, 234, 0.4) 0,#02020400 100%),radial-gradient(55.18% 55.16% at 12.42% -3.42%,rgba(67, 59, 115, 0) 0,#18132b7a 100%);
  // outline: 1px solid #ffffff17
  // background-color: #ffffff17;
  // background-image: radial-gradient(46.99% 43.05% at 2.58% 100%,rgba(46,48,56,.4) 0,transparent 100%),radial-gradient(55.18% 55.16% at 12.42% -3.42%,rgba(120, 117, 133, 0.3) 0,transparent 100%);
`;

const UspItemBoxSpecial = styled.div`
display: flex;
  flex-direction: column;
  width: 31%;
  padding: 1px;
  border-radius: 12px;


background-image: radial-gradient(46.99% 43.05% at 2.58% 100%,rgba(242, 155, 155, 0.4) 0,#1b181c70 100%),radial-gradient(55.18% 55.16% at 12.42% -3.42%,rgb(46, 31, 106) 0,#060112 100%);
 
`;
const Header = styled.h5`
font-size: 18px;
  margin: 15px 0;
  font-weight:300;

`;


const IconBox = styled.img`
width: 47px;
  border-radius: 10px;
  margin-bottom:10px;
box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;

`;



const HeaderContainer = styled.div`
display: flex;
  flex-direction: column;
  margin-bottom:25px;

`;

const SectionHeader = styled.h3`
font-size: 25px;
  margin: 0;
  font-weight:300;

`;
export default UpsSkill;
