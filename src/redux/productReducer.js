import { createSlice } from "@reduxjs/toolkit";


const productSlice = createSlice(
    {

        name:"allProducts",
        initialState:{
           
            products:[],
            productscount:0,
            productsperpage:0,
            isFetching:false,
            error:false,
        },
        reducers:{
            //get All Products
            getallproductsStart: (state)=>{
                state.isFetching = true;
            },
            getallproductsSuccess:(state,action)=>{
                state.isFetching = false;
                state.products = action.payload.products;
                state.productscount = action.payload.productCount;
                state.productsperpage = action.payload.resultPerPage;
            },
            getallproductsFailure: (state) => {
                state.isFetching = false;
                state.error = true;
            },
           
        },

        
    }

)



export const {getallproductsStart,getallproductsSuccess,getallproductsFailure} = productSlice.actions
export default productSlice.reducer