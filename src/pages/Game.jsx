import axios from 'axios'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import BuysMenu from '../components/BuysMenu'
import ChatCont from '../components/ChatCont'
import Empty from '../components/Empty'
import Footer from '../components/Footer'
import Menubar from '../components/Menubar'
import Navbar from '../components/Navbar'
import { Context } from '../context/Context'
import app from '../firebase'
import shortname from "../shortname"
import ErrorDiv from './ErrorDiv'

const Game = () => {
    const {user, dispatch} = useContext(Context);
    const[file, setFile] = useState(null)
    const[q, setQ] = useState('');
    const[notFound, setNotFound] = useState(false);
    const [noRes, setNoRes] = useState(false);
    const [item, setItem] = useState({});
    const[price,setPrice] = useState(0);
    const[quantity, setQuantity] = useState("");
    const[loading, setLoading]=useState(false);
    const[isFilled, setIsFilled] = useState(false);
    const[found, setFound] = useState(false);
    const[toNext, setToNext] = useState(false)
    const[product, setProduct] = useState({});
    const[text, setText] = useState('')
    const[filee, setFilee] = useState(null)
    const[audio, setAudio] = useState(null)
    const[aud, setAud] = useState(null)
    const[chats, setChats] = useState([])
    const [permission, setPermission] = useState(false);
    const [stream, setStream] = useState(null);
    const mediaRecorder = useRef(null);
    const [recordingStatus, setRecordingStatus] = useState("inactive");
    const [audioChunks, setAudioChunks] = useState([]);
    const [hide, setHide] = useState(false)
    const [removing, setRemoving] = useState(false)
    const mimeType = "audio/webm";
    var itemm;
    var blogg;
    const [place, setPlace] = useState(false)
    const[clicked, setClicked] = useState(false)


    useEffect(()=>{
      const getChats = async()=>{
         const res = await axios.get(`/gamechats`)
         setChats(res.data)
      }
      getChats()
      
      },[chats])


    const comment = ()=>{
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
               blogg = {text,img:downloadURL,userId:user._id,username:user.username,userLocation:user.address,userPics:user.brandPicture}
           show();
             });
           }
         );
         const show = async()=>{
           const res = await axios.post('/gamechats',blogg)
           console.log(res.data)
           setFile(null)
           setText("");
          }
         }else if(audio){
             const audioName = new Date().getTime() + audio.name;
             const storage = getStorage(app);
           
             const storageRef = ref(storage, audioName);
             const uploadTask = uploadBytesResumable(storageRef, audio);
             
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
                   blogg = {audio:downloadURL,userId:user._id,username:user.username,userLocation:user.address,userPics:user.brandPicture}
                   console.log(downloadURL)
               show();
                 });
               } 
             );
             const show = async()=>{
               const res = await axios.post('/gamechats',blogg)
               console.log(res.data)
               setAudio(null)
              }
               
             
             }else{
               const post = async()=>{
                 if(text){
                   setPlace(false)
                 const res = await axios.post('/gamechats',{text,userId:user._id,username:user.username,userLocation:user.address,userPics:user.brandPicture})
                 console.log(res.data)}else{
                  setPlace(true)
                 }
               
                }
   
                post() 
               
               };
         
             
     }



const handleAudio = async() =>{
  setHide(true)
  if ("MediaRecorder" in window) {
    try {
        const streamData = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: false,
        });
        setPermission(true);
        setStream(streamData);
        console.log(streamData)
    } catch (err) {
        alert(err.message);
    }
} else {
    alert("The MediaRecorder API is not supported in your browser.");
}
};

const startRecording = async () => {
  setRecordingStatus("recording");
  //create new Media recorder instance using the stream
  const media = new MediaRecorder(stream, { type: mimeType });
  //set the MediaRecorder instance to the mediaRecorder ref
  mediaRecorder.current = media;
  //invokes the start method to start the recording process
  mediaRecorder.current.start();
  let localAudioChunks = [];
  mediaRecorder.current.ondataavailable = (event) => {
     if (typeof event.data === "undefined") return;
     if (event.data.size === 0) return;
     localAudioChunks.push(event.data);
  };
  setAudioChunks(localAudioChunks);
};

const stopRecording = () => {
  setRecordingStatus("inactive");
  //stops the recording instance
  mediaRecorder.current.stop();
  mediaRecorder.current.onstop = () => {
    //creates a blob file from the audiochunks data
     const audioBlob = new Blob(audioChunks, { type: mimeType });
    //creates a playable URL from the blob file.
     const audioUrl = URL.createObjectURL(audioBlob);
     setAud(audioUrl);
     setAudioChunks([]);
  };
};


const select = ()=>{
setAud(null)
}

const remove = ()=>{
setRemoving(true)
setPermission(false)
setStream(null)
setAudioChunks([])
setHide(false)

}
       

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
     

const findProduct = async() => {
  setNoRes(true)
  setNotFound(false);
  setFound(false);
const res = await axios.get(`/items/?name=${q}`);
setItem(res.data[0]);
setNoRes(false)
res.data.length ===0 && setNotFound(true);
res.data.length ===1 && setFound(true);

}

useEffect(()=>{
 const getProduct = async()=>{
const res = await axios.get(`/items/${user.choosenProductId}`);
setProduct(res.data)
 }
 getProduct()
},[user])

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
          userId:user._id,
      screenshot:downloadURL,
      choosenProductId:item._id,
      choosenProductPrice:price,
      choosenProductName:item.name,
      gameParticipant:true,
        }
    show();
 
      });
    }
  );
  const show = async() => {
    try{
      const res = await axios.put('/users/'+user._id, itemm)
      console.log(res)
      dispatch({type: "UPDATE_SUCCESS", payload: res.data })
      setLoading(false)
setToNext(true)
    }catch(err){
      dispatch({type: "UPDATE_FAILURE"})
      }

   }
    
  
  };

  const handleClicked = () => {
    setClicked(!clicked)
 }

  return (
    <>
    <Navbar/>
    <Menubar/>
    {user && <BuysMenu/>}
{!user.gameParticipant && <div>
    <div className='flex flex-col justify-center items-center text-center'>
    <div className=" boxsh rounded-full  flex justify-around items-center w-[700px] sm:h-[50px] sm:mt-10  sm:w-[300px] md:w-[400px] h-[70px] m-5 ">
        <input className=" w-[80%] p-2 h-[80%] rounded-full" type="text" placeholder="Search for food..."  onChange={(e)=>setQ(e.target.value)}/>
        <i className={noRes? "fa fa-mug-hot text-[#ff1e009e] animate-spin text-2xl  cursor-pointer" : "fa fa-mug-hot text-[#ff1e009e] text-2xl  cursor-pointer"} onClick={findProduct}></i>
      </div>
       {notFound && <ErrorDiv/>}
    {found && 
    <div  className="w-[300px] group m-5 flex flex-col justify-center items-center relative rounded-lg boxsh">
         <div className="w-full h-[200px] flex justify-center items-center relative ">
           <img className="bg-cover  rounded-t-lg w-full h-[100%]" src={item.img} alt="items-pics" />
           <div className="w-full absolute rounded-lg bg-[#0000009e] top-[0] group-hover:opacity-[1] opacity-[0] h-[300px] "></div>
           </div>
         <div className="robot text-lg text-[#f8a203] m-5 font-[700]">{item.name}</div>
         <div className="absolute group-hover:opacity-[1] top-[30px] left-[10px] text-white opacity-[0]">{new Date(item.createdAt).toDateString()}</div>
        <div className="roboto text-[20px] glassmd  text-black animate-bounce rounded-md opacity-[0] group-hover:opacity-[1] p-1 absolute  m-5 font-[700]">{item.quantity} {item.capacity} : ${item.price}</div> 
         <div className="text-white absolute top-[10px] font-[500] left-[10px] group-hover:opacity-[1] opacity-0">{item.username}</div>
        <img className="bg-contain w-10 h-10  rounded-full absolute bottom-[10px] right-[10px]" src={item.userLogo} alt="brand-pics" />
       </div>}
    </div>
{found && <div className= 'w-[500px] border flex flex-wrap justify-center sm:w-[300px] glassin p-5 items-center'>
        <label htmlFor="fileInput"><i className="fa fa-camera cursor-pointer hover:opacity-[0.6] hover:animate-none animate-spin text-[#ff1e00ef] text-[50px]"></i>
      <input id={`fileInput`} className='w-[100%] bg-white border-b-2 hidden p-3 m-2 flex justify-center items-center' type="file" accept="image/png, image/jpg, image/gif, image/jpeg" onChange={(e)=> setFile(e.target.files[0])}/>
      </label>
      <input className='w-[100%] bg-white border-b-2 p-3 m-2 flex justify-center items-center' type="text" placeholder="You haven't put a quantity.." onChange={(e)=> setQuantity(e.target.value)} />
      <div className='w-[100%] bg-white border-b-2 p-3 m-2 flex justify-center items-center'>${price}</div>
     {file && <img src={URL.createObjectURL(file)} alt="screenshot"  className='w-full h-[300px] object-cover' />}
     {isFilled && <button className='bg-gradient-to-r hover:opacity-[0.41] flex  justify-center m-5 items-center opacity-[.7] from-[#ad0101] to-[#ff0000] via-[#dd0505] roboto text-white text-[900] rounded-md text-lg round-md flex p-3' onClick={sendMoney}>{loading? 'Sending...' : 'Send for verification'}</button>
    }  <div className='w-[100%] flex justify-center items-center m-4  text-[#ff0000]'> <input className="m-5" type="checkbox" />`Just pay ${price*0.1} and send a screenshot for verification`</div> 
    </div>}
</div>}

{user.gameParticipant &&
 <div className='w-full h-[70vh] flex  justify-center items-center text-center bg-[url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWBrQmLaEacNb6LNFPdwhyyC0YeBp_MJHnAg&usqp=CAU")] flex-col bg-no-repeat bg-cover bg-[#111111d5] bg-blend-darken'>
  <div  className="w-[300px] group m-5 flex flex-col justify-center items-center relative rounded-lg boxsh">
         <div className="w-full h-[200px] flex justify-center items-center relative ">
           <img className="bg-cover  rounded-t-lg w-full h-[100%]" src={product.img} alt="items-pics" />
           <div className={user.wonGame?"w-full absolute rounded-lg bg-[#000000e4] top-[0] opacity-[0] h-[300px] flex justify-center items-center text-center rubik font-bold text-white text-[50px]":"w-full absolute rounded-lg bg-[#000000e4] top-[0] opacity-[1] h-[300px] flex justify-center items-center text-center rubik font-bold text-white text-[50px]"}>232</div>
           </div>
         <div className="robot text-lg text-[#f8a203] m-5 font-[700]">{product.name}</div>
       </div>


       <div className="absolute left-[10px] top-[23vh]  border-2 border-[#fff] text-[20px] text-white robot font-bold rounded-lg p-2">{user.validForGame?`Valid player`:`You are not yet a player, please wait...`}</div>
<div className={user.wonGame?" absolute right-[20px] top-[23vh]  bg-[#ffa600] text-[20px] text-white rubik font-bold rounded-lg p-2":" absolute right-[20px] top-[23vh]  bg-[#ffa600a9] text-[20px] text-white rubik font-bold rounded-lg p-2"}>{user.wonGame? `You win`:`No wins yet`}</div>
{ clicked?
                      (<button onClick={handleClicked} className="w-[500px] absolute left-[10px] top-[70vh] robot md:w-[300px] hover:opacity-[0.5] text-2xl text-white font-bold h-[70px] bg-gradient-to-r rounded-2xl opacity-[.7] from-[#ad0101] to-[#ff0000] via-[#dd0505]">
                        Leave Chat
                        <i className="fa-sharp fa-solid fa-bell-concierge"></i>
                        </button> )
                        :
                        (<button onClick={handleClicked} className="w-[500px] absolute left-[10px] top-[70vh] robot md:w-[300px] hover:opacity-[0.5] text-2xl text-white font-bold h-[70px] bg-gradient-to-r rounded-2xl opacity-[.7] from-[#ad0101] to-[#ff0000] via-[#dd0505]">
                           View Item's Chat
                            <i className="fa-sharp fa-solid fa-comments"></i>
                            </button>)
          }   

</div> }
   
{clicked && (
               <div className="absolute  h-[300px] w-[500px] right-[20px] top-[50vh] glassin z-[60] ">
               <div className='relative w-full h-full flex flex-col justify-center overflow-y-scroll items-center px-[20px]'>
              {chats.map(c=>
                <ChatCont key={c._id} c={c} user={user}/>
                )}
           <div className=" boxsh rounded-full fixed bottom-[0] z-[20] flex justify-between items-center w-[400px] bg-white sm:h-[50px] sm:mt-10  sm:w-[350px] p-2  h-[50px] m-5 ">
        { !hide &&  <label  className="flex-[1] text-center" htmlFor="fileIn"><i className="fa fa-camera  cursor-pointer hover:opacity-[0.6]  text-[#4d4d4dee] "></i>
      <input
       className='w-[100%] hidden bg-white border-b-2 p-3 m-2 flex justify-center items-center'
       id='fileIn' 
       type="file"
       accept="image/png, image/jpg, image/gif, image/jpeg"
       onChange={(e)=>setFile(e.target.files[0])}/>
      </label>}


      <label 
       onClick={handleAudio} 
       className="flex-[1] text-center"
        htmlFor="audioInput">
        <i className={hide? "fa fa-microphone cursor-pointer hover:opacity-[0.6]  text-2xl animate-pulse text-center  text-[#ff1100c8]" : "fa fa-microphone cursor-pointer hover:opacity-[0.6]   text-[#4d4d4dee] "}></i>
      </label>
    {permission && recordingStatus === "inactive" ? (
    <button onClick={startRecording} className="border-2 rounded-md p-2 fixed z-[60] bottom-[80px] right-[20px]" type="button">
        Start Recording
    </button>
    ) : null}
    {recordingStatus === "recording" ? (
    <button onClick={stopRecording} className="border-2 rounded-md p-2 fixed z-[60] bottom-[80px] right-[20px]" type="button">
        Stop Recording
    </button>
    ) : null}

{aud ? (
  <div className="border-2 rounded-md p-2 fixed bottom-[80px] right-[20px]">
     <audio src={aud} controls></audio>
     <a onClick={select} className="text-[#ff3300] cursor-pointer" download href={aud}>
        Download Recording
     </a>
  
   </div>
) : null}
   <label  htmlFor="filee"><i className="fa fa-plus  cursor-pointer border-4 rounded-md p-2 fixed bottom-[80px] sm:right-[200px] right-[350px] hover:opacity-[0.6] m-2 text-[#4d4d4dee] "></i>
   <input
    className='w-[100%] hidden bg-white border-b-2 p-3 m-2 flex justify-center items-center'
    id='filee' 
    type="file"
    accept="audio/*"
    onChange={(e)=>setAudio(e.target.files[0])}/>
   </label>

 {audio && <audio src={URL.createObjectURL(audio)} controls  alt="voice note" className=' fixed bottom-[80px] z-[70] object-cover' /> } 
      {file && <img src={URL.createObjectURL(file)}   alt="chat pics" className='w-[200px] fixed bottom-[80px] right-[20px] rounded-md h-[200px] object-contain' /> } 
     {!hide && <input className=" flex-[1] p-2  border-b-4" type="text" placeholder={place? "You can't send nothing!" : "Say what you want..."} onChange={(e)=>setText(e.target.value)}/>
     }
    {hide && <i onClick={remove} className="fa-solid fa-trash text-[#ff1e009e] hover:animate-bounce hover:text-[#4b4b4b] flex-[1] text-[20px]  hover:text-[#ff1e0055] cursor-pointer "></i>
   }
      <i onClick={comment} className="fa-solid fa-paper-plane text-[#ff1e009e] flex-[1] text-[20px]  hover:text-[#ff1e0055] cursor-pointer "></i>
    </div>
    </div>
           </div>
            )}

    <Footer/>
    </>
  )
}

export default Game
