import { useContext, useEffect, useState } from "react";
import Login from "./Login";
import { Link } from "react-router-dom";
import { Context } from "../context/Context";
import axios from "axios";



const Navbar = () => {
  const[posts, setPosts] = useState([])
  const {user} = useContext(Context)
  const [myPost, setMyPost] = useState([]);
const [isOpen, setIsOpen] = useState(false)
  const logClicked = () => {
    setIsOpen(!isOpen);
  }

  useEffect(()=>{
    const getPosts = async()=>{
      const res = await axios.get(`https://geteating.herokuapp.com/api/items`)
      setPosts(res.data)
     }
    
    
    getPosts()
  },[])

useEffect(()=>{
  const getMyItems = async()=>{
    const resp = await axios.get(`https://geteating.herokuapp.com/api/items/?user=${user?.username}`) 
    console.log(resp.data)
   setMyPost(resp.data)
  }
  getMyItems()
},[user])

  return (
    <>
    <div className="sticky top-[0] z-40 bg-gradient-to-r from-[#ad0101] to-[#ff0000] via-[#dd0505] flex justify-between items-center w-[100vw] h-[20vh]">
     <div className="square text-white flex-[1] flex justify-center  text-[45px] font-bold items-center">getEating</div>
     <div className="flex flex-[1] justify-between items-center border border-[1.5] p-5  rounded-2xl md:hidden">
        <Link to={`/`} className="relative group flex justify-center items-center " >
          <li  className="text-white list-none roboto  "  >Home</li>
          <i class="fa-solid fa-house text-white absolute hidden group-hover:flex  shadow-c text-[40px] transition-c group-hover:translate-x-5 opacity-[0.5]">
            </i>
            </Link>
        <Link to={`/items`} className="relative group flex justify-center items-center" >
          <li  className="text-white list-none roboto"  >Store <sup>{posts.length}</sup></li>
          <i class="fa-solid fa-store text-white absolute hidden group-hover:flex  shadow-c text-[40px] transition-c group-hover:translate-x-5 opacity-[0.5]">
            </i>
            </Link>
        <Link to={`/showcase`} className="relative group flex justify-center items-center" >
          <li  className="text-white list-none roboto"  >Showcase <sup>{myPost.length}</sup></li>
          <i  class="fa-sharp fa-solid fa-bell-concierge text-white absolute hidden group-hover:flex  shadow-c text-[40px] transition-c group-hover:translate-x-5 opacity-[0.5]">
            </i>
            </Link>
        <Link to={`/blog`} className="relative group flex justify-center items-center" >
          <li  className="text-white  list-none roboto"  >Wat's good</li>
          <i class="fa-solid fa-radio text-white absolute hidden group-hover:flex  shadow-c text-[40px] transition-c group-hover:translate-x-5 opacity-[0.5]">
            </i>
            </Link>        
     </div>
     
     <div className="flex flex-[1] justify-around items-center">
       {user && <Link to={`/account/${user._id}`} className="relative group flex justify-center items-center mx-5"  >
          <li  className="text-[#ffe600] list-none roboto hidden group-hover:flex  shadow-c absolute transition-c group-hover:translate-x-5" >Account</li>
          <i class="fa-solid fa-user-gear text-[#ffe600] text-[25px] opacity-[0.7]">
            </i>
            </Link>}
      {isOpen? (<div onClick={logClicked} className="relative group flex justify-center items-center mx-5"  >
          <li className="text-[#ffe600] list-none roboto hidden group-hover:flex  shadow-c absolute transition-c group-hover:translate-x-5"  >Cancel</li>
          <i  class="fa-solid fa-minus text-[#ffe600] text-[25px] opacity-[0.7]">     
          </i>
          </div> ) :(<div onClick={logClicked} className="relative group flex justify-center items-center mx-5"  >
         {user ? <li className="text-[#ffe600] list-none roboto hidden group-hover:flex  shadow-c absolute transition-c group-hover:translate-x-5"  >Logout</li> :
         <li className="text-[#ffe600] list-none roboto hidden group-hover:flex  shadow-c absolute transition-c group-hover:translate-x-5"  >Login</li>
          }<i  class="fa-solid fa-person-through-window text-[#ffe600] text-[25px] opacity-[0.7]">     
          </i>
          </div> )}    
     </div>
    </div>
    <Login isOPen={isOpen}/>
    </>
  )
}

export default Navbar