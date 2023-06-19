import { loginFailure, loginStart, loginSuccess, logoutUser } from "./userRedux"
import axios from 'axios'


export const login = async (dispatch,user)=>{
    dispatch(loginStart());
    try{
        const res = await axios.post('/auth/login',user)
          dispatch(loginSuccess(res.data))

    }catch(err){
       dispatch(loginFailure())
    }
}

export const logout = (dispatch) => {
    dispatch(logoutUser())
}



