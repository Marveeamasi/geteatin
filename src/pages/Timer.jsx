import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Menubar from '../components/Menubar'
import Navbar from '../components/Navbar'
import Gameinfo from '../components/Gameinfo'

const Timer = () => {
    const[info, setInfo] = useState('');
    const[infoA, setInfoA] = useState([]);

const handlePost = async()=>{
    const res = await axios.post('/gamechats/timer', {
        info,
    })
res.data && window.location.reload();
}

useEffect(()=>{
 const getInfo = async()=>{
    const res = await axios.get('/gamechats/timer');
    setInfoA(res.data)
    console.log(res.data)
 }
 getInfo()
},[])

  return (
    <>
    <Navbar/>
    <Menubar />
    <div className='w-full flex justify-center items-center flex-col'>
      <input onChange={(e)=>setInfo(e.target.value)}  className='w-[60%] h-[50px] m-2 p-5 rounded-sm border-2 flex justify-center items-center text-[#ff00007b]  border-[#3b3b3b95]' placeholder='Set your game timer info..' type="text" />
      <button onClick={handlePost} className='w-[60%] h-[50px] p-5  bg-[gray] rounded-sm flex justify-center items-center m-2 hover:bg-[#ff00007b]  text-[#fff]'>Post Timer</button>
    </div>
    <div className='flex justify-center items-center flex-col'>
    {infoA.map(inf=> 
  
   <Gameinfo inf={inf}/>

    )}
    </div>
    <Footer/>
    </>
  )
}

export default Timer
