import React, { useState, useEffect } from 'react';
import "../productdetails/productdetails.scss";
import Navbar from "../../component/Navbar/Navbar";
import Footer from '../../component/Footer/Footer';
import StarRateIcon from '@mui/icons-material/StarRate';
import LinearProgress from '@mui/material/LinearProgress';
import ReactImageMagnify from 'react-image-magnify';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useDispatch } from 'react-redux';
import { getProductDetails, addItemsToCart, newReview } from '../../redux/apicalls';
import Reviewcard from '../../component/reviewcard/Reviewcard';

import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    Rating,
} from "@mui/material";


function Productdetails({match}) {
    
    
    const location = useLocation();
    const productId = location.pathname.split("/")[2];
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const {isFetching,error,product} = useSelector((state) => state.productdetails)
  const { isAuthentcated, user } = useSelector((state) => state.user);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!isAuthentcated) {
      navigate('/login');
    }
  }, [isAuthentcated, navigate]);
    
    useEffect(() => {
      getProductDetails(dispatch,productId);
      
       
     }, [dispatch,productId,product])
    
     const [images, setImages] = useState([]);
     const  [img,setImg] = useState();

     useEffect(() => {
       if (!isFetching && product) {
         if (product.images && product.images.length > 0) {
           setImages(product.images);
           setImg(product.images[0]);
         }
       }
     }, [isFetching, product]);

     const cartproducts = useSelector(state => state.cart.cartproducts);
     
   
    
    
   

  
    const [qty,setQty] = useState(1);
    const handleChange = (e) => {
        setQty(Number(e.target.value));
        
    }
    const submitHandler = ()=>{
        addItemsToCart(dispatch,user._id,productId,qty);
      
       
    }

    const options = {
        size: "large",
        value: product.ratings,
        readOnly: true,
        precision: 0.5,
      };
    
     
      const [open, setOpen] = useState(false);
      const [rating, setRating] = useState(0);
      const [comment, setComment] = useState("");
      const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true);
      };
    
      const reviewSubmitHandler = () => {
       
      const myForm = {
        "rating" :rating,
        "comment":comment,
        "productId":productId
      }
        
        newReview(dispatch,myForm);
    
        setOpen(false);
      };
    
      const [timerId, setTimerId] = useState(null);

    
    const handleMouseEnter = (newImage) => {
      setImg(newImage);
  
      if (timerId) {
        clearTimeout(timerId);
      }
  
      const newTimerId = setTimeout(() => {
        setImg(product.images[0]); // Reset to the first image
      }, 1000);
  
      setTimerId(newTimerId);
    };
  
    useEffect(() => {
      return () => {
        if (timerId) {
          clearTimeout(timerId);
        }
      };
    }, [timerId]);
    
  return (
    
    <div>
        <Navbar className/>
       <div className='searchbarpdpage'>
       </div>
       
       
      
        <div className='top-div'>
        <div className = "top">
            <div className='top-left'>
                <div className='top-left-1'>

                    {
                        images.map((image,i) => (
                            <div className='img_wrap' key = {i} onMouseEnter={() => handleMouseEnter(image)}>
                                <img src = {image} alt = ""/>
                            </div>
                        ))
                    }
                </div>


                <div className='top-left-2'>
                    <img src = {img} className='image'/>
                </div>             
             
            </div>
            <div className='top-middle'>
              <h1>{product.name}</h1>
              <div className='tm-rating'>
              <div className='smallrating'>
                <span>{product.ratings}</span><StarRateIcon className='smallicon'/>
                </div>
               <p>{product.numOfReviews} reviews</p>
              </div>

            <div className='producthighlights'>
               <h2>Product Highlghts</h2>
                <p>
               
                   {product.product_highlights}
                </p>
             </div>
                

            </div>
            <div className='top-right'>
                <div className='pricediv'>
                    <div className='price'>
                       <span className='mrp'>MRP</span>  <span>₹{product.price}</span>
                    </div>

                    <div className='quantity'>
                        
                    <label for="quantity">quantity</label>

                            <select name="qunatity" id="quantity" onChange={handleChange}>
                                 
                            {Array.from({ length: product.stock }, (_, index) => (
        <option key={index + 1} value={index + 1}>{index + 1}</option>
      ))}

                                
                            </select>
                            <p>of {product.quantityof}</p>
                       
                    </div>
                    <div className='btn'>
                        <button onClick={submitHandler}>Add To Cart</button>
                    </div>
                </div>
            </div>
        </div>
        </div>
       
            <div className='productdescriptionpage'>
        
        
             <div className='middle'>
                <div className='keyinformation'>
                <h1>Key Information</h1>
                <p>
                    {product.key_information}
                </p>
                </div>
                <div className='keyinformation'>
                <h1>Key Ingredients</h1>
                <p>
                    {product.key_ingredients}
                </p>
                </div>
               
           
            </div>
            <div className='submitreview'>
            <button onClick={submitReviewToggle} >
                Submit Review
              </button>
              <p>Rate Our Products!!</p>
                
            </div>

            <div className='bottom'>
                <div className='userrating'>
                <h1>Ratings & Reviews</h1>
                 <div>
                 <span>{product.ratings}</span><StarRateIcon className='icons'/>
            
           
                 <p>{product.numOfReviews} Reviews</p>
           

                 </div>
                <div className='userreviews'>
                       <h1 className='userreviewstitle'>User Reviews</h1>
                       <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>

                       {
                        product.reviews && product.reviews[0]  ? (
                            <div className='review'>
                                {product.reviews && product.reviews.map((review) => <div className="specificuserreviews">
                                    <h1>{review.name}</h1>
                                    <div className='rating'>
                                         <span>{review.rating}</span><StarRateIcon className='icons'/>
                                    </div>
                                    <p>{review.comment}</p>
                                    </div>)}
                            </div>
                        ):(
                            <p>No Reviews Yet</p>
                        )
                       }     
                </div>
            </div> 
            </div>
        </div>
        
        <Footer/>
        

    </div>
  )
}

export default Productdetails