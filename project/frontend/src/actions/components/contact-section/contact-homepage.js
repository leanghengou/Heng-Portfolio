import React from "react";
import { useState } from "react";
import "./contact-homepage.css"
import styled from "styled-components"


const ContactHomepage = ()=>{
    return (
        <div className="site-width-container contact-homepage-section-fc-all">
        <div className="contact-homepage-section-fc">
 <div className="contact-homepage-section">
            <p><span className="highlight-tag-box-style">let's talk!</span></p>
            <h3>Looking to contact?</h3>
            <p>We strive to provide the highest quality clothing at the best prices, so you can look your best without breaking the bank.</p>
            {/* <div className="a-tag-url-container"><a className="button-dev-project-two">Contact</a></div> */}
    </div>



    <div className="contact-form-message">
        <form>

<div className="contact-form-flex-row">


            <div>
        <label for="fname">First name</label><br></br>
    <input type="text" id="fname" name="firstname" placeholder="Your name.."/><br></br>

    </div>

    <div>
        <label for="fname">First name</label><br></br>
    <input type="text" id="fname" name="firstname" placeholder="Your name.."/><br></br>

    </div>

</div>

    <label for="lname">Last name</label><br></br>
    <input type="text" id="lname" name="lastname" placeholder="Your last name.."/><br></br>


    <label for="lname">Message </label><br></br>
    <textarea type="text" id="lname" name="lastname" placeholder="Your message"/><br></br>


    </form>
    <div className="contact-form-button"><button>Submit</button></div>
    </div>

        
        </div>


<div className="title-contact-background">
    
    <img src="https://i.postimg.cc/2j0B2z87/Mask-group.png"/></div>

        </div>

    )
}

export default ContactHomepage