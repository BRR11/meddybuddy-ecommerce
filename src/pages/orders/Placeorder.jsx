import React from 'react'
import "../orders/placeorder.scss"
import { useSelector, useDispatch } from "react-redux";
import DeleteIcon from '@mui/icons-material/Delete';
import { addItemsToCart } from '../../redux/apicalls';
import { removeCartItem } from '../../redux/apicalls';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../component/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Placeorder() {
    const { shippingInfo,cartproducts} = useSelector((state) => state.cart);
    const {isAuthentcated,user} = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

  

  useEffect(() => {
    if (!isAuthentcated) {
      navigate('/login');
    }
  }, [isAuthentcated, navigate]);
    

    const placeOrder = async () => {
        const data = {
            subtotal,
            shippingCharges,
            tax,
            totalPrice
        }
       // sessionStorage.setItem("orderInfo",JSON.stringify(data));
        
       
        
       
        
             const res = await axios.post("http://localhost:4000/api/v1/payment", {
                totalPrice
            },{
               
                
                withCredentials:true
            });
       

        const paymentorder = res.data.paymentorder;
        //console.log(paymentorder);
       
       const options = {
            "key" : "rzp_test_zMIzLEfR2oKln6",
            "amount": `${paymentorder.amount}`,
            "currency": "INR",
            "name": "Rishanth Reddy",
            "description": "Payment For Order",
            "image": "",
            "order_id": paymentorder.id,
            "callback_url": "http://localhost:4000/api/v1/paymentverification",
            "prefill": {
                "name": `${user.name}`,
                "email": `${user.email}`,
            },
            "notes": {
                "address": `${shippingInfo.address}`
            },
            "theme": {
                "color": "#121212"
            }
        };
        const razor = new window.Razorpay(options);
        razor.open();
        


    }
    
    const subtotal = cartproducts.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
      );
    
      const shippingCharges = subtotal > 1000 ? 200 : 0;
    
      const tax = Math.round(subtotal * 0.18);
    
      const totalPrice = subtotal + tax + shippingCharges;
  
    
  return (
    <div>

    <Navbar/>
    <div className='placeorderpage'>
       
       <div className='address_cart'>
        <h1>Shipping Info</h1>
           <div className='addressbox'>

               <div>
                   <h2>Deliver to: {user.name}</h2>
                 

               </div>
               <div>
               <span>{shippingInfo.address},{shippingInfo.pinCode},{shippingInfo.city},{shippingInfo.state},{shippingInfo.country}</span>
               </div>
           </div>
           <div className='orderitems'>

           <div className = "cartitemspage">
        <h1>Your Cart Items</h1>
{cartproducts && cartproducts.map((product) => (
    <div className='cartitems' key = {product.product}>
    <div className='itemdetails'>
       
       <Link to ={`/product/${product.product}`} style={{textDecoration: 'none'}}>
       <div className='img_name'>
       <img src = {product.image} alt = ""/>
        <h2>{product.name}</h2>

       </div>
      </Link>
  
       
  
   </div>
  
   <div className='itemprice'>

     <span>{(product.quantity)}*₹{(product.price)} =</span>  ₹{(product.price)*(product.quantity)}
           
   </div>
</div>

) )}
</div>
          

           </div>
       </div>
       <div className='total_amount'>
           <h1>PRICE DETAILS</h1>
           <div>
               <span>Total MRP :</span>
               <span>₹{subtotal}</span>
           </div>
           <div>
               <span>Taxes :</span>
               <span>₹{tax}</span>
           </div>
           <div>
               <span>Delivery Fee :</span>
               <span>₹{shippingCharges}</span>
           </div>

           <h2>Total Amount : ₹{totalPrice}</h2>
           <button onClick={placeOrder}>PLACE ORDER</button>
       </div>
   </div>

    </div>
    
  )
}

export default Placeorder