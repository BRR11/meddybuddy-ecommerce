import { getallproductsStart,getallproductsSuccess,getallproductsFailure } from "./productReducer";
import {getproductdetailsStart,getproductdetailsSuccess,getproductdetailsFailure,createreviewStart,createreviewSuccess,createreviewFailure} from "./productdetailsReducer";
import { loginuserStart,loginuserSuccess,loginuserFailure,registeruserStart,registeruserSuccess,registeruserFailure,loaduserStart,loaduserSuccess,loaduserFailure,logoutStart,logoutSuccess,logoutFailure,updateuserStart,updateuserSuccess,updateuserFailure} from "./userReducer";
import {loadingCart,loadCartSuccess,loadCartFailure,add_item,remove_item,save_shipping_info} from "./cartReducer"
import { createorderStart,createorderSuccess,createorderFailure } from "./orderReducer";
import { gteordersStart,getordersSuccess,getordersFailure} from "./myordersReducer";
import { UseSelector } from "react-redux/es/hooks/useSelector";

import axios from "axios"

export const getAllProducts = async (dispatch,keyword = "",currentPage = 1,price = [0,10000],category) => {
    
    dispatch(getallproductsStart());
   
   
    try{
        let link = `http://localhost:4000/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}`
      
        if(category)
        {
            link = `http://localhost:4000/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}`
           
        }
        const res = await axios.get(link,{
            withCredentials:true
        });
        dispatch(getallproductsSuccess(res.data))
    } catch(err){
        dispatch(getallproductsFailure());
    }
};

export const getProductDetails  = async (dispatch,id) => {
    dispatch(getproductdetailsStart());

    try{
        const res = await axios.get(`http://localhost:4000/api/v1/product/${id}`,{
            withCredentials:true
        });
        dispatch(getproductdetailsSuccess(res.data))
    } catch(err){
        dispatch(getproductdetailsFailure());
    }

};


export const loginUser = async(dispatch,email,password) => {
    
    dispatch(loginuserStart());

    try{
        const config = { headers: { "Content-Type": "application/json" } };

        const res = await axios.post(`http://localhost:4000/api/v1/login`,{email,password},{
            withCredentials: true
        });
       
        dispatch(loginuserSuccess(res.data));
    }catch(err){
        dispatch(loginuserFailure());
    }
}


export const registerUser = async(dispatch,name,email,password) => {
    
    dispatch(registeruserStart());

    try{
        const config = { headers: { "Content-Type": "application/json" } };

        const res = await axios.post(`http://localhost:4000/api/v1/register`,{name,email,password},{
            withCredentials: true
        });
      
        dispatch(registeruserSuccess(res.data));
    }catch(err){
        dispatch(registeruserFailure());
    }
}



export const loadUser = async(dispatch) => {
    
    dispatch(loaduserStart());

    try{
        

        const res = await axios.get(`http://localhost:4000/api/v1/me`,{
            withCredentials: true
        });
        dispatch(loaduserSuccess(res.data));
    }catch(err){
        dispatch(loaduserFailure());
    }
}


export const logoutUser = async(dispatch) => {
    
    dispatch(logoutStart());

    try{
        

            await axios.get(`http://localhost:4000/api/v1/logout`,{
            withCredentials: true
        });
        dispatch(logoutSuccess());
    }catch(err){
        dispatch(logoutFailure());
    }
}



export const updateProfile = async(dispatch,name,email) => {
    
    dispatch(updateuserStart());

    try{
      

        const res = await axios.put(`http://localhost:4000/api/v1/user/update`,{name,email},{
            withCredentials: true
        });
        dispatch(updateuserSuccess(res.data));
    }catch(err){
        dispatch(updateuserFailure());
    }
}


export const fetchCartFromDB = async(dispatch,userId) => {
    dispatch(loadingCart());
    
    try {
        const response = await axios.get(`http://localhost:4000/api/v1/cart/${userId}`); 
        const data = response.data;
        console.log(data);
        dispatch(loadCartSuccess(data));
    } catch (error) {
        dispatch(loadCartFailure(error));
    }
};

export const addItemsToCart = async (dispatch,userId,id,quantity) => {

    
    try{
        const res = await axios.get(`http://localhost:4000/api/v1/product/${id}`,{
            withCredentials:true
        });
      
        
        const data = {
        productId:res.data.product._id,
        name:res.data.product.name,
        price:res.data.product.price,
        image:res.data.product.images[0],
        stock:res.data.product.stock,
        quantity


    }
    const productId = id;
    const res1 = await axios.put(`http://localhost:4000/api/v1/cart/${userId}/product/${productId}`,data,{
        withCredentials:true
    });

    dispatch(add_item(res1.data));
   
   
    }catch (err) {
        console.error("Error adding item to cart:", err.message || err);
        // You might want to dispatch some error action here, for example:
        // dispatch(addItemToCartError(err.message || err));
    }
    
}

export const removeCartItem = async (dispatch,userId,id) => {

    try {



        
    } catch (error) {
        
    }
    dispatch(remove_item(id));
    
  
}

export const save_Shipping_Info = async (dispatch,data) => {
   
    dispatch(save_shipping_info(data));
    localStorage.setItem("shippingInfo", JSON.stringify(data));
}


export const createOrder = async (dispatch,data) => {
    dispatch(createorderStart);
    try {
    
        const res = await axios.post("http://localhost:4000/api/v1/order/new",data,{
            withCredentials:true
        });
        
        dispatch(createorderSuccess(res.data))
    } catch (error) {
        console.log(error);
        dispatch(createorderFailure);
    }
}



export const myOrders = async (dispatch) => {
    dispatch(gteordersStart);
   
    try {
        const res = await axios.get("http://localhost:4000/api/v1/orders/me",{
            withCredentials:true
        });
        
        dispatch(getordersSuccess(res.data))
        
    } catch (error) {
        
        dispatch(getordersFailure());
    }
}


export const newReview = async (dispatch,reviewData) => {

    dispatch(createreviewStart());
   
    try {
        console.log(reviewData);
        
        const res = await axios.put("http://localhost:4000/api/v1/review",reviewData,{
            withCredentials:true
        })
        
        dispatch(createreviewSuccess(res.data))
        
    } catch (error) {
        
        dispatch(createreviewFailure());
    }
}
