import React, { useState } from 'react'
import Adminsidebar from './Adminsidebar';


const Adminbar = () => {

    const [isOn, setIsOn] = useState(false);
    const toggle = () => {
        setIsOn(!isOn)
    }

  return (
    <>
    <div className='fixed glassmd w-10 h-10 left-2  z-[70] p-5 m-2 flex justify-center items-center  '>
    {isOn? (<i onClick={toggle} class="fa-solid fa-xmark text-2xl text-[#ff0000] hover:text-[#ffae00]"></i>) 
    : (<i onClick={toggle} class="fa-solid fa-key text-2xl text-[#ff0000] hover:text-[#ffae00]"></i>)} 
     
    </div>
    
    <Adminsidebar isOn={isOn}/>
    </>
  )
}

export default Adminbar