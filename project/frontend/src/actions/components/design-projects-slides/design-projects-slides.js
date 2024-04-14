import React from "react";
import { useState } from "react";
import "./design-projects-slides.css"
import styled from "styled-components"



const DesignProjectsSlides = ()=>{
    return(

        <DesignProjectSlideBox>

<div class="skill-icons-title site-width-container"><p><span class="highlight-tag-box-style">without breaking</span></p><h3>My passion and focus is learning.</h3><p>We strive to provide the highest quality clothing at the best prices, so you can look your best without breaking the bank.</p></div>

        <div className="design-project-slides-final-container">
        <div className="design-project-slides-container">

            <div style={{ backgroundImage:"url('https://res.cloudinary.com/dgqfcwu7y/image/upload/v1696873825/Heng%20Website/wo4usyxue9wlzcwo13bg.jpg')"}}></div>
            <div style={{ backgroundImage:"url('https://res.cloudinary.com/dgqfcwu7y/image/upload/v1696818138/Heng%20Website/er477gjcjkps7djel9rw.png')"}}></div>
            <div style={{ backgroundImage:"url('https://res.cloudinary.com/dgqfcwu7y/image/upload/v1696873824/Heng%20Website/ucghcebtxltl9o8xnqqz.jpg')"}}></div>
            <div style={{ backgroundImage:"url('https://res.cloudinary.com/dgqfcwu7y/image/upload/v1696873824/Heng%20Website/czmc1vs8r9u7zv7pnuov.jpg')"}}></div>
        </div>

        <div className="design-project-slides-container">

<div style={{ backgroundImage:"url('https://res.cloudinary.com/dgqfcwu7y/image/upload/v1696873825/Heng%20Website/wo4usyxue9wlzcwo13bg.jpg')"}}></div>
<div style={{ backgroundImage:"url('https://res.cloudinary.com/dgqfcwu7y/image/upload/v1696818138/Heng%20Website/er477gjcjkps7djel9rw.png')"}}></div>
<div style={{ backgroundImage:"url('https://res.cloudinary.com/dgqfcwu7y/image/upload/v1696873824/Heng%20Website/ucghcebtxltl9o8xnqqz.jpg')"}}></div>
<div style={{ backgroundImage:"url('https://res.cloudinary.com/dgqfcwu7y/image/upload/v1696873824/Heng%20Website/czmc1vs8r9u7zv7pnuov.jpg')"}}></div>
</div>
        </div>


        <div style={{display:'none',}} className="design-project-slides-final-container">
        <div className="design-project-slides-container-two">

            <div style={{ backgroundImage:"url('https://res.cloudinary.com/dgqfcwu7y/image/upload/v1696873825/Heng%20Website/wo4usyxue9wlzcwo13bg.jpg')"}}></div>
            <div style={{ backgroundImage:"url('https://res.cloudinary.com/dgqfcwu7y/image/upload/v1696818138/Heng%20Website/er477gjcjkps7djel9rw.png')"}}></div>
            <div style={{ backgroundImage:"url('https://res.cloudinary.com/dgqfcwu7y/image/upload/v1696873824/Heng%20Website/ucghcebtxltl9o8xnqqz.jpg')"}}></div>
            <div style={{ backgroundImage:"url('https://res.cloudinary.com/dgqfcwu7y/image/upload/v1696873824/Heng%20Website/czmc1vs8r9u7zv7pnuov.jpg')"}}></div>
        </div>

        <div className="design-project-slides-container-two">
<div style={{ backgroundImage:"url('https://res.cloudinary.com/dgqfcwu7y/image/upload/v1696873825/Heng%20Website/wo4usyxue9wlzcwo13bg.jpg')"}}></div>
<div style={{ backgroundImage:"url('https://res.cloudinary.com/dgqfcwu7y/image/upload/v1696818138/Heng%20Website/er477gjcjkps7djel9rw.png')"}}></div>
<div style={{ backgroundImage:"url('https://res.cloudinary.com/dgqfcwu7y/image/upload/v1696873824/Heng%20Website/ucghcebtxltl9o8xnqqz.jpg')"}}></div>
<div style={{ backgroundImage:"url('https://res.cloudinary.com/dgqfcwu7y/image/upload/v1696873824/Heng%20Website/czmc1vs8r9u7zv7pnuov.jpg')"}}></div>
</div>
        </div>


        </DesignProjectSlideBox>
    )
}



const DesignProjectSlideBox = styled.div`

padding:100px 0;
`
export default DesignProjectsSlides;
