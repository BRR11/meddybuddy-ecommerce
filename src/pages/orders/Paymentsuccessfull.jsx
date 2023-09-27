import React from 'react'
import "../orders/paymentsuccessfull.scss";
import Navbar from '../../component/Navbar/Navbar';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import { useSelector, useDispatch } from "react-redux";
import DeleteIcon from '@mui/icons-material/Delete';
import { addItemsToCart } from '../../redux/apicalls';
import { removeCartItem } from '../../redux/apicalls';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createOrder } from '../../redux/apicalls';
import { useSearchParams } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Paymentsuccessfull() {

    const { shippingInfo,cartproducts} = useSelector((state) => state.cart);
    const {isAuthentcated,user} = useSelector(state => state.user);
    const dispatch = useDispatch();

    const navigate = useNavigate();
   

    useEffect(() => {
      if (!isAuthentcated) {
        navigate('/login');
      }
    }, [isAuthentcated, navigate]);
      

    
    const subtotal = cartproducts.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
      );
    
      const seachQuery = useSearchParams()[0]

      const referenceNum = seachQuery.get("reference");
      const shippingCharges = subtotal > 1000 ? 0 : 200;
    
      const tax = subtotal * 0.18;
    
      const totalPrice = subtotal + tax + shippingCharges;

      const data = {
        shippingInfo ,
        "orderItems":cartproducts,
        "paymentInfo":{"id":referenceNum,"status":"paid"},
        "itemsPrice":subtotal,
        "taxPrice":tax,
        "shippingPrice":shippingCharges,
        totalPrice
      }

        createOrder(dispatch,data);

  return (
    <div>
        <Navbar/>
        <div className='ordersuccessful'>
        <CheckCircleOutlineOutlinedIcon className='icons'/>
        <h1>Your Order Has Been Place Succesfully</h1>
        

      <Link to = "/myorders">
      <button>View All Orders</button>
      </Link>

       
        </div>
    </div>
  )
   
    
}

export default Paymentsuccessfull