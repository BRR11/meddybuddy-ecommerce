import React from 'react'
import "/Users/rishanthreddy/Desktop/MERN APP/frontend/src/component/Footer/Footer.css"
import {BsTelephone} from "react-icons/bs"
import {CgMail} from "react-icons/cg"
function Footer() {
  return (
    
    <footer id = "footer">
        <div className = "footer1">
          <h1>STORE ADDRESS</h1>
          <p>Located At</p>
          <p>Inner Canteen BIT MESRA RANCHI JHARKHAND INIDA</p>
        </div>
        <div className = "footer2">
            <h1>BIT PHARMACY</h1>
            <p>Quality Is Our First Priority</p>

        </div>
        <div className = "footer3">
             <h1>CONTACT DETAILS</h1>
            <BsTelephone className="reacticon"/> 
            <p>xxxxxxxxx</p>
           <CgMail className="reacticon"/> 
           <p>xxxxxx@gmail.com</p>
             
        </div>
    </footer>
  )
}

export default Footer;