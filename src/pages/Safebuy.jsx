import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Footer from '../components/Footer'
import Menubar from '../components/Menubar'
import Navbar from '../components/Navbar'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../firebase';
import { useSelector } from 'react-redux'
import { Context } from '../context/Context'
import BuysMenu from '../components/BuysMenu'


const Safebuy = () => {
  const location = useLocation();
  const path = location.pathname.split('/')[2]
  const[item, setItem] = useState({})
  const[quantity, setQuantity] = useState("")
  const[price,setPrice] = useState(0)
  const[file, setFile] = useState(null)
  const[seller, setSeller]=useState({})
  const[safe, setSafe]=useState({})
  const {user} = useContext(Context)
  const[loading, setLoading]=useState(false)
  const[isFilled, setIsFilled] = useState(false)
  var itemm;

  useEffect(()=>{
    if(file && quantity){
     setIsFilled(true)
    }
    else if(!file || !quantity){
     setIsFilled(false)
    }else{
     setIsFilled(false)
    }
   },[file,quantity])
   
  

useEffect(()=>{
 const getItem = async()=>{
    const rest = await axios.get(`/items/${path}`)
    setItem(rest.data)
   // console.log(rest.data)
  }
  getItem()
},[path])

useEffect(()=>{
  const getSeller = async()=>{
    const resp = await axios.get(`/users/${item.userId}`)
    setSeller(resp.data)
  //  console.log(resp.data)
  };
  getSeller()
},[item.userId])
 
useEffect(()=>{
  const priceOfOneItem = (item.price)/(item.quantity)
  const total = priceOfOneItem*quantity
  setPrice(total)
},[item.price,item.quantity,quantity,price])


const sendMoney = ()=>{
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
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
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
        itemm = {
          buyerId:user._id,
          sellerId:seller._id,
          usernameOfBuyer:user.username,
          usernameOfSeller:seller.username,
          screenshot:downloadURL,
          buyerLocation:user.address,
          quantity,
          price,
          capacity:item.capacity,
          sellerAccount:seller.account,
          sellerPhone:seller.phone,
          buyerPhone:user.phone,
          buyconfirmed:false,
          sellconfirmed:false,
          productId:item._id,
          productName:item.name,
        }
    show();
      });
    }
  );
  const show = async()=>{
  const respo = await axios.post('/safebuys',itemm)
  setSafe(respo.data)
  setLoading(false)
  window.location.replace("/safes/"+user._id)

   }
    
  
  };
  




  return (
    <>
    <Navbar/>
    <Menubar/>
    {user && <BuysMenu/>}
    <div className="flex justify-center items-center h-[100vh] bg-no-repeat bg-center bg-cover bg-[#ffffffcf] bg-blend-lighten bg-[url(https://w0.peakpx.com/wallpaper/243/782/HD-wallpaper-no-dinner-yet-plate-glas-fork-knife.jpg)]  w-full">
    <Link to={`/items/${path}`}><i  className="fa fa-x w-10 h-10 text-center z-[112] flex justify-center items-center shadow-md rounded-md fixed text-[#ff1e00ef] top-[30vh] left-5 "></i></Link>
     <Link to={`/items/${path}`}> <i  className="fa fa-x w-10 h-10 text-center z-[112] shadow-md rounded-md fixed flex justify-center items-center text-[#ff1e00ef] top-[30vh] right-5 "></i></Link>

       <div className="square text-white textshh flex fixed top-[0]  justify-center items-center">Safebuy</div>
       <div className= 'w-[500px] border flex flex-wrap justify-center glassin p-5 items-center'>
        <label htmlFor="fileInput"><i className="fa fa-camera cursor-pointer hover:opacity-[0.6] hover:animate-none animate-spin text-[#ff1e00ef] text-[50px]"></i>
      <input id={`fileInput`} className='w-[100%] bg-white border-b-2 hidden p-3 m-2 flex justify-center items-center' type="file" accept="image/png, image/jpg, image/gif, image/jpeg" onChange={(e)=> setFile(e.target.files[0])}/>
      </label>
      <input className='w-[100%] bg-white border-b-2 p-3 m-2 flex justify-center items-center' type="text" placeholder='quantity..' onChange={(e)=> setQuantity(e.target.value)} />
      <div className='w-[100%] bg-white border-b-2 p-3 m-2 flex justify-center items-center'>${price}</div>
     {file && <img src={URL.createObjectURL(file)} alt="screenshot"  className='w-full h-[300px] object-cover' />}
     {isFilled && <button className='bg-gradient-to-r hover:opacity-[0.41] flex  justify-center m-5 items-center opacity-[.7] from-[#ad0101] to-[#ff0000] via-[#dd0505] roboto text-white text-[900] rounded-md text-lg round-md flex p-3' onClick={sendMoney}>{loading? 'Sending...' : 'Send for verification'}</button>
    }  <div className='w-[100%] flex justify-center items-center m-4  text-[#ff0000]'> <input className="m-5" type="checkbox" />By confirming delivery you must have already recieved product</div> 
    </div>
    </div>
    <Footer/>
    </>
  )
}

export default Safebuy