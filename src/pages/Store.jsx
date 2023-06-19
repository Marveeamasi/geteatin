import { useContext, useEffect, useState } from "react"
import Footer from "../components/Footer"
import Menubar from "../components/Menubar"
import Navbar from "../components/Navbar"
import axios from "axios"
import shortname from "../shortname"
import { Link, useLocation } from "react-router-dom"
import Empty from "../components/Empty"
import ErrorDiv from "./ErrorDiv"
import BuysMenu from "../components/BuysMenu"
import { Context } from "../context/Context"


const Store = () => {
const {search} = useLocation();
const [noRes, setNoRes] = useState(false) 
  const [cats, setCats] = useState([]);
  const [items, setItems] = useState([]);
  const [itemsQ, setItemsQ] = useState([]);
const[q, setQ] = useState("");
const[notFound, setNotFound] = useState(false)
 const{user} = useContext(Context)

  useEffect(()=>{
    const getCats = async()=>{
    const res = await axios.get('/categories');
     setCats(res.data)
     
    }
    getCats()
  },[])





  

  useEffect(()=>{
    const getItemsQ = async()=>{
      if(q){
        setItems([])
      setNoRes(true) 
      const res = await axios.get('/items/?user='+q)
      setItemsQ(res.data)
      res.data.length === 0  && setNotFound(true)
    setNoRes(false)
   
    }else{
      setNotFound(false)
      setNoRes(true)
      const r = await axios.get(`/items${search}`)
      setItems(r.data)
      setNoRes(false)
    }}
    getItemsQ()
  },[q,search])



  useEffect(()=>{
    setNoRes(true)
   const fetchItems = async ()=>{
    const res = await axios.get('/items'+search)
    setItems(res.data);
    setNoRes(false)
   }
   fetchItems();
   console.log(search)
  },[search])
console.log(items.map(p=> p.userLogo))

  return (
    <>
    <Navbar/>
    <Menubar />
    {user && <BuysMenu/>}
    <div className="  w-[100%] flex  flex-col justify-center items-center">
      <div className=" boxsh rounded-full  flex justify-around items-center w-[700px] sm:h-[50px] sm:mt-10  sm:w-[300px] md:w-[400px] h-[70px] m-5 ">
        <input className="inp w-[80%] p-2 h-[80%] rounded-full" type="text" placeholder="Search for food..."  onChange={(e)=>setQ(e.target.value)}/>
        <i className="fa fa-burger text-[#ff1e009e] text-2xl hover:animate-spin"></i>
      </div>
      <div className=" w-[100%] flex justify-around m-5 items-center flex-wrap">
        {cats.map(c=>(
         <Link to={`/items/?cat=${c.name}`} key={c._id} className=" p-2 text-[#ff1e00a0] hover:opacity-[.6] m-2 rounded-full border-2 hover:animate-bounce border-[#ff1e00c7]">{c.name}</Link>
        ))}
       
      </div>
      {notFound && <ErrorDiv/>}
     {noRes ? <Empty/> : <div className=" w-[100%] flex justify-center m-5 items-center flex-wrap">
       {items.map(a=>(
         <Link key={a._id} to={`/items/${a._id}`} className="w-[300px] group m-5 flex flex-col justify-center items-center relative rounded-lg boxsh">
         <div className="w-full h-[200px] flex justify-center items-center relative ">
           <img className="bg-cover  rounded-t-lg w-full h-[100%]" src={a.img} alt="items-pics" />
           <div className="w-full absolute rounded-lg bg-[#0000009e] top-[0] group-hover:opacity-[1] opacity-[0] h-[300px] "></div>
           </div>
         <div className="robot text-lg text-[#f8a203] m-5 font-[700]">{a.name.length > 10 ? (shortname(a.name,6)) : (a.name)}</div>
         <div className="absolute group-hover:opacity-[1] top-[30px] left-[10px] text-white opacity-[0]">{new Date(a.createdAt).toDateString()}</div>
         <div className="absolute group-hover:opacity-[1] top-[10px] right-[10px] glasssm text-white opacity-[0]">{a.quantity} {a.capacity} : ${a.price}</div>
        <div className="w-10 h-10 flex justify-center text-2xl items-center  rounded-full absolute bottom-[0] left-[20px]"><i  className="fa fa-fire  hover:text-[#f8a203] text-[#a09f9f]" ></i> <sub className="text-[#a7a7a7]">{a.likes.length}</sub><i  className="fa-solid fa-fire-extinguisher  hover:text-[#f8a203] text-[#aca9a9]"></i> <sub className="text-[#aca9a9]">{a.dislikes.length}</sub></div>
        <div className="roboto text-[20px] glassmd  text-black animate-bounce rounded-md opacity-[0] group-hover:opacity-[1] p-1 absolute  m-5 font-[700]">Order</div> 
         <div className="text-white absolute top-[10px] font-[500] left-[10px] group-hover:opacity-[1] opacity-0">{(a.username).charAt(0).toUpperCase()}{(a.username).slice(1)}</div>
        <img className="bg-contain w-10 h-10  rounded-full absolute bottom-[10px] right-[10px]" src={a.userLogo} alt="brand-pics" />
       </Link>
       ))}  

{itemsQ.map(b=>(
         <Link key={b._id} to={`/items/${b._id}`} className="w-[300px] group m-5 flex flex-col justify-center items-center relative rounded-lg boxsh">
         <div className="w-full h-[200px] flex justify-center items-center relative ">
           <img className="bg-cover  rounded-t-lg w-full h-[100%]" src={b.img} alt="items-pics" />
           <div className="w-full absolute rounded-lg bg-[#0000009e] top-[0] group-hover:opacity-[1] opacity-[0] h-[300px] "></div>
           </div>
         <div className="robot text-lg text-[#f8a203] m-5 font-[700]">{b.name.length > 10 ? (shortname(b.name,6)) : (b.name)}</div>
         <div className="absolute group-hover:opacity-[1] top-[30px] left-[10px] text-white opacity-[0]">{new Date(b.createdAt).toDateString()}</div>
         <div className="absolute group-hover:opacity-[1] top-[10px] right-[10px] glasssm text-white opacity-[0]">{b.quantity} {b.capacity} : ${b.price}</div>
        <div className="w-10 h-10 flex justify-center text-2xl items-center  rounded-full absolute bottom-[0] left-[20px]"><i  className="fa fa-fire  hover:text-[#f8a203] text-[#a09f9f]" ></i> <sub className="text-[#a7a7a7]">{b.likes.length}</sub><i  className="fa-solid fa-fire-extinguisher  hover:text-[#f8a203] text-[#aca9a9]"></i> <sub className="text-[#aca9a9]">{b.dislikes.length}</sub></div>
        <div className="roboto text-[20px] glassmd  text-black animate-bounce rounded-md opacity-[0] group-hover:opacity-[1] p-1 absolute  m-5 font-[700]">Order</div> 
         <div className="text-white absolute top-[10px] font-[500] left-[10px] group-hover:opacity-[1] opacity-0">{(b.username).charAt(0).toUpperCase()}{(b.username).slice(1)}</div>
        <img className="bg-contain w-10 h-10  rounded-full absolute bottom-[10px] right-[10px]" src={b.userLogo} alt="brand-pics" />
       </Link>
       
       ))}  

      </div> }
      
    </div>
    <Footer/>
    </>
  )
}

export default Store