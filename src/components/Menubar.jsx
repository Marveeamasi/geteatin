import React, { useState } from 'react'
import Sidebar from './Sidebar'

const Menubar = () => {

    const [isOn, setIsOn] = useState(false);
    const toggle = () => {
        setIsOn(!isOn)
    }

  return (
    <>
    <div className='fixed glassmd w-10 h-10 right-2 z-50 p-5 flex justify-center m-2 items-center desk:hidden '>
    {isOn? (<i onClick={toggle} class="fa-solid fa-xmark text-2xl text-[#ff0000] hover:text-[#ffae00]"></i>) 
    : (<i onClick={toggle} class="fa-solid fa-bars text-2xl text-[#ff0000] hover:text-[#ffae00]"></i>)} 
     
    </div>
    
    <Sidebar isOn={isOn}/>
    </>
  )
}

export default Menubar