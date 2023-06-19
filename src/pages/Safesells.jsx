import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useLocation } from "react-router-dom";
import BuysMenu from "../components/BuysMenu";
import Footer from "../components/Footer";
import Menubar from "../components/Menubar";
import Navbar from "../components/Navbar";
import Safesellscomponent from "../components/Safesellscomponent"
import { Context } from '../context/Context';

const Safebuys = () => {

  const {user} = useContext(Context)
    const[safebuys, setSafebuys] = useState([])
  const location = useLocation()
  const id = location.pathname.split('/')[2];

useEffect(()=>{
   const getSafebuys = async()=>{
    const res = await axios.get(`/safebuys/?seller=${id}`)
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
   <Safesellscomponent user={user} s={s} />
    )} 
    <Footer/>
    </>
  )
}

export default Safebuys
