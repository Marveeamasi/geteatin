import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../context/Context'
import PopUp from './PopUp'

const BuysMenu = () => {
  const {user} = useContext(Context)
const [buys, setBuys] = useState([])
const [sells, setSells] = useState([])

useEffect(()=>{
const getBuys = async()=>{
  const res = await axios.get(`/safebuys/?buyer=${user?._id}`)
  setBuys(res.data)
}
const getSells = async()=>{
  const res = await axios.get(`/safebuys/?seller=${user?._id}`)
  setSells(res.data)
}

getBuys()
getSells()

},[user])

    const [isOn, setIsOn] = useState(false);
    const toggle = () => {
        setIsOn(!isOn)
    }

  return (
    <>
    <div className='fixed border-2 border-[#ff4800] rounded-full w-[50px]  h-[50px] right-[20px] sm:right-[40px] bottom-[20px] animate-bounce hover:animate-none z-[70] p-5 flex justify-center items-center '>
    {isOn? (<i onClick={toggle} class="fa-solid fa-xmark text-2xl md:text-[25px] text-[#ff0000] hover:text-[#ff480088]"></i>) 
    : (<i onClick={toggle} class="fa-solid fa-bag-shopping text-[50px] md:text-[25px] text-[#ff0000] hover:text-[#ff4800ca]"></i>)} 
     
    </div>
    
    <PopUp isOn={isOn} b={buys} s={sells}/>
    </>
  )
}

export default BuysMenu