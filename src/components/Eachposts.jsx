import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Eachpost from './Eachpost';
import Footer from './Footer';
import Menubar from './Menubar';
import Navbar from './Navbar';

const Eachposts = () => {

    const [posts, setPosts] = useState([]); 
  useEffect(() => {
    const getPosts = async () => {
      const res = await axios.get(`/items`);
      setPosts(res.data);
      console.log(res.data)
    }
    getPosts();
  },[])

  return (<>
   <Navbar/>
  <Menubar/>
    <div className='w-[100%] flex flex-wrap justify-center items-center '>
       { posts.map( p => <Eachpost key={p._id} p={p}/> )}
    </div>
    <Footer/>
  </>
 
  )
}

export default Eachposts
