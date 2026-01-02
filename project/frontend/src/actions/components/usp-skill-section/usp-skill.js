import React from "react";
import styled from "styled-components";
import iconUspOne from "../../../resources/icon-usp.png"

const UpsSkill = () => {
  return (

    <UspAllContainer  className="site-width-container">

     <HeaderContainer> 
      <SectionHeader>30 days challenges</SectionHeader>
    <p>Find out about my works: read through my case studies, have a look at final designs and try out prototypes I’ve built.</p>
</HeaderContainer>  
    <UspContainer className="site-width-container">
      <UspItemBox>
           <div className="usp-box">
        <IconBox src={iconUspOne} />
                <Header>30 days challenges</Header>
        <p>
          Find out about my works: read through my case studies, have a look at
          final designs and try out prototypes I’ve built.
        </p>
        </div>
      </UspItemBox>


      <UspItemBox>
        
       
         <div className="usp-box">
            <IconBox src={iconUspOne} />
                <Header>30 days challenges</Header>
        <p>
          Find out about my works: read through my case studies, have a look at
          final designs and try out prototypes I’ve built.
        </p>
        </div>
      </UspItemBox>


      <UspItemBox>

          <div className="usp-box">
            <IconBox src={iconUspOne} />
                 <Header>30 days challenges</Header>
        <p>
          Find out about my works: read through my case studies, have a look at
          final designs and try out prototypes I’ve built.
        </p></div>
      </UspItemBox>


      <UspItemBox>
        <div className="usp-box">
            <IconBox src={iconUspOne} />
         <Header>30 days challenges</Header>
        <p>
          Find out about my works: read through my case studies, have a look at
          final designs and try out prototypes I’ve built.
        </p>
        </div>
      </UspItemBox>


      <UspItemBox>  <div className="usp-box">
   
            <IconBox src={iconUspOne} />
         <Header>30 days challenges</Header>
        <p>
          Find out about my works: read through my case studies, have a look at
          final designs and try out prototypes I’ve built.
        </p>
        </div>
      </UspItemBox>

      <UspItemBoxSpecial>
          <div className="usp-box special">

               <Header>View my resume</Header>
        <p>
          Find out about my works: read through my case studies, have a look at
          final designs and try out prototypes I’ve built.
        </p>

          <a   style={{ maxWidth: "170px" }} className="btn">View project <div class="arrow-wrapper">
        <div class="arrow"></div>

    </div></a></div>
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
width: 38px;
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
