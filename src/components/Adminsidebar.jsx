import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"



const Adminsidebar = ({isOn}) => {
  const[users, setUsers] = useState([])
  const[posts, setPosts] = useState([])
  const[buys, setBuys] = useState([])
  const[writes, setWrites] = useState([])

useEffect(() => {
 const getUsers = async() => {
  const res = await axios.get(`/users`);
  setUsers(res.data)
 }
 getUsers();
},[])

useEffect(()=>{
  const getPosts = async()=>{
    const res = await axios.get(`/items`)
    setPosts(res.data)
   }
  getPosts()
},[])

useEffect(()=>{
  const getBuys = async()=>{
    const res = await axios.get(`/safebuys`)
    setBuys(res.data)
   }
  getBuys()
},[])

useEffect(()=>{
  const getWrites = async()=>{
    const res = await axios.get(`/blogs`)
    setWrites(res.data)
   }
  getWrites()
},[])


    return (
      <div className={isOn? "flex flex-col flex-[1] justify-center z-[60] bg-[#ff0000]  items-center  p-10 w-[200px] h-[100vh]  fixed" : "hidden"}>
      <Link to={`/adminUser`} className=" group flex justify-between items-center my-5" >
        <li className=" list-none text-[#ffffff] roboto   "  >Users <sup className="p-2 border-2">{users.length}</sup> </li>
        <i class="fa-solid fa-house text-[#ffffff]  hidden group-hover:flex   text-2xl transition-c group-hover:translate-x-5 ">
          </i>
          </Link>
      <Link to={`/adminPost`} className=" group flex justify-between items-center my-5" >
        <li className="text-[#ffffff] list-none  roboto"  >Posts <sup className="p-2 border-2">{posts.length}</sup>  </li>
        <i class="fa-solid fa-store text-[#ffffff] hidden group-hover:flex   text-2xl transition-c group-hover:translate-x-5 ">
          </i>
          </Link>
      <Link to={`/adminBuy`} className=" group flex justify-between items-center my-5" >
        <li className="text-[#ffffff] list-none  roboto"  >Buys <sup className="p-2 border-2">{buys.length}</sup>  </li>
        <i  class="fa-sharp fa-solid fa-bell-concierge text-[#ffffff]  hidden group-hover:flex   text-2xl transition-c group-hover:translate-x-5 ">
          </i>
          </Link>
      <Link to={`/adminCat`} className=" group flex justify-between items-center my-5" >
        <li className=" text-[#ffffff] list-none  roboto"  >Categories</li>
        <i class="fa-solid fa-radio text-[#ffffff]  hidden group-hover:flex   text-2xl transition-c group-hover:translate-x-5 ">
          </i>
          </Link>    
          <Link to={`/adminBlog`} className=" group flex justify-between items-center my-5" >
        <li className=" text-[#ffffff] list-none  roboto"  >Write <sup className="p-2 border-2">{writes.length}</sup> </li>
        <i class="fa-solid fa-radio text-[#ffffff]  hidden group-hover:flex   text-2xl transition-c group-hover:translate-x-5 ">
          </i>
          </Link>   
          <Link to={`/admingame`} className=" group flex justify-between items-center my-5" >
        <li className=" text-[#ffffff] list-none  roboto"  >Game</li>
        <i class="fa-solid fa-game text-[#ffffff]  hidden group-hover:flex   text-2xl transition-c group-hover:translate-x-5 ">
          </i>
          </Link> 

   </div>
   
    )
  }
  
  export default Adminsidebar