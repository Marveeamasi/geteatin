import { async } from "@firebase/util"
import axios from "axios"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import { useEffect, useState } from "react"
import app from "../firebase"
import Blogcat from "./Blogcat"
import Footer from "./Footer"
import Itemcat from "./Itemcat"
import Menubar from "./Menubar"
import Navbar from "./Navbar"


const CreateCats = () => {
const[icats, setIcats] = useState([])
const[bcats, setBcats] = useState([])
const[itemcat, setItemcat] = useState('')
const[blogcat, setBlogcat] = useState('')
const [file, setFile] = useState(null)
var blogg;

useEffect(()=>{
const fetchIcats = async()=>{
    const res = await axios.get(`/categories`)
    setIcats(res.data)
}
fetchIcats()
},[icats])

useEffect(()=>{
    const fetchBcats = async()=>{
        const res = await axios.get(`/categories/blog`)
        setBcats(res.data)
    }
    fetchBcats()
    },[bcats])

    const createI = () => {
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
          blogg = {name:itemcat, img:downloadURL}
      show();
        });
      }
    );
    const show = async()=>{
      const res = await axios.post('/categories',blogg)
      console.log(res)
      window.location.reload()
     }
    }
    


    const createB = async() => {
        await axios.post(`/categories/blog`, {
           name:blogcat
       })
       
   }



  return (
    <>
    <Navbar/>
    <Menubar/>
    <div className='flex flex-wrap justify-center items-center w-[100vw] border-2 rounded-md m-2 p-2'>
      <div className='flex flex-col justify-center items-center flex-[1] border-2 rounded-md m-2 p-2'>
        <div className='text-[#4e4e4e] robot '>Create items category</div>
        <label htmlFor="fileInput"><i className="fa fa-camera cursor-pointer hover:opacity-[0.6] m-2 text-[#4d4d4dee] text-[20px]"></i>
      <input
       className='w-[100%] hidden bg-white border-b-2 p-3 m-2 flex justify-center items-center'
       id='fileInput' 
       type="file"
        accept="image/png, image/jpg, image/gif, image/jpeg"
        onChange={(e)=>setFile(e.target.files[0])}/>
      </label>
        <input type="text" placeholder='enter...' className='border-2 rounded-md m-2 p-2' onChange={(e)=>setItemcat(e.target.value)}/>
        {file && <img src={URL.createObjectURL(file)}   alt="blog pics" className='w-full h-[300px] object-cover' /> } 
        <button onClick={createI} className=" bg-[#464646] text-white hover:opacity-[0.6] rounded-md m-2 p-2 ">Create</button>
       <div className="flex flex-wrap justify-center items-center">
       {icats.map(i=>
          <Itemcat key={i._id} i={i}/>
          )}
       </div>
      </div>
      <div className='flex flex-col justify-center items-center flex-[1] border-2 rounded-md m-2 p-2'>
        <div className='text-[#4e4e4e] robot '>Create blog category</div>
        <input type="text" placeholder='enter...' className='border-2 rounded-md m-2 p-2' onChange={(e)=>setBlogcat(e.target.value)}/>
        <button onClick={createB} className=" bg-[#464646] text-white rounded-md hover:opacity-[0.6] m-2 p-2">Create</button>
       <div className="flex flex-wrap justify-center items-center">
       {bcats.map(b=>
          <Blogcat key={b._id} b={b}/>  )}
        </div> 
      </div>
     

    </div>
    <Footer/>
    </>
  )
}

export default CreateCats
