import React from 'react'
import "../cart/cart.scss"
import Navbar from '../../component/Navbar/Navbar'
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useDispatch } from 'react-redux';
import { addItemsToCart } from '../../redux/apicalls';
import { removeCartItem } from '../../redux/apicalls';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
function Cart() {


    const cartproducts = useSelector(state => state.cart.cartproducts);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {isAuthentcated,user} = useSelector(state => state.user);
  
  

    useEffect(() => {
      if (!isAuthentcated) {
        navigate('/login');
      }
    }, [isAuthentcated, navigate]);
  
    const increaseQuantity = (id, quantity, stock) => {
        const newQty = quantity + 1;
        if (stock <= quantity) {
          return;
        }

       addItemsToCart(dispatch,user._id,id,newQty);
     
       

      };
    
      const decreaseQuantity = (id, quantity) => {
        const newQty = quantity - 1;
        if (1 >= quantity) {
          return;
        }
        addItemsToCart(dispatch,user._id,id,newQty);
       
      };


      const deleteItem = (id)=>{
        
       addItemsToCart(dispatch,user._id,id,0);
       
      }

      
      
  return (
    <div className='cartpage'>
        <Navbar/>
        <div>
          
        </div>
        <h1 className='carttitle'> <span>You have {cartproducts.length} items in your cart</span> </h1>
        <div className='cartpageheader'>
            <h1 className='product-h'>Product</h1>
            <h1 className='quantity-h'>Quantity</h1>
            <h1 className='price-h'>Subtotal</h1>            

    </div>
    <div className = "cartitemspage">

        {cartproducts && cartproducts.map((product) => (
             <div className='cartitems' key = {product.productId}>
             <div className='itemdetails'>
                <div>
                    <DeleteIcon className = "icons"onClick = {()=>deleteItem(product.productId)}/>
                </div>
                <Link to ={`/product/${product.productId}`} style={{textDecoration: 'none'}}>
                <div className='img_name'>
                <img src = {product.image} alt = ""/>
                 <h2>{product.name}</h2>

                </div>
               </Link>
           
                
           
            </div>
            <div className='itemquantity'>
                <button
                onClick={() =>
                    decreaseQuantity(
                      product.productId,
                      product.quantity,
                      product.stock)}>-</button>
                <input type = "number" value = {product.quantity} readOnly/> 
                <button className = "buttongreen" onClick={() =>
                        increaseQuantity(
                          product.productId,
                          product.quantity,
                          product.stock)}>+</button>

            </div>
            <div className='itemprice'>

                ₹{(product.price)*(product.quantity)}
                    
            </div>
     </div>

        ) )}
    </div>
   
     <div className='totalbill'>
        <div className='totalamount'>
        <h2>Total Amount : </h2>
        <span>
        {`₹${cartproducts.reduce(
                  (acc, item) => acc + item.quantity * item.price,
                  0
                )}`}
        </span>
        </div>

        
        <Link to = "/shippingaddress" style={{ textDecoration: 'none' }}>
        <button>Proceed To Checkout</button>
        </Link>
       
     </div>
  </div>
  )
}

export default Cart