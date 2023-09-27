import { createSlice } from "@reduxjs/toolkit";



const userSlice = createSlice(
    {

        name:"user",
        initialState:{

            user:{},
            isAuthentcated:false,
            token:"",
            isFetching:false,
            error:false

        },
        reducers:{

            loginuserStart:(state) => {
                state.isFetching = true;
            },
            loginuserSuccess(state,action)
            {
                state.isFetching = false;
                state.user = action.payload.user;
                state.isAuthentcated = true;

            },
            loginuserFailure(state)
            {
                state.isFetching = false;
                state.error = true
            },

            registeruserStart:(state) => {
                state.isFetching = true;
            },
            registeruserSuccess(state,action)
            {
                state.isFetching = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isAuthentcated = true;

            },
            registeruserFailure(state)
            {
                state.isFetching = false;
                state.error = true
            },

            loaduserStart:(state) => {
                state.isFetching = true;
            },
            loaduserSuccess(state,action)
            {
                state.isFetching = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isAuthentcated = true;

            },
            loaduserFailure(state)
            {
                state.isFetching = false;
                state.error = true
            },

            logoutStart:(state) => {
                state.isFetching = true;
            },
            logoutSuccess(state,action)
            {
                state.isFetching = false;
                state.user = null;
                state.token = null;
                state.isAuthentcated = false;

            },
            logoutFailure(state)
            {
                state.isFetching = false;
                state.error = true
            },

            updateuserStart:(state) => {
                state.isFetching = true;
            },
            updateuserSuccess(state,action)
            {
                state.isFetching = false;
                state.user = action.payload.user;
                state.isAuthentcated = true;

            },
            updateuserFailure(state)
            {
                state.isFetching = false;
                state.error = true
            },
        }
    }
)

export const {loginuserStart,loginuserSuccess,loginuserFailure,registeruserStart,registeruserSuccess,registeruserFailure,loaduserStart,loaduserSuccess,loaduserFailure,logoutStart,logoutSuccess,logoutFailure,updateuserStart,updateuserSuccess,updateuserFailure} = userSlice.actions;
export default userSlice.reducer