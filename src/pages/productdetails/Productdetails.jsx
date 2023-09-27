import React, { useState,useEffect } from 'react';
import "../productdetails/productdetails.scss";
import Navbar from "../../component/Navbar/Navbar";
import Footer from '../../component/Footer/Footer';
import StarRateIcon from '@mui/icons-material/StarRate';
import LinearProgress from '@mui/material/LinearProgress';
import ReactImageMagnify from 'react-image-magnify';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useDispatch } from 'react-redux';
import { getProductDetails } from '../../redux/apicalls';
import Reviewcard from '../../component/reviewcard/Reviewcard';
import { addItemsToCart } from '../../redux/apicalls';
import { newReview } from '../../redux/apicalls';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
  } from "@material-ui/core";

  import { Rating } from "@material-ui/lab";
  import { useNavigate } from 'react-router-dom';


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
     const  [img,setImg] = useState(1);

     useEffect(() => {
       if (!isFetching && product) {
         if (product.images && product.images.length > 0) {
           // Use the first image from the 'product' data as the initial image
           setImages(product.images);
           setImg(product.images[0]);
         }
       }
     }, [isFetching, product]);

     const cartproducts = useSelector(state => state.cart.cartproducts);
     
   
    
    const hoverHandler = (image,i)=>{
        setImg(image);
    }
    const hoverHandler1 = (image,i) => {
        setImg(image);
    }

  
    const [qty,setQty] = useState(1);
    const handleChange = (e) => {
        setQty(Number(e.target.value));
        
    }
    const submitHandler = ()=>{
        addItemsToCart(dispatch,productId,qty);
        localStorage.setItem("cartproducts",JSON.stringify(cartproducts))
       
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
    
     
   /* useEffect(() => {
        if(cartproducts.length != 0)
     
    
      
    }, [dispatch,cartproducts])*/
    
   
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
                            <div className='img_wrap' key = {i} onMouseEnter={() => setImg(image)}>
                                <img src = {image} alt = ""/>
                            </div>
                        ))
                    }
                </div>


                <div className='top-left-2'>
                <ReactImageMagnify 
                        {...{
                            smallImage: {
                                alt: 'Wristwatch by Ted Baker London',
                                isFluidWidth: true,
                                src: img,
                                
                            },
                            largeImage: {
                                src: img,
                                width: 1200,
                                height: 1800,
                            },
                            enlargedImageContainerDimensions: {
                                width: '150%',
                                height: '150%',
                            },
                        }}
                    />
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
                                 
                                 <option value = "1">1</option>
                                 <option value = "2">2</option>
                                 <option value = "3">3</option>
                                 <option value = "4">4</option>
                                 <option value = "5">5</option>

                                
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