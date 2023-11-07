import React from "react";
import { useState } from "react";
import "./contact-homepage.css"
import styled from "styled-components"


const ContactHomepage = ()=>{
    return (
        <div className="contact-homepage-section-fc">
 <div className="contact-homepage-section">
            <p><span className="highlight-tag-box-style">let's talk!</span></p>
            <h3>Looking to contact?</h3>
            <p>We strive to provide the highest quality clothing at the best prices, so you can look your best without breaking the bank.</p>
            <div className="a-tag-url-container"><a className="button-dev-project-two">Contact</a></div>
        </div>
        <div className="contact-homepage-img-container">

            <img className="contact-image-one" src="https://res.cloudinary.com/dgqfcwu7y/image/upload/v1699153657/Group_8711_owrfgp.png"/>
            <img className="contact-image-two" src="https://res.cloudinary.com/dgqfcwu7y/image/upload/v1699153657/Group_8713_awycnp.png"/>
            <img className="contact-image-three" src="https://res.cloudinary.com/dgqfcwu7y/image/upload/v1699153658/Group_8714_vudzb3.png"/>
            <img className="contact-image-four" src="https://res.cloudinary.com/dgqfcwu7y/image/upload/v1699153658/Group_8714_vudzb3.png"/>
        </div>
        </div>

    )
}

export default ContactHomepage