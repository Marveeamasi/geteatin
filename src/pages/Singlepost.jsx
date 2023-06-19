import axios from "axios"
import { useContext, useEffect, useRef, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import Footer from "../components/Footer"
import Menubar from "../components/Menubar"
import Navbar from "../components/Navbar"
import UpdateItem from "../components/UpdateItem"
import { Context } from "../context/Context"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../firebase"
import ChatCont from "../components/ChatCont"
import Confirm from "../components/Confirm"
import BuysMenu from "../components/BuysMenu"


 
const Singlepost = () => {
  
   const [liked, setLiked] = useState(false)
   const [disliked, setDisliked] = useState(false)
   const [item, setItem] = useState({});
   const [mode, setMode] = useState(false)
   const [done, setDone] = useState(null)
   const {user} = useContext(Context)
   const location = useLocation()
   const path = location.pathname.split('/')[2];
   const [likeVal, setLikeVal] = useState(0)
   const [dislikeVal, setDislikeVal] = useState(0)
   const [calc, setCalc] = useState(0)
   const[text, setText] = useState('')
   const[file, setFile] = useState(null)
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
   const [showConfirm, setShowConfirm] = useState(false)
  const [place, setPlace] = useState(false)
   var blogg;
    
/* CHAT FUNCTIONS BEGINS*/



useEffect(()=>{
const getChats = async()=>{
   const res = await axios.get(`/chats/?item=${path}`)
   setChats(res.data)
}
getChats()

},[chats])

useEffect(()=>{
  console.log(`audio:${audio}`)
},[audio])

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
            blogg = {text,img:downloadURL,userId:user._id,username:user.username,userLocation:user.address,userPics:user.brandPicture,productId:path}
        show();
          });
        }
      );
      const show = async()=>{
        const res = await axios.post('/chats',blogg)
        console.log(res.data)
        setFile(null)
        setText("");
       }
      }else if(aud){
        const postAudio = async()=>{
                blogg = {audio:aud,userId:user._id,username:user.username,userLocation:user.address,userPics:user.brandPicture,productId:path}
                console.log(aud)
            const res = await axios.post('/chats',blogg)
            console.log(res.data)
            setAudio(null)
        }
        postAudio();
          }else{
            const post = async()=>{
              if(text){
                setPlace(false)
              const res = await axios.post('/chats',{text,userId:user._id,username:user.username,userLocation:user.address,userPics:user.brandPicture,productId:path})
              console.log(res.data)}else{
               setPlace(true)
              }
            
             }

             post() 
            
            };
      
          
  }
      


/* CHAT FUNCTIONS END */

   useEffect(()=>{ 
      const fetchItem = async()=>{
      const res =  await axios.get('/items/'+path);
      setItem(res.data);
      if(res.data.likes.includes(user._id)){
         setLiked(true)
      }else if(res.data.dislikes.includes(user._id)){
         setDisliked(true)
      }else{
         setLiked(false)
         setDisliked(false)
      }
      setLikeVal(res.data.likes.length)
      setDislikeVal(res.data.dislikes.length)
      }
      fetchItem();
    
   },[path,item.likes,item.dislikes,user._id])
  
const [clicked, setClicked] = useState(false)

const handleClicked = () => {
   setClicked(!clicked)
}

const showUpdate = () =>{
setMode(!mode)
}

const deleteItem = async()=>{
  setShowConfirm(!showConfirm)
}



const confirmDeleteItem = async()=>{
  const ress = await axios.delete('/items/'+path, {data:{userId:user._id}})
  setDone(ress.data);
  window.location.replace('/')
  
}

const handleLikes = async() => {
  await axios.put(`/items/${path}/approve`,{userId:user._id})
 setLiked(!liked)
}

const handleDislikes = async() => {
   await axios.put(`/items/${path}/disapprove`,{userId:user._id})
   setDisliked(!disliked)
  }



useEffect(()=>{
 setCalc((((likeVal-dislikeVal)/100)*100)/2)
},[likeVal,dislikeVal])


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

useEffect(()=>{
  console.log('this is the audio url : ' + aud)
},[aud])

const select = ()=>{
setAud(null)
}

const remove = ()=>{
setRemoving(true)
setPermission(false)
setStream(null)
setAudioChunks([])
setHide(false)
setAud(null)
}

const confirmMessage = "Are you sure to delete this item ?";

  return (
    <>
    <Navbar/>
    <Menubar />
    <UpdateItem path={path} mode={mode} toggleMode={showUpdate}/>
    {showConfirm && <Confirm handling={confirmDeleteItem} show={showConfirm} message={confirmMessage} toggle={deleteItem}/>}
   {done &&  <div className="w-[100vw] h-[100vh] bg-[#ffffffd6] flex justify-center items-center absolute z-[111]"><div className="p-5 border-2 text-center rounded-2xl rubik text-2xl font-bold text-[#ff8800] ">Item has been DELETED successfully</div></div>}
     <div className="flex justify-center w-full flex-col items-center">
      <div className="w-full sm:h-[20vh] h-[40vh] flex justify-center items-center relative ">
            <img className="object-fill w-full  h-[100%]" src={item.img} alt="items-pics" />
            <div className="w-full absolute  bg-[#0000009e] top-[0]  h-[100%] "></div>
            <div className="rounded-full w-[410px] h-[410px] absolute z-[1] top-[30px] bg-white flex justify-center group hover:bg-transparent items-center  lg:w-[310px] lg:h-[310px] left-[30px] md:w-[210px] md:h-[210px]">
               <img className="object-cover z-[2]  rounded-full w-[400px] h-[400px] md:w-[200px]  lg:w-[300px] lg:h-[300px] group-hover:object-contain group-hover:rounded-sm  md:h-[200px]" src={item.img} alt="items-pics" /></div>
                     </div>
           <div className="flex  md:ml-[60%] justify-around items-center ">
           {liked && ( <><i  className="fa fa-fire text-[50px] cursor-pointer m-5 text-[#ff2b06]" onClick={handleLikes}></i>
     </> ) }   
      
      {disliked && (<>
         <i className="fa fa-fire-extinguisher text-[50px] cursor-pointer m-5 text-[#ff2b06]" onClick={handleDislikes}></i>
      </>)}

{!liked && !disliked && <><i className="fa fa-fire text-[50px] cursor-pointer m-5 text-[#727272]" onClick={handleLikes}></i> 
<i className="fa fa-fire-extinguisher text-[50px] cursor-pointer m-5 text-[#727272]" onClick={handleDislikes}></i>
</>}
      


         </div>
             {item.likes && <div className="text-[#00000093] font-[600] rubik text-[50px]">{calc}%</div>}
           {user._id === item.userId && <div className="flex justify-between w-[300px] items-center border-2 rounded-2xl p-2"><i className="fa-solid cursor-pointer fa-pen-to-square text-[#ff6600] text-2xl " onClick={showUpdate} ></i>  <i className="fa-solid fa-trash cursor-pointer text-[#ff0000] text-2xl" onClick={deleteItem}></i> </div>}
           <div className="w-[100%] flex md:flex-col justify-center items-center">
             <div className=" flex flex-col justify-center self-start items-center  flex-[1]">
                 <Link to={`/account/${item.userId}`} className="rubik m-5 text-[30px] cursor-pointer font-bold text-[#ff2a05cc]">{item.name}</Link>
                 <div className="robot p-10 flex text-center  justify-center items-center font-[200] text-[#312f2f] text-2xl">{item.desc}

                 </div>
                     { clicked?
                      (<button onClick={handleClicked} className="w-[500px] robot md:w-[300px] hover:opacity-[0.5] text-2xl text-white font-bold h-[70px] bg-gradient-to-r rounded-2xl opacity-[.7] from-[#ad0101] to-[#ff0000] via-[#dd0505]">
                        Leave Chat
                        <i className="fa-sharp fa-solid fa-bell-concierge"></i>
                        </button> )
                        :
                        (<button onClick={handleClicked} className="w-[500px] robot md:w-[300px] hover:opacity-[0.5] text-2xl text-white font-bold h-[70px] bg-gradient-to-r rounded-2xl opacity-[.7] from-[#ad0101] to-[#ff0000] via-[#dd0505]">
                           View Item's Chat
                            <i className="fa-sharp fa-solid fa-comments"></i>
                            </button>)
          }   
          <Link to={`/safebuy/${path}`} className=" robot p-5 my-10 cursor-pointer animate-bounce hover:opacity-[0.5] bg-[#000000cf] text-2xl text-white font-bold  rounded-2xl opacity-[.7] hover:animate-none ">safe buy <i className="fa fa-shield "></i> </Link>
  
          </div>
            {clicked && (
               <div className="relative px-[20px] flex flex-col justify-center items-center h-[500px] overflow-y-scroll  flex-[0.5]">
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
    {/* <a onClick={select} className="text-[#ff3300] cursor-pointer" href={aud}>
        Download Recording
     </a>*/}
  
   </div>
) : null}
   {/*<label  htmlFor="filee"><i className="fa fa-plus  cursor-pointer border-4 rounded-md p-2 fixed bottom-[80px] sm:right-[200px] right-[350px] hover:opacity-[0.6] m-2 text-[#4d4d4dee] "></i>
   <input
    className='w-[100%] hidden bg-white border-b-2 p-3 m-2 flex justify-center items-center'
    id='filee' 
    type="file"
    accept="audio/*"
    onChange={(e)=>setAudio(e.target.files[0])}/>
   </label>*/}

 {audio && <audio src={URL.createObjectURL(audio)} controls  alt="voice note" className=' fixed bottom-[80px] z-[70] object-cover' /> } 
      {file && <img src={URL.createObjectURL(file)}   alt="chat pics" className='w-[200px] fixed bottom-[80px] right-[20px] rounded-md h-[200px] object-contain' /> } 
     {!hide && <input className=" flex-[1] p-2  border-b-4" type="text" placeholder={place? "You can't send nothing!" : "Say what you want..."} onChange={(e)=>setText(e.target.value)}/>
     }
    {hide && <i onClick={remove} className="fa-solid fa-trash text-[#ff1e009e] hover:animate-bounce hover:text-[#4b4b4b] flex-[1] text-[20px]  hover:text-[#ff1e0055] cursor-pointer "></i>
   }
      <i onClick={comment} className="fa-solid fa-paper-plane text-[#ff1e009e] flex-[1] text-[20px]  hover:text-[#ff1e0055] cursor-pointer "></i>
    </div>
    
           </div>
            )}
             
            </div>
              </div>
    <Footer/>
    </>
  )
}

export default Singlepost