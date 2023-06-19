import axios from "axios"
import { useContext, useEffect, useState } from "react"
//import { useDispatch, useSelector } from "react-redux"
import { Link, useLocation } from "react-router-dom"
import Footer from "../components/Footer"
import Menubar from "../components/Menubar"
import Navbar from "../components/Navbar"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../firebase';
import { Context } from "../context/Context"
import Confirm from "../components/Confirm"

  

const Account = () => {
  const {user, dispatch} = useContext(Context)
  const [myPost, setMyPost] = useState([]);
  const [userr, setUserr] = useState({});
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [account, setAccount] = useState('');
  const [address, setAddress] = useState(''); 
  const [file, setFile] = useState(null)
  const[isFilled, setIsFilled] = useState(false);
 const location = useLocation()
  const path = location.pathname.split('/')[2]
  var [done, setDone] = useState(false)
  var [doner, setDoner] = useState(false)
  var updatedUser;
  var updatedUserWithImg;
  const [comPassword, setComPassword] = useState('');
const [loading, setLoading]=useState(false)
const[showConfirm, setShowConfirm]=useState(false)
 
useEffect(()=>{
  if(password!==comPassword){
    setIsFilled(false)
  }else if(password===comPassword){
    setIsFilled(true)
  }else{
   setIsFilled(false)
  }
},[comPassword,password])

useEffect(()=>{
if(!password || !comPassword){
  setIsFilled(false)
}else if(password && comPassword && password===comPassword){
setIsFilled(true)
}else{
  setIsFilled(false)
}
},[password])


useEffect(()=>{
  const getMyItems = async()=>{
    const respp = await axios.get(`/items/?user=${userr.username}`) 
   setMyPost(respp.data)
   console.log(respp.data)
  }
  getMyItems()
},[userr.username])
 
const updateUser = async () =>{
 
  dispatch({type: "UPDATE_START"})
  if(file){
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
          updatedUserWithImg = {userId:user._id,brandPicture:downloadURL,username,email,password,phone,address,account} ;
            // updateUserr(dispatch, updatedUserWithImg)
           show()
           setLoading(false)
        });
      })
    const show = async()=>{
      try{
        const res = await axios.put('/users/'+path, updatedUserWithImg)
        console.log(res)
        setDone(true);
        dispatch({type: "UPDATE_SUCCESS", payload: res.data })
        window.navigator.refresh(`/account/${path}`)
      }catch(err){
        dispatch({type: "UPDATE_FAILURE"})
        }
       } 

  }else{
    setLoading(true)
     try{updatedUser = {userId:user._id,username,email,password,phone,address,account}
  const rest = await axios.put('/users/'+path, updatedUser)
  console.log(rest.data)
  setDone(true); 
  dispatch({type: "UPDATE_SUCCESS", payload: rest.data })
  setLoading(false)
 window.navigator.refresh(`/account/${path}`)
}catch(err){
  dispatch({type: "UPDATE_FAILURE"})
}
 } 
 //updateUserr(dispatch, updatedUser)
 
}

const confirmDeleteUser = async() => {
  const ress = await axios.delete('/users/'+path, {data:{userId:user._id}})
  dispatch({type: 'LOGOUT'});
  setDoner(ress.data);
  window.location.replace('/')
}

const deleteUser = ()=>{
  setShowConfirm(!showConfirm)
}

const confirmMessage = "Are you sure about deleting this account ?";

useEffect(()=>{
  
  const getUser = async()=>{
    const res = await axios.get('/users/'+path)
    setUserr(res.data);
  setUsername(res.data.username)
  setEmail(res.data.email)
  setAccount(res.data.account)
  setAddress(res.data.address)
  setPhone(res.data.phone)
 
  }
  getUser()
  console.log('new user: '+userr)
},[path])

useEffect(()=>{
 const doSomething = async()=>{
  const rres = await axios.put('/items/'+path+'/many',{
    userId:userr._id,
    userLogo:userr.brandPicture,
    username:userr.username,
  })
  console.log(rres.data)
 }

 const doSomethingAgain = async()=>{
  const rress = await axios.put('/chats/'+path+'/many',{
    userId:userr._id,
    userPics:userr.brandPicture,
    username:userr.username,
    userLocation:userr.address,
  })
  console.log(rress.data)
 }

 doSomething()
 doSomethingAgain()
},[userr,path])



const es = 's';

  return (
    <>
      <Navbar/>
      <Menubar/>
      {showConfirm && <Confirm handling={confirmDeleteUser} toggle={deleteUser} message={confirmMessage}/>}
      {user._id !== path ?
     ( <div className="flex justify-center w-full flex-col items-center">

      <div className="w-full sm:h-[20vh] h-[40vh] flex justify-center items-center relative ">
            <img className="object-cover w-full  h-[100%]" src={userr.brandPicture} alt="items-pics" />
           <div className="absolute w-full h-[100%] bg-[#00000092]">
           <img className="object-cover  w-[300px] absolute roundd  h-[300px]" src={userr.brandPicture} alt="items-pics" />
           </div>

           </div>
          
             
            <div className="w-[100%]  flex md:flex-col justify-between items-center">
             <div className=" flex flex-col border justify-center m-5 items-center rounded-lg p-5  flex-[1]">

            <div className="self-start robot text-[#5e5d5d]">Username <i className="fa fa-user"></i> </div>
             <div className='w-[100%] bg-white border-2 rounded-md p-3 m-2 '>{userr.username}</div>
             <div className="self-start robot text-[#5e5d5d]">Email <i className="fa fa-envelope"></i> </div>
      <div className='w-[100%] border-2 rounded-md bg-white p-3 m-2  '>{userr.email}</div>
     

          </div> 
            
               <div className=" border flex flex-col justify-center m-5 rounded-lg p-5 items-center  flex-[1]">
               <div className="self-start robot text-[#5e5d5d]">Phone/whatsapp <i className="fab fa-whatsapp-square"></i> </div>
             <div className='w-[100%] bg-white border-2 rounded-md p-3 m-2 '>{userr.phone || `No number yet`}</div>
             <div className="self-start robot text-[#5e5d5d]">Bank details <i className="fa fa-bank"></i> </div>
      <div className='w-[100%] border-2 rounded-md bg-white p-3 m-2 '>{userr.account || `No account yet`}</div>
     <div className="self-start robot text-[#5e5d5d]">Full address/location <i className="fa fa-map"></i></div>
      <div className='w-[100%] border-2 rounded-md bg-white p-3 m-2 '>{userr.address || `Location is unknown`}</div>
     
              
           </div>
           
            
            </div>
             <button className='bg-gradient-to-r hover:opacity-[0.41] flex justify-center m-5 items-center opacity-[.7] from-[#ad0101] to-[#ff0000] via-[#dd0505] roboto text-white  rounded-md text-lg  round-md h-[50px] flex w-[80%]'  onClick={updateUser}>Update</button>
    
              </div>)

     : (
<>
      <button onClick={deleteUser} className="flex  items-center justify-center float-right w-[200px] relative h-[50px] group border-2 border-[#ff0000] m-2 p-2 text-center rounded-lg bg-[#fff]"><div className="group-hover:opacity-[0] text-[#ff0000]">Delete Account</div> <i className="fa-solid fa-trash absolute opacity-[0] group-hover:opacity-[1] text-[#ff0000]"></i></button>
     
     <div className="flex justify-center w-full flex-col items-center">
      {done && 
      
     

      <div className="w-[100vw] h-[100vh] bg-[#000000d5] flex justify-center items-center absolute z-[111]"><div className="p-5 border-2 text-center rounded-2xl rubik text-2xl font-bold text-[#ff8800] ">account has been Updated successfully</div></div>}
   {doner && 
      
     

      <div className="w-[100vw] h-[100vh] bg-[#000000d5] flex justify-center items-center absolute z-[111]"><div className="p-5 border-2 text-center rounded-2xl rubik text-2xl font-bold text-[#ff8800] ">account has been Deleted successfully</div></div>}
   
      <div className="w-full sm:h-[20vh] h-[40vh] flex justify-center items-center relative ">
            <img className="object-cover w-full  h-[100%]" src={userr.brandPicture} alt="items-pics" />
           <div className="absolute w-full h-[100%] bg-[#0000004c]"></div>
    
              <label htmlFor="profilepic" className=" rounded-full w-[200px] h-[200px] absolute z-[20] top-[30px] bg-white flex justify-center group  items-center  lg:w-[150px] lg:h-[150px] left-[30px] md:w-[100px] md:h-[100px]">  
              <i className="fa fa-camera animate-ping absolute z-10  text-[50px] text-[#ff000057]"></i>
             {file && <img 
              className="object-contain z-[2]  rounded-full w-[200px] h-[200px] md:w-[100px]  lg:w-[150px] lg:h-[150px] group-hover:object-fill  md:h-[100px]"
                src={URL.createObjectURL(file)} alt="items-pics" />
            }     <input type="file" accept="image/png, image/jpg, image/gif, image/jpeg" className="hidden" id="profilepic" 
                 onChange={(e)=>setFile(e.target.files[0])}/>
                 </label>
                
                 
             
           
           </div>
          
             
            <div className="w-[100%]  flex md:flex-col justify-between items-center">
             <div className=" flex flex-col border justify-center m-5 items-center rounded-lg p-5  flex-[1]">

            <div className="self-start robot text-[#5e5d5d]">Username <i className="fa fa-user"></i> </div>
             <input
              className='w-[100%] bg-white border-2 rounded-md p-3 m-2 flex justify-center items-center'
               type="text" 
               value={username} 
               onChange={(e)=>setUsername(e.target.value)} />
             <div className="self-start robot text-[#5e5d5d]">Email <i className="fa fa-envelope"></i> </div>
      <input className='w-[100%] border-2 rounded-md bg-white p-3 m-2 flex justify-center items-center'
       type="email"
       value={email}
       onChange={(e)=>setEmail(e.target.value)} />
     <div className="self-start robot text-[#5e5d5d]">Password <i className="fa fa-key"></i></div>
      <input className='w-[100%] border-2 rounded-md bg-white p-3 m-2 flex justify-center items-center'
       type="password" 
       placeholder="Put in your password to update"
       onChange={(e)=>setPassword(e.target.value)} />
             <input className='w-[100%] border-b-2 bg-white p-3 m-2 flex justify-center items-center'
              type="password" placeholder='Comfirm password..' 
             onChange={e=>setComPassword(e.target.value)}/>

          </div> 
            
               <div className=" border flex flex-col justify-center m-5 rounded-lg p-5 items-center  flex-[1]">
               <div className="self-start robot text-[#5e5d5d]">Phone/whatsapp <i className="fab fa-whatsapp-square"></i> </div>
             <input className='w-[100%] bg-white border-2 rounded-md p-3 m-2 flex justify-center items-center'
              type="tel"
              value={phone}
               onChange={(e)=>setPhone(e.target.value)} />
             <div className="self-start robot text-[#5e5d5d]">Bank details <i className="fa fa-bank"></i> </div>
      <input className='w-[100%] border-2 rounded-md bg-white p-3 m-2 flex justify-center items-center'
       type="text"  
       value={account}
        onChange={(e)=>setAccount(e.target.value)}/>
     <div className="self-start robot text-[#5e5d5d]">Full address/location <i className="fa fa-map"></i></div>
      <input className='w-[100%] border-2 rounded-md bg-white p-3 m-2 flex justify-center items-center'
       type="text" 
       value={address}
        onChange={(e)=>setAddress(e.target.value)} />
    
              
           </div>
           
           
            </div>
            {isFilled &&
<button className='bg-gradient-to-r hover:opacity-[0.41] flex justify-center m-5 items-center opacity-[.7] from-[#ad0101] to-[#ff0000] via-[#dd0505] roboto text-white  rounded-md text-lg  round-md h-[50px] flex w-[80%]'  onClick={updateUser}>{loading?'Updating...':'Update'}</button>
}
              </div>
              </>)}


              <div className=" flex justify-center w-[100%] m-2 items-center flex-wrap">
                
       {myPost.map(p=>(
        <Link to={`/items/${p._id}`} key={p._id} className="w-[200px] h-[200px] group m-5 flex flex-col justify-center items-center relative rounded-md boxsh">
          <div className="w-full h-[200px] flex justify-center items-center relative ">
            <img className="bg-cover  rounded-t-lg w-full h-[150px]" src={p.img} alt="items-pics" />
            <div className="w-full absolute rounded-lg bg-[#0000009e] top-[0] group-hover:opacity-[1] opacity-[0] h-[200px] "></div>
            </div>
          <div className="roboto text-md text-[#f8a203] m-5 font-[700] text-center">{p.name} </div>
          <div className="absolute group-hover:opacity-[1] top-[35px] left-[10px] text-white opacity-[0]">{new Date(p.createdAt).toDateString()}</div>
          <div className="absolute group-hover:opacity-[1] top-[0] right-[10px] glasssm text-white opacity-[0]">{p.quantity} {p.capacity}{p.quantity>1 && es} : ${p.price}</div>
          <div className="w-10 h-10 flex justify-center text-2xl items-center  rounded-full absolute group-hover:opacity-[1] bottom-[10px] left-[10px] text-white opacity-[0]"><i  className="fa fa-fire text-2xl  text-[#ffffff]"></i> <sub className="text-[#ffffff]">{p.likes.length}</sub></div>
         <div className="roboto text-[15px] glassmd  text-black animate-bounce rounded-md opacity-[0] group-hover:opacity-[1] p-1 absolute  m-5 font-[700]">View</div> 
          <div className="text-white absolute top-[15px] font-[500] left-[10px] group-hover:opacity-[1] opacity-0">You</div>
          <img className="bg-contain w-10 h-10  rounded-full absolute group-hover:opacity-[1] bottom-[10px] right-[10px] text-white opacity-[0] " src={user.brandPicture} alt="brand-pics" />
        </Link>
       )) }
       
       
       </div>
       
      <Footer/>
    </>
  )
}

export default Account