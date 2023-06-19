import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import ErrorDiv from '../pages/ErrorDiv'
import shorten from '../shorten'
import Empty from './Empty'

const BlogDiv = () => {
const [blogs, setBlogs] = useState([])
const [blogCats, setBlogCats] = useState([])
const [noRes, setNoRes] = useState(false)
const [blogsQ, setBlogsQ] = useState([]);
const[q, setQ] = useState("");
const[notFound, setNotFound] = useState(false)
const {search} = useLocation();
 
useEffect(()=>{
  const getblogsQ = async()=>{
    if(q){
      setBlogs([])
    setNoRes(true) 
    const res = await axios.get('/blogs/?cat='+q)
    setBlogsQ(res.data)
    res.data.length === 0  && setNotFound(true)
  setNoRes(false)
 
  }else{
    setNotFound(false)
    setNoRes(true)
    const r = await axios.get(`/blogs${search}`)
    setBlogs(r.data)
    setNoRes(false)
  }}
  getblogsQ()
  console.log(search)
  console.log(q)
},[q,search])


useEffect(()=>{
  setNoRes(true)
  const getBlogs = async()=>{
    const res = await axios.get(`/blogs`)
    setBlogs(res.data)
    setNoRes(false)
  }
  getBlogs()
},[])

useEffect(()=>{
  const getBlogCats = async()=>{
    const res = await axios.get(`/categories/blog`)
    setBlogCats(res.data)
  }
  getBlogCats()
},[])

  return (
    <div className="  w-[100%] flex  flex-col justify-center items-center">
    <div className=" boxsh rounded-full  flex justify-around items-center w-[700px] sm:h-[50px] sm:mt-10  sm:w-[300px] md:w-[400px] h-[70px] m-5 ">
      <input className="inp w-[80%] p-2 h-[80%] rounded-full" type="text" placeholder="What is good ! ! ?" onChange={(e)=>setQ(e.target.value)}/>
      <i className="fa fa-book text-[#ff1e009e] text-2xl hover:animate-spin"></i>
    </div>
    {noRes ? <Empty/> :
    <div className=" w-[100%] flex justify-around m-5 items-center flex-wrap">
      {blogCats.map(bc=>
         <div key={bc._id} className=" p-2 text-[#f8a203] hover:opacity-[.6] m-2 rounded-full border-2 hover:animate-bounce border-[#f8a203]">{bc.name}</div>
    
        )}
     
    </div>}
    {notFound && <ErrorDiv/>}

    <div className=" w-[100%] flex justify-center m-5 items-center flex-wrap">
     {blogs.map( b =>
        <Link to={`/blog/${b._id}`} key={b._id} className="w-[300px] group m-5 flex flex-col justify-center items-center relative rounded-lg boxsh">
        <div className="w-full h-[200px] flex justify-center items-center relative ">
        {b.img &&  <img className="bg-cover  rounded-t-lg w-full h-[100%]" src={b.img} alt="blog img" />}
        {b.video &&  <video className="bg-cover  rounded-t-lg w-full h-[100%]" src={b.video} />}
          <div className="w-full absolute rounded-lg bg-[#0000009e] top-[0] group-hover:opacity-[1] opacity-[0] h-[300px] "></div>
          </div>
        <div className="roboto text-2xl text-[#f8a203] m-5 font-[700]">{b.title}</div>
        <div className="absolute m-5 text-center group-hover:opacity-[1] text-white opacity-[0]">
          {shorten(b.desc,100)}
         </div>
          </Link>)}
          {blogsQ.map( a =>
        <Link to={`/blog/${a._id}`} key={a._id} className="w-[300px] group m-5 flex flex-col justify-center items-center relative rounded-lg boxsh">
        <div className="w-full h-[200px] flex justify-center items-center relative ">
        {a.img &&  <img className="bg-cover  rounded-t-lg w-full h-[100%]" src={a.img} alt='blog img'/>}
        {a.video &&  <video className="bg-cover  rounded-t-lg w-full h-[100%]" src={a.video} />}
          <div className="w-full absolute rounded-lg bg-[#0000009e] top-[0] group-hover:opacity-[1] opacity-[0] h-[300px] "></div>
          </div>
        <div className="roboto text-2xl text-[#f8a203] m-5 font-[700]">{a.title}</div>
        <div className="absolute m-5 text-center group-hover:opacity-[1] text-white opacity-[0]">
          {shorten(a.desc,100)}
         </div>
          </Link>)}
          
          </div>
  </div>
  )
}

export default BlogDiv
