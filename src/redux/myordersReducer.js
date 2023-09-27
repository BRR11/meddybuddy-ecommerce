import { createSlice } from "@reduxjs/toolkit";


const myorderSlice = createSlice(
    {

        name:"myorders",
        initialState:{
           
            myorders:[],
            isFetching:false,
            error:false,
        },
        reducers:{
            //get All Products
            gteordersStart: (state)=>{
                state.isFetching = true;
            },
            getordersSuccess:(state,action)=>{
                state.isFetching = false;
                state.myorders = action.payload.orders;
            },
            getordersFailure: (state) => {
                state.isFetching = false;
                state.error = true;
            },
           
        },

        
    }


)

export const {gteordersStart,getordersSuccess,getordersFailure} = myorderSlice.actions
export default myorderSlice.reducer;

