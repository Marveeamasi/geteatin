import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { Context } from "../context/Context"
import Safebuyscomponent from "../components/Safebuyscomponent"
import { useLocation } from "react-router-dom"
import Navbar from "../components/Navbar"
import Menubar from "../components/Menubar"
import BuysMenu from "../components/BuysMenu"
import Footer from "../components/Footer"

const Safebuys = () => {

  const {user} = useContext(Context)
    const[safebuys, setSafebuys] = useState([])
    const[product, setProduct] = useState({})
    const location = useLocation()
  const id = location.pathname.split('/')[2];

useEffect(()=>{
   const getSafebuys = async()=>{
    const res = await axios.get(`/safebuys/?buyer=${id}`)
    setSafebuys(res.data)
   }
   getSafebuys()
},[user.username])






  return (
    <>
    <Navbar/>
    <Menubar/>
    {user && <BuysMenu/>}
   {safebuys.map(s=> 
   <Safebuyscomponent key={s._id} user={user} s={s}/>
    )} 
    <Footer/>
    </>
  )
}

export default Safebuys
