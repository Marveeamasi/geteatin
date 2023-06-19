import React, { useContext, useEffect, useState } from 'react'
import shorten from '../shorten'
import Navbar from '../components/Navbar'
import Menubar from '../components/Menubar'
import Footer from '../components/Footer'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'
import BuysMenu from '../components/BuysMenu'
import { Context } from '../context/Context'


const Singleblog = () => {

  const {user} = useContext(Context)
  const location = useLocation()
  const path = location.pathname.split('/')[2]
const[blog, setBlog] = useState({})
const[blogs, setBlogs] = useState([])
var [doner, setDoner] = useState(false)
useEffect(()=>{
  const getLikeBlogs = async()=>{
  const res = await axios.get(`/blogs/?cat=${blog.categories}`)
  setBlogs(res.data)
  }
  getLikeBlogs()

},[blog.categories])

const deleteBlog = async() => {
  const ress = await axios.delete(`/blogs/${path}`)
  setDoner(ress.data);
  window.location.replace('/blog')
}


useEffect(()=>{
  const getBlog = async()=>{
 const res = await axios.get(`/blogs/${path}`)
 setBlog(res.data)
  }
  getBlog()
},[path])

  return (
    <>
    <Navbar/>
    <Menubar/>
    {user?  <BuysMenu/> : null}
    <div className='flex justify-center md:flex-col items-center  w-full'>
    {doner &&  <div className="w-[100vw] h-[100vh] bg-[#000000d5] flex justify-center items-center absolute z-[111]"><div className="p-5 border-2 text-center rounded-2xl rubik text-2xl font-bold text-[#ff8800] ">Deleted successfully</div></div>}
   
      <div className='flex-[3] flex flex-col self-start justify-center  items-center '>
       {blog.img && <img className='w-full h-[40vh] object-cover ' src={blog.img} alt="blog pics" />}
       {blog.video && <video className='w-full h-[40vh] object-cover ' controls src={blog.video} alt="blog pics" />}
   
     <div className='w-full rubik text-center font-bold text-[40px] text-[#ff2600] m-5'>{blog.title}</div>
     <div className='robot text-[25px] text-center m-5 '>{blog.desc}  </div>
      </div>
      <button onClick={deleteBlog} className="flex  items-center justify-center float-right w-[200px] relative h-[50px] group border-2 border-[#ff0000] m-2 p-2 text-center rounded-lg bg-[#fff]"><div className="group-hover:opacity-[0] text-[#ff0000]">Delete Blog</div> <i className="fa-solid fa-trash absolute opacity-[0] group-hover:opacity-[1] text-[#ff0000]"></i></button>
    
      <div className='flex flex-col flex-[1] text-center justify-center items-center'>
      <div className='w-full rubik font-bold text-[25px] text-[#000000]'>Other related notes</div>
      <div className='flex overflow-y-scroll h-[100vh]  flex-wrap justify-center items-center'>
     
     {blogs.map(blg=>
       <Link to={`/blog/${blg._id}`} key={blg._id} className="w-[300px] group m-5 flex flex-col justify-center items-center relative rounded-lg boxsh">
       <div className="w-full h-[200px] flex justify-center items-center relative ">
        {blg.img && <img className="bg-cover  rounded-t-lg w-full h-[100%]" src={blg.img} alt="items-pics" />
        }
         {blg.video && <video className="bg-cover  rounded-t-lg w-full h-[100%]" src={blg.video} alt="items-pics" />
        } <div className="w-full absolute rounded-lg bg-[#0000009e] top-[0] group-hover:opacity-[1] opacity-[0] h-[300px] "></div>
         </div>
       <div className="roboto text-2xl text-[#f8a203] m-5 font-[700]">{blg.title}</div>
       <div className="absolute m-5 text-center group-hover:opacity-[1] text-white opacity-[0]">
         {shorten(blg.desc,100)}
        </div>
         </Link>
      )}
     
               
      </div>
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default Singleblog
