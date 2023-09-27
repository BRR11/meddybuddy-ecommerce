import React from 'react'
import "../profile/updateprofile.scss"

import Navbar from '../../component/Navbar/Navbar'
import { useNavigation } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useState ,useEffect} from "react";
import { useDispatch } from "react-redux";
import { updateProfile } from '../../redux/apicalls';

function Updateprofile() {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const dispatch = useDispatch();


   
  
    const handleClick = (e)=>{
       e.preventDefault();

       updateProfile(dispatch,name,email)
  
       
     
    }
    
  return (
   
   
<div>
    <Navbar/>
 <div className='updateprofilepage'>
<h1 className="title1">Edit Profile</h1>
<div className="bottom">
   
   
      <div className="right" >
        <form >
       
           
         <div className="formInput">
            <label >
             Name
            </label>
            <input
              type="text"
              name = "name"
              onChange={ (e) => setName(e.target.value)}
              
            />
          </div>

          <div className="formInput">
            <label >
              Email Id
            </label>
            <input
              type="text"
              name = "email"
              onChange= {(e) => setEmail(e.target.value)}
             
            />
          </div>

          
         <div className="buttondiv">
         <button onClick={handleClick}>Update</button>
         </div>
          
       
          
    </form>
    </div>




    
    </div>
</div>
    </div>
   

    
  )
}

export default Updateprofile