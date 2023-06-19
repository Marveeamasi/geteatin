import React from 'react'
import BlogDiv from '../components/BlogDiv'
import Empty from '../components/Empty'
import Footer from '../components/Footer'
import Menubar from '../components/Menubar'
import Navbar from '../components/Navbar'


const Blog = () => {
  return (
    <div>
      <Navbar/>
    <Menubar/>
      <BlogDiv/>
      <Footer/>
    </div>
  )
}

export default Blog
