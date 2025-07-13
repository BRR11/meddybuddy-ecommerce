import React from 'react'
import "../orders/vieworder.scss"
import { useSelector, useDispatch } from "react-redux";
import DeleteIcon from '@mui/icons-material/Delete';
import { addItemsToCart } from '../../redux/apicalls';
import { removeCartItem } from '../../redux/apicalls';
import { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../component/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useLocation} from 'react-router-dom';




function Vieworder() {

//const { shippingInfo,cartproducts} = useSelector((state) => state.cart);
const {isAuthentcated,user} = useSelector(state => state.user);
const dispatch = useDispatch();
const navigate = useNavigate();
const location = useLocation();

const id = location.pathname.split("/")[2];


// Setting initial state for cartproducts
const [cartproducts, setCartProducts] = useState([]);

const fetchData = async () => {
  try {
    const res = await axios.get(`https://meddybuddy-backend-clean.onrender.com/api/v1/order/${id}`, {
      withCredentials: true
    });
    console.log(res);

    // Update the cartproducts state with the data from the response
    setCartProducts(res.data.order.orderItems);

  } catch (error) {
    console.log(error);
    // Optionally set some state here to show an error message to the user.
  }
}

// If you want to fetch data when the component mounts:
useEffect(() => {
  fetchData();
}, [id]); // re-fetch if the id changes


useEffect(() => {
if (!isAuthentcated) {
  navigate('/login');
}
}, [isAuthentcated, navigate]);

console.log(cartproducts);
  return (
    <>
    <div className='nav'>
      <Navbar/>
    </div>
        
         <div className='orderitems1'>
         <h1>Your Order Items</h1>
        <div className = "cartitemspage1">

     
        {cartproducts && cartproducts.map((product) => (
        <div className='cartitems1' key = {product.product}>
        <div className='itemdetails1'>

        <Link to ={`/product/${product.product}`} style={{textDecoration: 'none'}}>
        <div className='img_name1'>
        <img src = {product.image} alt = ""/>
        <h2>{product.name.substring(0, 20)}</h2>

        </div>
        </Link>



    </div>

    <div className='itemprice1'>

    <span>{(product.quantity)}*₹{(product.price)} =</span>  ₹{(product.price)*(product.quantity)}

    </div>
    </div>

    ) )}
    </div>
    </div> 
    </>

        
    
  )
}

export default Vieworder
