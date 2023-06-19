import axios from 'axios'
import React, { useContext } from 'react'
import { Context } from '../context/Context'

const Gameinfo = ({inf}) => {
    const {user} = useContext(Context)

const handleDelete = async ()=>{ 
 await axios.delete('/gamechats/timer/'+inf._id ,{data:{userId:user._id}})
  window.location.reload();
}

  return ( 
  
  <div onClick={handleDelete} className='hover:bg-[#ff0000] hover:text-[#fff] w-[500px] sm:w-[200px] h-[50px]  p-5 border-2 border-[#ff0000] rounded-sm flex justify-center items-center m-5   text-[#ff2600]'>{inf.info}</div>
  )
}

export default Gameinfo
