import React from 'react'
import "../orders/paymentsuccessfull.scss";
import Navbar from '../../component/Navbar/Navbar';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import { useSelector, useDispatch } from "react-redux";
import DeleteIcon from '@mui/icons-material/Delete';
import { addItemsToCart } from '../../redux/apicalls';
import { removeCartItem } from '../../redux/apicalls';
import { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import { createOrder } from '../../redux/apicalls';
import { useSearchParams } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Paymentsuccessfull() {

     const dispatch = useDispatch();
    const navigate = useNavigate();
   
   
   
    const { shippingInfo} = useSelector(state => state.cart);
  
   
    const {isAuthentcated,user} = useSelector(state => state.user);

    const [cartproducts, setCartProducts] = useState([]);

   // console.log(user._id);

const fetchData = async () => {
  try {
    const response = await axios.get(`https://meddybuddy-backend-clean.onrender.com/api/v1/cart/${user._id}`); 
   const data = response.data;

    // Update the cartproducts state with the data from the response
    setCartProducts(data);

  } catch (error) {
    console.log(error);
    // Optionally set some state here to show an error message to the user.
  }
}

// If you want to fetch data when the component mounts:
useEffect(() => {
  fetchData();
}, [user._id]); // re-fetch if the id changes
   
    
   

    // useEffect(() => {
    //   if (!isAuthentcated) {
    //     navigate('/login');
    //   }
      
    // }, []);
      
    
    //console.log(`the cartproducts are ${cartproducts}`);
        
    // const subtotal = cartproducts.reduce(
    //     (acc, item) => acc + item.quantity * item.price,
    //     0
    //   );
    
      const seachQuery = useSearchParams()[0]

      const referenceNum = seachQuery.get("reference");
      // const shippingCharges = subtotal > 1000 ? 0 : 200;
    
      // const tax = subtotal * 0.18;
    
      // const totalPrice = subtotal + tax + shippingCharges;
    
      // const data = {
      //   shippingInfo: shippingInfo,
      //   orderItems: cartproducts,
      //   paymentInfo: {
      //     id: referenceNum,
      //     status: "paid"
      //   },
      //   itemsPrice: subtotal,
      //   taxPrice: tax,
      //   shippingPrice: shippingCharges,
      //   totalPrice: totalPrice,
      //   user: user._id
      // };
      

      
   
     
     
    //   useEffect(() => {
    //     if (referenceNum) {
    //       console.log(data);
    //       createOrder(dispatch, data);
    //     }
    //  }, [referenceNum]);




    useEffect(() => {
      if (referenceNum) {
          const subtotal = cartproducts.reduce(
              (acc, item) => acc + item.quantity * item.price,
              0
          );
          
          const shippingCharges = subtotal > 1000 ? 0 : 200;
          const tax = subtotal * 0.18;
          const totalPrice = subtotal + tax + shippingCharges;
  
          const data = {
              shippingInfo: shippingInfo,
              orderItems: cartproducts,
              paymentInfo: {
                  id: referenceNum,
                  status: "paid"
              },
              itemsPrice: subtotal,
              taxPrice: tax,
              shippingPrice: shippingCharges,
              totalPrice: totalPrice,
              user: user._id
          };
  
          console.log("The Data Is", data);
          //createOrder(dispatch, data);
          //navigate('/');

          axios.post("https://meddybuddy-backend-clean.onrender.com/api/v1/order/new",data,{
            withCredentials:true
        }).then(response => {
                console.log('Order created successfully:', response.data);
                // navigate to another page after successful order creation
                //alert('Your order has been placed successfully!');
              //  navigate('/');
            })
            .catch(error => {
                console.log('Error creating order:', error);
                // Handle error as needed
            });
      }
  }, [referenceNum,cartproducts]);
  
     

  return (
    <div>
        <Navbar/>
        <div className='ordersuccessful'>
        <CheckCircleOutlineOutlinedIcon className='icons'/>
        <h1>Your Order Has Been Place Succesfully</h1>
        

     

       
        </div>
    </div>
  )
   
    
}

export default Paymentsuccessfull
