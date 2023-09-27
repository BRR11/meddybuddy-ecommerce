import { createSlice } from "@reduxjs/toolkit";


const orderSlice = createSlice(
    {

        name:"createorder",
        initialState:{
           
            order:{},
            isFetching:false,
            error:false,
        },
        reducers:{
            //get All Products
            createorderStart: (state)=>{
                state.isFetching = true;
            },
            createorderSuccess:(state,action)=>{
                state.isFetching = false;
                state.order = action.payload;
            },
            createorderFailure: (state) => {
                state.isFetching = false;
                state.error = true;
            },
           
        },

        
    }


)

export const {createorderStart,createorderSuccess,createorderFailure} = orderSlice.actions
export default orderSlice.reducer;

