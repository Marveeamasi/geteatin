import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react"

const RegisterAdmin = () => {
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
    const res = await axios.post('/auth/Register',{
      username,
      email,
      password,
      isAdmin:true,
    });
    console.log(res.data)
    res.data && navigate('/')
  }
  
  
    return (
      
      <div className="flex justify-center items-center h-[100vh] bg-no-repeat bg-center bg-cover bg-[#000000cf] bg-blend-darken bg-[url(https://hbr.org/resources/images/article_assets/2007/01/OCT15_01_200024490-001.jpg)]  w-full">
         <div className="square text-white textshh flex fixed top-[0]  justify-center items-center">getEating</div>
         <div className= 'w-[500px] border flex flex-wrap justify-center glassin p-5 items-center'>
        {notMatch && <div className='w-[100%] border border-[#00000075] animate-pulse rounded-md p-2 flex justify-center items-center m-4  text-[#000000]'>Password doesn't match!!!</div> }
        {match && <div></div> }
        <input className='w-[100%] bg-white border-b-2 p-3 m-2 flex justify-center items-center' type="text" placeholder='Username..' onChange={e=>setUsername(e.target.value)}/>
        <input className='w-[100%] bg-white border-b-2 p-3 m-2 flex justify-center items-center' type="email" placeholder='Email..' onChange={e=>setEmail(e.target.value)} />
        <input className='w-[100%] border-b-2 bg-white p-3 m-2 flex justify-center items-center' type="password" placeholder='Password..' onChange={e=>setPassword(e.target.value)}/>
        <input className='w-[100%] border-b-2 bg-white p-3 m-2 flex justify-center items-center' type="password" placeholder='Comfirm password..' onChange={e=>setComPassword(e.target.value)}/>
        <button className='bg-gradient-to-r hover:opacity-[0.41] flex  w-[100px] justify-center m-5 items-center opacity-[.7] from-[#818181] to-[#383838] via-[#000000] roboto text-white text-[900] rounded-md text-lg round-md flex p-3' onClick={handleSubmit}>Register</button>
        <Link to={`/`} className='border-[#000000] cursor-pointer border-2 w-[100px] hover:opacity-[0.41] roboto text-[#000000] text-[900] justify-center items-center rounded-md text-lg round-md flex p-3'>Not new</Link>
        <div className='w-[100%] flex justify-center items-center m-4  text-[#000000]'> <input className="m-5" type="checkbox" />Before signup you must agree to our terms and conditions</div> 
      </div>
      </div>
    )
  }
  
  export default RegisterAdmin