import React, { useState } from 'react'
//import "/Users/rishanthreddy/Desktop/MERN APP/frontend/src/component/section1/section1.css"
import "../section1/section1.css"
import { Link } from 'react-router-dom'
function Section1() {

   
  return (
     
    <div class="section">
        
        <div class="section_content">
            <p class="section_content1">Genuine Medicines Delivered At<br/>Your Doorstep</p>
            <p class = "section_content2">FLAT</p>
            <h1 class = "section_content3">20% OFF</h1>
            <p class = "section_content4">ON ALL MEDICINES</p>
            <Link to = "/products">
            <button class = "section_button">Order NOW</button>

            </Link>
          
        </div>

    </div>


    
  )
}

export default Section1