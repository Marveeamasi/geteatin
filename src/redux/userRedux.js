import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: null,
        isFetching: false,
        error:false
    },
    reducers: {
      loginStart:(state)=>{
        state.isFetching=true;
        state.currentUser=null;
        state.error=false;
      },
      loginSuccess:(state,action)=>{
        state.isFetching=false;
        state.currentUser=action.payload;
        state.error=false;
      },
      loginFailure:(state)=>{
        state.isFetching=false;
        state.error=true;
        state.currentUser=null
      },
      logoutUser:(state)=>{
        state.currentUser=null;
        state.error=false;
        state.isFetching=false;
      },
}});

export const {
   loginStart ,
  loginSuccess,
   loginFailure,
    logoutUser,
     } = userSlice.actions;
export default userSlice.reducer;