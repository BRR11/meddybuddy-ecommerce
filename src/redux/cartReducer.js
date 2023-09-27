import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name:"cart",
    initialState:{
        cartproducts: [],
        shippingInfo:localStorage.getItem("shippingInfo")? JSON.parse(localStorage.getItem("shippingInfo")) : {},
        

    },
    reducers:{

        loadingCart: state => {
            state.loading = true;
        },
        loadCartSuccess: (state, action) => {
            state.loading = false;
            state.cartproducts = action.payload;
        },
        loadCartFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        add_item: (state,action) => {

            
           state.cartproducts = action.payload;
        },

        
        remove_item:(state,action)=>{
                return {
                   ...state,
                   cartproducts: state.cartproducts.filter((i) => i.product !== action.payload)
                }
        },
        save_shipping_info:(state,action)=>{
            state.shippingInfo = action.payload;
        }

    }

})

export const {loadingCart,loadCartSuccess,loadCartFailure,add_item,remove_item,save_shipping_info} = cartSlice.actions;
export default cartSlice.reducer