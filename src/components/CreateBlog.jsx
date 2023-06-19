import React, { useContext, useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Menubar from '../components/Menubar'
import Navbar from '../components/Navbar'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../firebase';
import axios from 'axios';
import { Link } from 'react-router-dom';
 
const CreateBlog = () => {

    const [file, setFile] = useState(null)
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [sourceData, setSourceData] = useState("")
    const [videoFile, setVideoFile] = useState(null)
    const [category, setCategory] = useState([])
    const [myPost, setMyPost] = useState([]);
  
  var blogg;

  useEffect(()=>{
    const getMyItems = async()=>{
      const resp = await axios.get(`/blogs`) 
      console.log(resp.data)
     setMyPost(resp.data)
    }
    getMyItems()
  },[])



  const handleCreate = ()=>{
 if (file){ 
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
          blogg = {title,desc,img:downloadURL,categories:category,sourceData}
      show();
        });
      }
    );
    const show = async()=>{
      const res = await axios.post('/blogs',blogg)
      console.log(res)
      window.location.reload()
     }
    }else{
        const videoName = new Date().getTime() + videoFile.name;
        const storage = getStorage(app);
        const storageRef = ref(storage, videoName);
        const uploadTask = uploadBytesResumable(storageRef, videoFile);
        
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
              blogg = {title,desc,video:downloadURL,categories:category,sourceData}
              console.log(downloadURL)
          show();
            });
          }
        );
        const show = async()=>{
          const res = await axios.post('/blogs',blogg)
          console.log(res)
          window.location.reload()
         }
          
        
        };
    
        
}
    


  return (
    
    <>
    <Navbar/>
    <Menubar/>
    <div className='flex w-[100vw] justify-center items-center  md:flex-col'>
       <div className= 'w-full flex-[1] border flex flex-wrap justify-center glassin p-5 items-center'>
        <label htmlFor="fileInput"><i className="fa fa-camera cursor-pointer hover:opacity-[0.6] m-2 text-[#4d4d4dee] text-[50px]"></i>
      <input
       className='w-[100%] hidden bg-white border-b-2 p-3 m-2 flex justify-center items-center'
       id='fileInput' 
       type="file"
        accept="image/png, image/jpg, image/gif, image/jpeg"
        onChange={(e)=>setFile(e.target.files[0])}/>
      </label>
      <label htmlFor="videoInput"><i className="fa fa-video cursor-pointer hover:opacity-[0.6] m-2  text-[#4d4d4dee] text-[50px]"></i>
      <input
       className='w-[100%] hidden bg-white border-b-2 p-3 m-2 flex justify-center items-center'
       id='videoInput' 
       type="file"
        accept="video/mp4,video/x-m4v,video/*"
        onChange={(e)=>setVideoFile(e.target.files[0])}/>
      </label>
      
      <input 
      className='w-[100%] bg-white border-b-2 p-3 m-2 flex justify-center items-center'
       type="text" placeholder='Title..' onChange={(e)=>setTitle(e.target.value)} />
      <input 
      className='w-[100%] border-b-2 bg-white p-3 m-2 flex justify-center items-center'
       type="text" placeholder='Description..'  onChange={(e)=>setDesc(e.target.value)}/>
      <div className='w-[100%] flex justify-around items-center '>
       <input
        className='w-[100px] border-b-2 bg-white p-3 m-2 flex justify-center items-center'
         type="text" placeholder='Source..'  onChange={(e)=>setSourceData(e.target.value)}/>
      </div>
      <input
       className='w-[100%] border-b-2 bg-white p-3 m-2 flex justify-center items-center'
        type="text" placeholder='Categorize product..'  onChange={(e)=>setCategory(e.target.value.split(","))}/>
     
     {file && <img src={URL.createObjectURL(file)}   alt="blog pics" className='w-full h-[300px] object-cover' /> } 
     {videoFile && <video src={URL.createObjectURL(videoFile)} controls  alt="blog film" className='w-full h-[300px] object-cover' /> } 
     <button 
      className='bg-gradient-to-r hover:opacity-[0.41] flex  justify-center m-5 items-center opacity-[.7] from-[#161616] to-[#727272] via-[#494949] roboto text-white text-[900] rounded-md text-lg  round-md h-[50px] flex w-[80%]' 
      onClick={handleCreate}>Create</button>
      <div className='w-[100%] flex justify-center items-center m-4  text-[#474747]'> <input className="m-5" type="checkbox" />Fill all fields</div> 
    </div>
     <div className="flex-[1] md:h-[100%] h-[100vh] overflow-y-scroll flex justify-center m-5 items-center flex-wrap">
       {myPost.map(p=>(
        <Link to={`/blog/${p._id}`} key={p._id} className="w-[100px]  h-[100px] group m-2 flex flex-wrap justify-center items-center relative rounded-lg boxsh">
          <div className="w-full h-[100%] flex justify-center items-center relative ">
           {p.img && <img className="bg-cover  rounded-t-lg w-full h-[100%]" src={p.img} alt="items-pics" />}
           {p.video && <video className="bg-cover  rounded-t-lg w-full h-[100%]" src={p.video} alt="items-pics" />}
          
            <div className="w-full absolute rounded-lg bg-[#0000009e] top-[0] group-hover:opacity-[1] opacity-[0] h-[100px] "></div>
            </div>
          <div className="roboto text-md text-center text-[#494949] m-5 font-[500]">{p.title} </div>
          <div className="absolute group-hover:opacity-[1] top-[30px] left-[10px] text-white opacity-[0]">{new Date(p.createdAt).toDateString()}</div>

          <div className="text-white absolute top-[10px] font-[500] left-[10px] group-hover:opacity-[1] opacity-0">{p.sourceData}</div>
          <img className="bg-contain w-10 h-10  rounded-full absolute bottom-[10px] right-[10px]" src={p.sourceLogo} alt="brand-pics" />
        </Link>
       )) }
       
       
       </div>
    </div>
    <Footer/>
    </>

  )
}

export default CreateBlog
