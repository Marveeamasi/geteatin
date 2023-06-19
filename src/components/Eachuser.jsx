import axios from 'axios'
import React from 'react'

const Eachuser = ({user}) => {
  const deleteUser = async() => {
    const ress = await axios.delete('/users/'+user._id, {data:{userId:user._id}})
 
    window.location.reload()
  }

  return (
    <div className='flex border-2 p-2 m-2 group hover:bg-[#464646]   text-center '>
      <div className='text-[#464646] group-hover:text-[#ffffff] m-2 '>{user.username}<i className="fa fa-user group-hover:text-[#ffffff] text-[#464646] m-2"></i></div>
      <div className='text-[#464646] group-hover:text-[#ffffff] m-2 '> | </div>
      <div className='text-[#464646] group-hover:text-[#ffffff] m-2 '>{user.phone} <i className="fa fa-phone group-hover:text-[#ffffff] text-[#464646] m-2"></i></div>
      <div className='text-[#464646] group-hover:text-[#ffffff] m-2 '> | </div>
      <div className='text-[#464646] group-hover:text-[#ffffff] m-2 '>{user.email}<i className="fa fa-envelope group-hover:text-[#ffffff] text-[#464646] m-2"></i></div>
      <div className='text-[#464646] group-hover:text-[#ffffff] m-2 '> | </div>
      <div className='text-[#464646] group-hover:text-[#ffffff] m-2 '>{user.location} <i className="fa fa-globe group-hover:text-[#ffffff] text-[#464646] m-2"></i></div>
     {user.verifiedUser && <div><i className="fa-solid fa-badge-check"></i></div>}
      <button onClick={deleteUser} 
      className="flex  items-center justify-center  relative group border-2 border-[#464646] group-hover:text-[#ffffff]  m-2 p-2 text-center rounded-lg bg-[#fff]"><div className="group-hover:opacity-[0] text-[#4b4b4b] group-hover:text-[#ffffff]">Delete Account</div> <i className="fa-solid fa-trash absolute opacity-[0] group-hover:opacity-[1] hover:animate-bounce group-hover:text-[#464646]"></i></button>
     
    </div>
  )
}

export default Eachuser
