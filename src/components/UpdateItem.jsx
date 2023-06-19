import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../firebase';
import { Context } from '../context/Context';


const UpdateItem = ({path, mode, toggleMode}) => {
  const {user} = useContext(Context)
    const [file, setFile] = useState(null)
    const [name, setName] = useState("")
    const [desc, setDesc] = useState("")
    const [quantity, setQuantity] = useState(1)
    const [capacity, setCapacity] = useState("")
    const [price, setPrice] = useState(0)
    const [category, setCategory] = useState([])
    const [item, setItem] = useState({})
    var [done, setDone] = useState(null)
    var updatedItem;
    var updatedItemWithImg;

useEffect(()=>{
  const fetchItem = async ()=>{
    const resp = await axios.get('/items/'+path)
    setItem(resp.data);
  setName(resp.data.name)
  setDesc(resp.data.desc)
  setQuantity(resp.data.quantity)
  setCapacity(resp.data.capacity)
  setPrice(resp.data.price)
  setCategory(resp.data.categories)
  }
  fetchItem();
},[path])


    const handleUpdate = async() =>{
      if(file){
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
              updatedItemWithImg = {userId:user._id,img:downloadURL,name,desc,categories:category,quantity,price,capacity,} ;
                 show();
            });
          })
          const show = async()=>{
            const res = await axios.put('/items/'+path,updatedItemWithImg)
            console.log(res)
            setDone(res.data);
            window.location.replace('/')
           }
      }else{
         updatedItem = {userId:user._id,name,desc,categories:category,quantity,price,capacity,}
      const rest = await axios.put('/items/'+path, updatedItem)
      console.log(rest.data)
      setDone(rest.data); 
      window.location.replace('/')     
     }}
        
    
    

  return (
    <div className={mode?"absolute flex z-[111]  justify-center items-center h-[100vh] bg-[#ffffffc3]   w-full":"hidden"}>
      <i onClick={toggleMode} className="fa fa-x w-10 h-10 text-center z-[112] flex justify-center items-center shadow-md rounded-md fixed text-[#ff1e00ef] top-[30vh] left-5 "></i>
      <i onClick={toggleMode} className="fa fa-x w-10 h-10 text-center z-[112] shadow-md rounded-md fixed flex justify-center items-center text-[#ff1e00ef] top-[30vh] right-5 "></i>

    {done &&  <div className="w-[100vw] h-[100vh] bg-[#ffffffd6] flex justify-center items-center absolute z-[111]"><div className="p-5 border-2 text-center rounded-2xl rubik text-2xl font-bold text-[#ff8800] ">Item has been UPDATED successfully</div></div>}
    
    <div className= 'w-[500px] border flex flex-wrap justify-center glassin p-5 items-center'>
    <label htmlFor="fileInput"><i className="fa fa-camera cursor-pointer hover:opacity-[0.6] text-[#ff1e00ef] text-[50px]"></i>
      <input
       className='w-[100%] hidden bg-white border-b-2 p-3 m-2 flex justify-center items-center'
       id='fileInput' 
       type="file"
        accept="image/png, image/jpg, image/gif, image/jpeg"
        onChange={(e)=>setFile(e.target.files[0])}/>
      </label>
      <input 
      className='w-[100%] bg-white text-lg text-center text-[#706f6f] border-b-2 p-3 m-2 flex justify-center items-center'
       type="text" value={name} onChange={(e)=>setName(e.target.value)} />
      <input 
      className='w-[100%] border-b-2 text-lg text-center text-[#706f6f]  bg-white p-3 m-2 flex justify-center items-center'
       type="text" value={desc}  onChange={(e)=>setDesc(e.target.value)}/>
      <div className='w-[100%] flex justify-around items-center '>
       <input
        className='w-[100px] border-b-2 text-lg text-center text-[#706f6f] bg-white p-3 m-2 flex justify-center items-center'
         type="text" value={quantity}  onChange={(e)=>setQuantity(e.target.value)}/>
       <input
        className='w-[100px] border-b-2 text-lg text-center text-[#706f6f] bg-white p-3 m-2 flex justify-center items-center'
         type="text" value={capacity}  onChange={(e)=>setCapacity(e.target.value)}/>
      <input
      className='w-[100px] border-b-2 text-lg text-center text-[#706f6f] bg-white p-3 m-2 flex justify-center items-center'
       type="number" value={price}  onChange={(e)=>setPrice(e.target.value)}/>
      </div>
      <input       className='w-[100%] text-lg text-center text-[#706f6f] border-b-2 bg-white p-3 m-2 flex justify-center items-center'
        type="text" value={category}  onChange={(e)=>setCategory(e.target.value.split(","))}/>
     
   
     <button 
      className='bg-gradient-to-r hover:opacity-[0.41] flex  justify-center m-5 items-center opacity-[.7] from-[#ad0101] to-[#ff0000] via-[#dd0505] roboto text-white text-[900] rounded-md text-lg  round-md h-[50px] flex w-[80%]' 
      onClick={handleUpdate}>Update</button> <div className='w-[100%] flex justify-center items-center m-4  text-[#ff5e00]'> <input className="m-5" type="checkbox" />Update your product</div> 
 </div>
 </div>
  )
}

export default UpdateItem
