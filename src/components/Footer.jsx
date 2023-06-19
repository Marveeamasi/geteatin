import React from 'react'

const Footer = () => {
  return (<div className='w-[100vW] h-[70vh] p-[50px] h-[100%] bg-[#353535] flex flex-col justify-center items-center'>
    <div className=" w-[80%] p-[20px] m-[10px] border-2 rounded-sm flex justify-center flex-wrap items-center">
    <a className='text-white m-2' href="#">Investor</a>   
    
    <a className='text-white m-2' href="#">Terms & Conditions</a>
   
    <a className='text-white m-2' href="#">Refund</a>

    <a className='text-white m-2' href="#">Policy</a>
</div>
<div class="font-bold p-[10px] text-center text-white m-[10px]">
    Copyright © 2023 getEating
</div>
</div>
  )
}

export default Footer