import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../context/Context'

const ValidGmPrt = ({v}) => {
const [isVal, setIsVal]=useState(false)
const {user, dispatch} = useContext(Context)

const setToWin = async() => {
 try{ const res = await axios.put(`/users/${v._id}`, {
    userId:user._id,
    wonGame:true,
  });
  dispatch({type: "UPDATE_SUCCESS", payload: res.data })
  setIsVal(true)
}catch(err){
  dispatch({type: "UPDATE_FAILURE"})
}
}

useEffect(()=>{
if(v.wonGame===true){
  setIsVal(true)
}else{
setIsVal(false)
}
},[v.wonGame])

  return (
    <div onClick={setToWin} className={isVal? 'flex flex-col justify-center hover:opacity-[0.5] cursor-pointer items-center m-2 text-center text-white roboto w-[100px] h-[100px] rounded-md bg-[#ff2600f4]' : 'flex flex-col justify-center hover:opacity-[0.5] cursor-pointer items-center m-2 text-center text-white roboto w-[100px] h-[100px] rounded-md bg-[#494949]'}>
        <div>{v.choosenProductPrice}</div>
        <div>{v.username}</div>
      
    </div>
  )
}

export default ValidGmPrt
