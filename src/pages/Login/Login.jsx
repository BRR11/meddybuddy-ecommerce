import React from 'react'
import "../Login/login.scss"
import Navbar from '../../component/Navbar/Navbar'
import { useState ,useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartFromDB, loginUser } from '../../redux/apicalls';
import { Link, useNavigate } from 'react-router-dom';
//import { fetchCartFromDB } from '../../redux/apicalls';

function Login() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const isAuthenticateduser = useSelector(state => state.user.isAuthentcated);
    const user = useSelector(state => state.user.user);
   

    

    useEffect(() => {
    
        if(isAuthenticateduser)
        {
           fetchCartFromDB(dispatch,user._id);
           
           navigate("/");
        }
           
         
       }, [dispatch,isAuthenticateduser])

   const navigate = useNavigate();
    const handleClick = async (e) => {
      e.preventDefault();
     
      loginUser(dispatch,email,password);
      

  
     
    
    };
    

   
    
  return (
    <div className="logindiv">
    <Navbar/>

    <div className="div1">
          <form>
            <h1>
            USER LOGIN
            </h1>
            <label>
              EMAIL ID
            </label>
            <input name = "email" type = "text" placeholder="Enter Your Email" onChange={(e) => setEmail(e.target.value)}></input>
            <label>
              Password
            </label>
            <input name = "password" type = "password" placeholder="Enter Your Password" onChange={(e) => setPassword(e.target.value)} ></input>
            <button onClick={handleClick} >Login</button>
            <Link to = "/register" >
            <p>New On BIT Pharmacy? Sign Up</p>
            </Link>
           
          </form>
        
      </div>
   </div>
  )
}

export default Login