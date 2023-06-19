import React from 'react'

const Confirm = ({handling, message, toggle}) => {
  return (
    <div className='w-[200px] fixed h-[200px] top-[50%] z-[80] left-[50%] mt-[-100px] ml-[-100px] glasss bg-[#ffffffe6] shadow-md rounded-md flex flex-col justify-center items-center text-center'>
      <div className='text-center robot text-lg text-[#ff3300] font-bold m-2'>{message}</div>
      <div className='flex w-[100%] justify-around items-center'>
        <button className='border-2 w-[80px] m-2 border-[#ff3300] text-center hover-opacity-[.7] text-[#ff3300] rounded-md p-2' onClick={toggle}>Cancel</button>
        <button className='bg-[#ff3300] m-2 hover:opacity-[.7] rounded-md text-center w-[80px] p-2 text-white' onClick={handling}>Yes</button>
      </div>
    </div>
  )
}

export default Confirm
