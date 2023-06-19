import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Eachsafebuy from './Eachsafebuy'
import Footer from './Footer';
import Menubar from './Menubar';
import Navbar from './Navbar';

const Eachsafebuys = () => { 
const [safebuys, setSafebuys] = useState([]); 
  useEffect(() => {
    const getsafebuys = async () => {
      const res = await axios.get(`/safebuys`);
      setSafebuys(res.data);
      console.log(res.data)
    }
    getsafebuys();
  },[])

  return (<>
  <Navbar/>
  <Menubar/>
    <div className='w-[100%] flex flex-wrap justify-center  items-center '>
       { safebuys.map( s => <Eachsafebuy key={s._id} s={s}/> )}
    </div>
    <Footer/>
    </>
  )    
}

export default Eachsafebuys
