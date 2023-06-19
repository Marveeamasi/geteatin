import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Eachuser from './Eachuser'
import Footer from './Footer';
import Menubar from './Menubar';
import Navbar from './Navbar';

const Eachusers = () => { 
const [users, setUsers] = useState([]); 
  useEffect(() => {
    const getUsers = async () => {
      const res = await axios.get(`/users`);
      setUsers(res.data);
      console.log(res.data)
    }
    getUsers();
  },[])

  return (<>
  <Navbar/>
  <Menubar/>
    <div className='w-[100%] flex flex-wrap justify-center  items-center '>
       { users.map( u => <Eachuser key={u._id} user={u}/> )}
    </div>
    <Footer/>
    </>
  )    
}

export default Eachusers
