import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Safebuyscomponent = ({user, s }) => {
const[product, setProduct] = useState({})

    const comfirm = async()=>{
        const ress = await axios.put(`/safebuys/${s._id}/buy`,{
          userId:user._id,
          buycomfirmed:true,
        })
        console.log(ress.data)
        
        
      }
    
      useEffect(()=>{
        const getProduct = async()=>{
         const res = await axios.get(`/items/${s.productId}`)
         setProduct(res.data)
        }
        getProduct()
     },[s.productId])


  return (
    <div key={s._id} className='flex flex-col border-2 p-2 justify-center items-center w-[100vw]'>
    <div className='border-2 p-2 m-2 rounded-md'>Item <Link to={`/items/${product._id}`} className="text-[#ff26008b]">{product.name}</Link> | Buyer <Link to={`/account/${s.buyerId}`} className="text-[#ff26008b]">{s.usernameOfBuyer}</Link> | Seller <Link to={`/account/${s.sellerId}`} className="text-[#ff26008b]">{s.usernameOfSeller}</Link> | Quantity <b className="text-[#ff26008b]">{s.quantity}</b> for Price <b className="text-[#ff26008b]">{s.price}</b></div>
    <div className="flex justify-around  items-center">
        <button className="px-10 py-5 bg-[#ff4800] m-2 font-bold  text-white" onClick={comfirm}>Confirm  <sup className="border-2 border-white p-2 m-2">{new Date(s.updatedAt).toDateString()}</sup></button>
    </div>
    </div>
  )
}

export default Safebuyscomponent
