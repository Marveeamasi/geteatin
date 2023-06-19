import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react"

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [comPassword, setComPassword] = useState('');
  const [notMatch, setNotMatch] = useState(false);
  const [match, setMatch] = useState(false);
 

        useEffect(()=>{
          const valPass = ()=>{
            if(password!==comPassword){
              setNotMatch(true)
              setMatch(false)
            }else if(password===comPassword){
              setMatch(true)
              setNotMatch(false)
            }else{
              setMatch(false)
              setNotMatch(false)
            }
          }
          valPass();
        },[comPassword,password])
 
        const navigate = useNavigate();


  const handleSubmit = async()=>{
    const res = await axios.post('/auth/register',{
      username,
      email,
      password,
      isAdmin:false,
    });
    res.data && navigate('/')
  } 
  
  
    return (
      
      <div className="flex justify-center items-center h-[100vh] bg-no-repeat bg-center bg-cover bg-[#ffffffcf] bg-blend-lighten bg-[url(https://w0.peakpx.com/wallpaper/243/782/HD-wallpaper-no-dinner-yet-plate-glas-fork-knife.jpg)]  w-full">
         <div className="square text-white textshh flex fixed top-[0]  justify-center items-center">getEating</div>
         <div className= 'w-[500px] border flex flex-wrap justify-center glassin p-5 items-center'>
        {notMatch && <div className='w-[100%] border border-[#ff000075] animate-pulse rounded-md p-2 flex justify-center items-center m-4  text-[#ff0000]'>Password doesn't match!!!</div> }
        {match && <div></div> }
        <input className='w-[100%] bg-white border-b-2 p-3 m-2 flex justify-center items-center' type="text" placeholder='Username..' onChange={e=>setUsername(e.target.value)}/>
        <input className='w-[100%] bg-white border-b-2 p-3 m-2 flex justify-center items-center' type="email" placeholder='Email..' onChange={e=>setEmail(e.target.value)} />
        <input className='w-[100%] border-b-2 bg-white p-3 m-2 flex justify-center items-center' type="password" placeholder='Password..' onChange={e=>setPassword(e.target.value)}/>
        <input className='w-[100%] border-b-2 bg-white p-3 m-2 flex justify-center items-center' type="password" placeholder='Comfirm password..' onChange={e=>setComPassword(e.target.value)}/>
        <button className='bg-gradient-to-r hover:opacity-[0.41] flex  w-[100px] justify-center m-5 items-center opacity-[.7] from-[#ad0101] to-[#ff0000] via-[#dd0505] roboto text-white text-[900] rounded-md text-lg round-md flex p-3' onClick={handleSubmit}>Register</button>
        <Link to={`/`} className='border-[#ff3c00] cursor-pointer border-2 w-[100px] hover:opacity-[0.41] roboto text-[#ff3c00] text-[900] justify-center items-center rounded-md text-lg round-md flex p-3'>Not new</Link>
        <div className='w-[100%] flex justify-center items-center m-4  text-[#ff5e00]'> <input className="m-5" type="checkbox" />Before signup you must agree to our terms and conditions</div> 
      </div>
      </div>
    )
  }
  
  export default Register