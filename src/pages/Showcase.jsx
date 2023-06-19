import React, { useContext, useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Menubar from '../components/Menubar'
import Navbar from '../components/Navbar'
import BuysMenu from '../components/BuysMenu'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../firebase';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Context } from '../context/Context';
import Empty from '../components/Empty'



const Showcase = () => {
  const {user} = useContext(Context)
  const [noRes, setNoRes] = useState(false) 
  const [file, setFile] = useState(null)
  const [name, setName] = useState("")
  const [desc, setDesc] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [capacity, setCapacity] = useState("")
  const [price, setPrice] = useState(0)
  const [category, setCategory] = useState([])
  const [myPost, setMyPost] = useState([]);
  const [isFilled, setIsFilled] = useState(false)
  const [loading, setLoading]=useState(false)
  const [bar, setBar] = useState('0%')
var item;


useEffect(()=>{
 if(file && name && desc && quantity && capacity && category && price){
  setIsFilled(true)
 }
 else if(!file || !name || !desc || !quantity || !capacity || !category || !price){
  setIsFilled(false)
 }else{
  setIsFilled(false)
 }
},[file,name,desc,quantity,capacity,category,price])


useEffect(()=>{
  setNoRes(true)
  const getMyItems = async()=>{
    const resp = await axios.get(`/items/?user=${user.username}`) 
   setMyPost(resp.data)
   setNoRes(false)
  }
  getMyItems()
},[user.username])

const handleShow = ()=>{
  setLoading(true)
const fileName = new Date().getTime() + file.name;
const storage = getStorage(app);
const storageRef = ref(storage, fileName);
const uploadTask = uploadBytesResumable(storageRef, file);

// Register three observers:
// 1. 'state_changed' observer, called any time the state changes
// 2. Error observer, called on failure
// 3. Completion observer, called on successful completion
uploadTask.on('state_changed', 
  (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    setBar('Showcasing is '+progress+ '% done')
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        setBar('Showcasing is paused')
        break;
      case 'running':
        console.log('Upload is running');
        setBar('Showcasing...')
        break;
        
    }
  }, 
  (error) => {
    // Handle unsuccessful uploads
  }, 
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      item = {userId:user._id,name,desc,img:downloadURL,categories:category,quantity,price,capacity,username:user.username,userLogo:user.brandPicture}
  show();
    });
  }
);
const show = async()=>{
  const res = await axios.post('/items',item)
  console.log(res)
  setLoading(false)
  window.navigator.reload()
 }
  

};



  return (
    
    <>
    <Navbar/>
    <Menubar/>
    {user && <BuysMenu/>}
    <div className='flex w-[100vw] justify-center items-center  md:flex-col'>
       <div className= 'w-full flex-[1] border flex flex-wrap justify-center glassin p-5 items-center'>
        <label htmlFor="fileInput"><i className="fa fa-camera cursor-pointer hover:opacity-[0.6] hover:animate-none animate-spin text-[#ff1e00ef] text-[50px]"></i>
      <input
       className='w-[100%] hidden bg-white border-b-2 p-3 m-2 flex justify-center items-center'
       id='fileInput' 
       type="file"
        accept="image/png, image/jpg, image/gif, image/jpeg"
        onChange={(e)=>setFile(e.target.files[0])}/>
      </label>
      <input 
      className='w-[100%] bg-white border-b-2 p-3 m-2 flex justify-center items-center'
       type="text" placeholder='Name of product..' onChange={(e)=>setName(e.target.value)} />
      <input 
      className='w-[100%] border-b-2 bg-white p-3 m-2 flex justify-center items-center'
       type="text" placeholder='Brief description..'  onChange={(e)=>setDesc(e.target.value)}/>
      <div className='w-[100%] flex justify-around items-center '>
       <input
        className='w-[100px] border-b-2 bg-white p-3 m-2 flex justify-center items-center'
         type="text" placeholder='Quantity..'  onChange={(e)=>setQuantity(e.target.value)}/>
       <input
        className='w-[100px] border-b-2 bg-white p-3 m-2 flex justify-center items-center'
         type="text" placeholder='capacity..'  onChange={(e)=>setCapacity(e.target.value)}/>
      <input 
      className='w-[100px] border-b-2 bg-white p-3 m-2 flex justify-center items-center'
       type="number" placeholder='Price..'  onChange={(e)=>setPrice(e.target.value)}/>
      </div>
      <input
       className='w-[100%] border-b-2 bg-white p-3 m-2 flex justify-center items-center'
        type="text" placeholder='Categorize product..'   onChange={(e)=>setCategory(e.target.value.split(","))}/>
     
     {file && <img src={URL.createObjectURL(file)}   alt="showcase pics" className='w-full h-[300px] object-cover' /> } 
    {isFilled && <button 
      className='bg-gradient-to-r hover:opacity-[0.41] flex  justify-center m-5 items-center opacity-[.7] from-[#ad0101] to-[#ff0000] via-[#dd0505] roboto text-white text-[900] rounded-md text-lg  round-md h-[50px] flex w-[80%]' 
      onClick={!loading && handleShow}>{loading? bar : `Showcase`}</button>}
      <div className='w-[100%] flex justify-center items-center m-4  text-[#ff0000]'> <input className="m-5" type="checkbox" />Any showcase aside food content are not allowed</div> 
    </div>
    {noRes? <Empty/> : <div className="flex-[1] md:h-[100%] h-[100vh] overflow-y-scroll flex justify-center m-5 items-center flex-wrap">
       {myPost.map(p=>(
        <Link to={`/items/${p._id}`} key={p._id} className="w-[300px] group m-5 flex flex-col justify-center items-center relative rounded-lg boxsh">
          <div className="w-full h-[200px] flex justify-center items-center relative ">
            <img className="bg-cover  rounded-t-lg w-full h-[100%]" src={p.img} alt="items-pics" />
            <div className="w-full absolute rounded-lg bg-[#0000009e] top-[0] group-hover:opacity-[1] opacity-[0] h-[300px] "></div>
            </div>
          <div className="roboto text-2xl text-[#f8a203] m-5 font-[700]">{p.name} </div>
          <div className="absolute group-hover:opacity-[1] top-[30px] left-[10px] text-white opacity-[0]">{new Date(p.createdAt).toDateString()}</div>
          <div className="absolute group-hover:opacity-[1] top-[10px] right-[10px] glasssm text-white opacity-[0]">{p.quantity} {p.capacity} : ${p.price}</div>
          <div className="w-10 h-10 flex justify-center text-2xl items-center  rounded-full absolute bottom-[0] left-[10px]"><i  className="fa fa-fire text-2xl hover:text-[#f8a203] text-[#ff0606c1]"></i> <sub className="text-[#ff000085]">{p.likes.length}</sub></div>
         <div className="roboto text-[20px] glassmd  text-black animate-bounce rounded-md opacity-[0] group-hover:opacity-[1] p-1 absolute  m-5 font-[700]">View</div> 
          <div className="text-white absolute top-[10px] font-[500] left-[10px] group-hover:opacity-[1] opacity-0">You</div>
          <img className="bg-contain w-10 h-10  rounded-full absolute bottom-[10px] right-[10px]" src={p.userLogo} alt="brand-pics" />
        </Link>
       )) }
       
       
       </div>}
    </div>
    <Footer/>
    </>
  )
}

export default Showcase