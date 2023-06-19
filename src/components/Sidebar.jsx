import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { Context } from "../context/Context";


const Sidebar = ({isOn}) => {
  const[posts, setPosts] = useState([])
  const [myPost, setMyPost] = useState([]);
  const {user} = useContext(Context);

  useEffect(()=>{
    const getPosts = async()=>{
      const res = await axios.get(`/items`)
      setPosts(res.data)
     }
    
    
    getPosts()
  },[])
  
  useEffect(()=>{
  const getMyItems = async()=>{
    const resp = await axios.get(`/items/?user=${user?.username}`) 
    console.log(resp.data)
   setMyPost(resp.data)
  }
  getMyItems()
  },[user]) 

    return (
      <div className={isOn? "flex flex-col flex-[1] justify-center z-50  desk:hidden items-center border glass border-2 p-10 w-[80vw]  fixed" : "hidden"}>
      <Link to={`/`} className=" group flex justify-between items-center my-5" >
        <li className=" list-none text-[#ff0000] roboto textsh  "  >Home</li>
        <i class="fa-solid fa-house text-[#ff0000]  hidden group-hover:flex   text-2xl transition-c group-hover:translate-x-5 ">
          </i>
          </Link>
      <Link to={`/items`} className=" group flex justify-between items-center my-5" >
        <li className="text-[#ff0000] list-none textsh roboto"  >Store  <sup>{posts.length}</sup></li>
        <i class="fa-solid fa-store text-[#ff0000] hidden group-hover:flex   text-2xl transition-c group-hover:translate-x-5 ">
          </i>
          </Link> 
      <Link to={`/showcase`} className=" group flex justify-between items-center my-5" >
        <li className="text-[#ff0000] list-none textsh roboto"  >Showcase  <sup>{myPost.length}</sup></li>
        <i  class="fa-sharp fa-solid fa-bell-concierge text-[#ff0000]  hidden group-hover:flex   text-2xl transition-c group-hover:translate-x-5 ">
          </i>
          </Link>
      <Link to={`/blog`} className=" group flex justify-between items-center my-5" >
        <li className=" text-[#ff0000] list-none textsh roboto"  >What's new</li>
        <i class="fa-solid fa-radio text-[#ff0000]  hidden group-hover:flex   text-2xl transition-c group-hover:translate-x-5 ">
          </i>
          </Link>       
   </div>
   
    )
  }
  
  export default Sidebar