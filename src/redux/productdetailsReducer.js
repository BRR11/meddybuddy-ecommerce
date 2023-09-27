import { createSlice } from "@reduxjs/toolkit";


const productdetailsSlice = createSlice(
    {

        name:"productdetails",
        initialState:{
           
            product:{},
            isFetching:false,
            error:false,
        },
        reducers:{
            //get All Products
            getproductdetailsStart: (state)=>{
                state.isFetching = true;
            },
            getproductdetailsSuccess:(state,action)=>{
                state.isFetching = false;
                state.product = action.payload.product;
            },
            getproductdetailsFailure: (state) => {
                state.isFetching = false;
                state.error = true;
            },
            createreviewStart: (state)=>{
                state.isFetching = true;
            },
            createreviewSuccess:(state,action)=>{
                state.isFetching = false;
               
            },
            createreviewFailure: (state) => {
                state.isFetching = false;
                state.error = true;
            },
           
        },

        

        
    }

)



export const {getproductdetailsStart,getproductdetailsSuccess,getproductdetailsFailure,createreviewStart,createreviewSuccess,createreviewFailure} = productdetailsSlice.actions
export default productdetailsSlice.reducer