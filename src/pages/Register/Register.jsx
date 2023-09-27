import React from 'react'
import "../Register/register.scss"
import Navbar from '../../component/Navbar/Navbar'
import { registerUser } from '../../redux/apicalls';
import { useState ,useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/apicalls';
import { useNavigate } from 'react-router-dom';


function Register() {
    
    const [name,setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
     
    const isAuthenticatedUser = useSelector(state => state.user.isAuthentcated)
    const handleClick = async (e) => {
      e.preventDefault();

      registerUser(dispatch,name,email,password);
     
     
    };

    useEffect(() => {
      if(isAuthenticatedUser)
      {
        navigate("/");
      }
    }, [dispatch,isAuthenticatedUser])
    

  return (
    <div className="registerdiv">

    <Navbar/>

    <div className="div1">
          <form>
            <h1>
            SIGN UP
            </h1>
            <label>
              NAME
            </label>
            <input name = "name" type = "text" placeholder="Enter Your Name" onChange={(e) => setName(e.target.value)}></input>
            <label>
              EMAIL ID
            </label>
            <input name = "email" type = "text" placeholder="Enter Your Email" onChange={(e) => setEmail(e.target.value)}></input>
            <label>
              Password
            </label>
            <input name = "password" type = "password" placeholder="Enter Your Password" onChange={(e) => setPassword(e.target.value)} ></input>
            <button onClick={handleClick} >Sign Up</button>
          </form>
        
      </div>
   </div>
  )
}

export default Register