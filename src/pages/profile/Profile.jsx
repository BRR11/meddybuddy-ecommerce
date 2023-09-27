import "../profile/profile.scss";
import { useNavigate } from "react-router-dom";
import { useSelector} from "react-redux/es/hooks/useSelector";
import { useState } from "react";
import Navbar from "../../component/Navbar/Navbar";
import { Link } from "react-router-dom";

const Profile = () => {
           
  
  const user = useSelector((state) => state.user.user)
  

  return (
   
    <div className="single">
     <Navbar/>
    <div className="singleContainer">
             
             <div>
                
             <h1 className="title1">My Profile</h1>
             </div>
            
              <div className="top">
         
                  <div className="productcontainer">
                          <img
                          src= "https://res.cloudinary.com/dtydm8bli/image/upload/v1689237613/1_xnifmn.png"
                          alt=""
                          className="productimg"
                      />
                      <div className="productdetails">
              
                           <div className="detailItem1">
                              <span className="itemKey1">Name:</span>
                              <span className="itemValue1">{user.name}</span>
                          </div>
                          <div className="detailItem1">
                              <span className="itemKey1">Email:</span>
                              <span className="itemValue1">
                              {user.email}
                              </span>
                           </div>
                           <div className="detailItem1">
                              <span className="itemKey1">Role:</span>
                              <span className="itemValue1">
                              {user.role}
                              </span>
                           </div>
                          
                      </div>
                      
                         <div className="btn">
                            <Link to = "/updateprofile">
                            <button>Edit</button>
                            </Link>
                          
                         </div>
                  </div>

          
              </div>

             
      </div>

     

      </div>
        
     
  
);
};

export default Profile;