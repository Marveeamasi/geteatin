import React, { useEffect, useState } from 'react'

const Eachpost = ({p}) => {
    const [clickedImg, setClickedImg] = useState(false);
    const[eligible, setEligible] = useState(false);
    const showImg = ()=>{
        setClickedImg(!clickedImg)
       }

useEffect(()=>{
if(p.likes.length - p.dislikes.length > 1000){
    setEligible(true)
}else{
    setEligible(false)
}
},[])

  return (
    <div className='flex border-2 p-2 m-2 group hover:bg-[#464646]   text-center '>
      <img src={p.img} alt="screenshot" className={clickedImg? 'w-[300px] h-[300px]  object-contain' : 'w-10 h-10 rounded-md object-cover' } onClick={showImg} />
      <div className='text-[#464646] group-hover:text-[#ffffff] m-2 '>{p.username}<i className="fa fa-user group-hover:text-[#ffffff] text-[#464646] m-2"></i></div>
      <div className='text-[#464646] group-hover:text-[#ffffff] m-2 '> | </div>
      <div className='text-[#464646] group-hover:text-[#ffffff] m-2 '>{p.name} <i className="fa fa-mug-hot group-hover:text-[#ffffff] text-[#464646] m-2"></i></div>
      <div className='text-[#464646] group-hover:text-[#ffffff] m-2 '> | </div>
      <div className='text-[#464646] group-hover:text-[#ffffff] m-2 '>{p.likes.length}<i className="fa fa-fire group-hover:text-[#ffffff] text-[#464646] m-2"></i></div>
      <div className='text-[#464646] group-hover:text-[#ffffff] m-2 '> | </div>
      <div className='text-[#464646] group-hover:text-[#ffffff] m-2 '>{p.dislikes.length} <i className="fa fa-fire-extinguisher group-hover:text-[#ffffff] text-[#464646] m-2"></i></div>
     {eligible && <div className='group'><i className="fa-solid fa-ballot-check "></i><sup className='group-hover:opacity-[1] opacity-[0]'>{p.account}</sup>
     
     </div>}
     

    </div>
  )
}

export default Eachpost
