import axios from 'axios';
import React, { useContext } from 'react'
import { Context } from '../context/Context'
import  { useState } from 'react'

const GamePrt = ({p}) => {
 const [clickedImg, setClickedImg] = useState(false);
const {user, dispatch} = useContext(Context)
 const showScreenshot = ()=>{
  setClickedImg(!clickedImg)
 }

const verify = async()=>{
  try{
 const ress = await axios.put(`/users/${p._id}`,{
  userId:user._id,  
  validForGame:true,
  })
  dispatch({type: "UPDATE_SUCCESS", payload: ress.data })
}catch(err){
  dispatch({type: "UPDATE_FAILURE" })
}}

  return (
    <div className='flex border-2 p-2 m-2 group hover:bg-[#464646]   text-center '>
      <img src={p.screenshot} alt="screenshot" className={clickedImg? 'w-[300px] h-[300px]  object-contain' : 'w-10 h-10 rounded-md object-cover' } onClick={showScreenshot} />
      <div className='text-[#464646] group-hover:text-[#ffffff] m-2 '>{p.username}<i className="fa fa-mug-hot group-hover:text-[#ffffff] text-[#464646] m-2"></i></div>
      <div className='text-[#464646] group-hover:text-[#ffffff] m-2 '> | </div>
      <div className='text-[#464646] group-hover:text-[#ffffff] m-2 '>{p.choosenProductPrice }<i className="fa fa-users group-hover:text-[#ffffff] text-[#464646] m-2"></i></div>
      <div className='text-[#464646] group-hover:text-[#ffffff] m-2 '> | </div>
      <div className='text-[#464646] group-hover:text-[#ffffff] m-2 '>{p.updatedAt} <i className="fa fa-sack-dollar group-hover:text-[#ffffff] text-[#464646] m-2"></i></div>
      <button onClick={verify} 
      className="flex  items-center justify-center  relative group border-2 border-[#464646] group-hover:text-[#ffffff]  m-2 p-2 text-center rounded-lg bg-[#fff]"><div className="group-hover:opacity-[0] text-[#4b4b4b] group-hover:text-[#ffffff]">Verify buy</div> <i className="fa fa-check absolute opacity-[0] group-hover:opacity-[1] hover:animate-bounce group-hover:text-[#464646]"></i></button>
     
    </div>
  )
}

export default GamePrt
