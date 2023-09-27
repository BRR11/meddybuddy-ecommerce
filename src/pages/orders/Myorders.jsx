import React from 'react'
import Navbar from '../../component/Navbar/Navbar'
import "../orders/myorders.scss"
import OrderTable from '../../component/orders/Ordertable'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react'

function Myorders() {
  const {isAuthentcated,user} = useSelector(state => state.user);
 

  const navigate = useNavigate();
 

  useEffect(() => {
    if (!isAuthentcated) {
      navigate('/login');
    }
  }, [isAuthentcated, navigate]);
  
  return (
    <div className='listpage'>
     
       <Navbar/>
      <div className='listcontainer'>
       
       <OrderTable /> 
          
      </div>
     
    </div>
  )
}

export default Myorders