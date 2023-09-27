import { configureStore, combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import {composeWithDevTools}  from "redux-devtools-extension";
import productReducer from "./productReducer";
import productdetailsReducer from "./productdetailsReducer";
import userReducer from "./userReducer";
import cartReducer from "./cartReducer";
import createorderReducer from "./orderReducer"
import myordersReducer from "./myordersReducer";
const rootReducer = combineReducers(
    {
        products:productReducer,
        productdetails:productdetailsReducer,
        user:userReducer,
        cart:cartReducer,
        createorder:createorderReducer,
        myorders:myordersReducer
    }

);



const middleware = [thunk];

export const store = configureStore({

    reducer: rootReducer,
   

});