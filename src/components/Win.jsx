import React from 'react'

const Win = ({w}) => {
  return (
    <div  className='flex border-2 p-2 m-2 group hover:bg-[#464646]   text-center '>
       <div className='text-[#464646] group-hover:text-[#ffffff] m-2 '>{w.username}<i className="fa fa-mug-hot group-hover:text-[#ffffff] text-[#464646] m-2"></i></div>
      <div className='text-[#464646] group-hover:text-[#ffffff] m-2 '> | </div>
      <div className='text-[#464646] group-hover:text-[#ffffff] m-2 '>{w.choosenProductPrice}<i className="fa fa-users group-hover:text-[#ffffff] text-[#464646] m-2"></i></div>
      <div className='text-[#464646] group-hover:text-[#ffffff] m-2 '> | </div>
      <div className='text-[#464646] group-hover:text-[#ffffff] m-2 '>{w.choosenProductName}<i className="fa fa-user-tie group-hover:text-[#ffffff] text-[#464646] m-2"></i></div>
      <div className='text-[#464646] group-hover:text-[#ffffff] m-2 '> | </div>
      <div className='text-[#464646] group-hover:text-[#ffffff] m-2 '>{w.updatedAt} <i className="fa fa-sack-dollar group-hover:text-[#ffffff] text-[#464646] m-2"></i></div>
    </div>
  )
}

export default Win
