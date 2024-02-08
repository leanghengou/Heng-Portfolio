import React from "react";
import { useState } from "react";
import styled from "styled-components"
const Footer = ()=>{
    return (
        <div className="contact-homepage-section-fc">
        <CopyrightText>Keep in touch</CopyrightText>
        <FooterListsContainer>
                <li><FooterListUrl target="_blank" href="https://www.linkedin.com/in/leanghengou/"><img src="https://res.cloudinary.com/dgqfcwu7y/image/upload/v1696300638/Group_8701_re9bg4.png"/></FooterListUrl></li>
                <li><FooterListUrl target="_blank" href="https://github.com/leanghengou"><img src="https://res.cloudinary.com/dgqfcwu7y/image/upload/v1696300637/Group_8698_rwwtxr.png"/></FooterListUrl></li>
                <li><FooterListUrl target="_blank" href="https://www.behance.net/leanghengou"><img src="https://res.cloudinary.com/dgqfcwu7y/image/upload/v1696300636/Group_8693_je3w9s.png"/></FooterListUrl></li>
                <li><FooterListUrl target="_blank" href="https://www.instagram.com/heng_design/"><img src="https://res.cloudinary.com/dgqfcwu7y/image/upload/v1696300637/Group_8699_jwjrko.png"/></FooterListUrl></li>
            </FooterListsContainer>
        </div>
    )
}




const FooterListsContainer = styled.ul`
    display: flex;
  justify-content: flex-start;
  list-style-type: none;
  margin-top: 40px;
  margin-left: 0px;
  padding: 0px;
    justify-content:center;
}
`

const FooterListUrl = styled.a`
 margin:10px;
}
`

const CopyrightText = styled.p`
text-align:center;
}
`
export default Footer