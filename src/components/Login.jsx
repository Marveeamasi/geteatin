import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../context/Context';
import Confirm from './Confirm';


const Login = ({isOPen}) => {
  const [username, setUsername]=useState('');
  const [password, setPassword]=useState('');
 const {user, dispatch, isFetching, error} = useContext(Context);
 const[isFilled, setIsFilled] = useState(false);
 const[showConfirm, setShowConfirm]=useState(false);
  
 useEffect(()=>{
  if(password && username){
   setIsFilled(true)
  }
  else if(!username || !password ){
   setIsFilled(false)
  }else{
   setIsFilled(false)
  }
 },[username,password])
 

  const handleLogin = async ()=>{
    dispatch({type: 'LOGIN_START'});
    try{
        const res = await axios.post('/auth/login',{username,password})
          dispatch({type: 'LOGIN_SUCCESS',payload: res.data})
          console.log(user)

    }catch(err){
       dispatch({type: 'LOGIN_FAILURE'})
    }
}

const handleLogout = ()=>{
setShowConfirm(!showConfirm)
}

  const confirmHandleLogout=()=>{
    dispatch({type: 'LOGOUT'});   
    setShowConfirm(!showConfirm)  
   }; 

const confirmMessage = "Are you sure to log out from this account ?";
 
  return ( 
<>
{showConfirm && <Confirm handling={confirmHandleLogout} toggle={handleLogout} message={confirmMessage}/>}
    <div className={isOPen ? 'w-[300px] border sm:w-[250px] flex flex-col justify-center glassin z-20 items-center fixed right-0 sm:right-5':'hidden'}>
     {user && <div className='text-center robot shadow-md  text-lg font-bold p-5 rounded-md text-[#ff3300a9]'>Welcome, {user.username} !</div>}
     {error && <div className='w-[100%] text-center border border-[#ff000075] animate-pulse rounded-md p-2 flex justify-center items-center m-4  text-[#ff0000]'>Error occured, type correctly and try again</div>}
      
      <input 
      className={user?'hidden' : 'w-[80%] border-b-2  p-[5%]  inp p-3 m-2 flex justify-center items-center'} 
      type="text"
       placeholder='Username..'
       onChange={(e)=> setUsername(e.target.value)} />
      <input
       className={user?'hidden' : 'w-[80%] border-b-2 p-[5%]  inp p-3 m-2 flex justify-center items-center'}
        type="password"
       placeholder='Password..'
       onChange={(e)=> setPassword(e.target.value)}  />
 <div className='flex flex-wrap justify-center items-center'>
  <div>
  { isFetching ?
 <button className='bg-gradient-to-r hover:opacity-[0.41] flex  w-[100px] sm:w-[70px] justify-center sm:m-2 m-5 items-center opacity-[.7] from-[#ad2301] to-[#ff2600] via-[#dd4905] roboto text-white text-[900] rounded-md text-lg round-md flex p-3' ><i className="fa fa-burger animate-spin"></i>...</button> :
   <button className='bg-gradient-to-r hover:opacity-[0.41] flex  w-[100px] sm:w-[70px] justify-center sm:-2 m-5 items-center opacity-[.7] from-[#ad0101] to-[#ff0000] via-[#dd0505] roboto text-white text-[900] rounded-md text-lg round-md flex p-3' onClick={user? handleLogout : handleLogin}>{user? `Logout` : `Login`}
   </button> }
</div>

      <Link to={`/register`} className='border-[#ff3c00] border-2 w-[100px] sm:w-[70px] hover:opacity-[0.41] sm:m-2 m-5 roboto text-[#ff3c00] text-[900] justify-center items-center cursor-pointer rounded-md text-lg round-md flex p-3'>New</Link></div>
      <div className='w-[100%] flex justify-center items-center m-4 hover:opacity-[0.41] hover:text-underline text-[#ff0000]'>Forgot password?</div> 
    </div>
    </>
  )
}

export default Login