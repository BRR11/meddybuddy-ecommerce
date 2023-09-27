import React from 'react'
import {Link} from "react-router-dom"
import "../productcard/productcard.scss"
import StarRateIcon from '@mui/icons-material/StarRate';
import { addItemsToCart } from '../../redux/apicalls';

import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
function Productcard({product}) {
  
    const images = product.images;
    const productId = product._id;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const qty = 1;
  
  const { isAuthentcated, user } = useSelector((state) => state.user);
  const cartproducts = useSelector(state => state.cart.cartproducts);


    
  const submitHandler = ()=>{
    addItemsToCart(dispatch,user._id,productId,qty);
   
   
}

    
  return (
    
       <div className='productcard'>
        <Link to = {`/product/${product._id}`} className='link' style = {{textDecoration:"none"}}>
        <div className="top">
          <img src = {images[0]}  alt = "" className='img1'/>
          <img src = {images[1]} alt = "" className='img2'/>
        </div>

        <div className="bottom">
            <h2>{ product.name.length > 20 ? product.name.substring(0, 20) + '...' : product.name}</h2>
           <div className='totalratings'>
            <div className='rating'>
                <span>{product.ratings}</span><StarRateIcon className='icons'/>
            </div>
            <p>{product.numOfReviews} ratings</p>
           </div>
           <div className='price'>
           <h3 className='oldprice'>
               MRP :
           </h3>
           <h3 className='newprice'>
           ₹{product.price}
           </h3>
           </div>
        </div>
        </Link>
         
          <div className='btn'>
           <button onClick={submitHandler}>Add To Cart</button>
          </div>
          
       </div>
   

  )
}

export default Productcard