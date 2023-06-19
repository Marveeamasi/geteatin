import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BuysMenu from "../components/BuysMenu";
import Empty from "../components/Empty";
import Footer from "../components/Footer"
import Menubar from "../components/Menubar"
import Navbar from "../components/Navbar"
import { Context } from "../context/Context";
import Delgirl from "../images/deliverygirl.png";
import Deltp from "../images/deliverytp.jpg";
import Foodtruck from "../images/foodtruck.jpg";
import Healthfood from "../images/healthyfood.jpg";
import Homeserve from "../images/homeservice.jpeg";
import Hungrynerd from "../images/hungrynerd.jpg";
import Money from "../images/makemoney.png";
import Pizza from "../images/pizza.jpg";
import Snack from "../images/snack.jpg";
import Snacks from "../images/snacks2.png";
import Gameinfo from "../components/Gameinfo";
import Gamepopupinfo from "../components/Gamepopupinfo";





const Home = () => {

const [cats, setCats] = useState([]);
const [noRes, setNoRes] = useState(false)
const {user} = useContext(Context)
const [isClicked, setIsClicked] = useState(false)
const [cartoonImg, setCartoonImg] = useState(Foodtruck)
const [cartoonText, setCartoonText] = useState('We give a variety of goodies from talented chefs');
const[infoA, setInfoA] = useState([]);
useEffect(()=>{
  setNoRes(true)
  const getCats = async()=>{
  const res = await axios.get('/categories');
   setCats(res.data)
  setNoRes(false)
  console.log(res)
  }
  getCats()
},[])

useEffect(()=>{
  const getInfo = async()=>{
     const res = await axios.get('/gamechats/timer');
     setInfoA(res.data)
     console.log(res.data)
  }
  getInfo()
 },[])
 
 
 const hide = ()=>{
  setIsClicked(true);
 }

useEffect(()=>{
  const changeSrc = (str) => {
    setCartoonImg(str)
   }
   const changeText = (txt) => { 
    setCartoonText(txt)
   }

   const changeCartoonImg = () =>{

       setInterval(function(){
        changeSrc(Money);
        changeText('Start to earn money by showcasing your goodies')
       },5000)
    
       setInterval(function(){
        changeSrc(Pizza);
        changeText('Play our fun game and win more than expected')
       },10000)
    
       setInterval(function(){
        changeSrc(Delgirl);
        changeText('Make use of our safebuy services for more security')
       },15000)
    
       setInterval(function(){
        changeSrc(Hungrynerd);
        changeText('Search food by categories and get something to eat')
       },20000)
    
       setInterval(function(){
        changeSrc(Snacks);
        changeText('Get updates and learn something new from our blog page')
       },25000)
    
       setInterval(function(){
        changeSrc(Deltp);
        changeText('We ensure the goodies get to you as the buyer with safebuy')
       },30000)
    
       setInterval(function(){
        changeSrc(Homeserve);
        changeText('With safebuy, both buyer and seller need not to worry about trust')
       },35000)
    
       setInterval(function(){
        changeSrc(Snack);
        changeText('Get eating now!')
       },40000)
    
    };
    changeCartoonImg();
   
},[])


  return (
    
   <>
   <Navbar/> 
   <Menubar />

  {infoA.map(ina=> 
  <Gamepopupinfo key={ina._id} ina={ina} isClicked={isClicked} hide={hide}/>
   )}
  {user && <BuysMenu/>}
    <div className="scroll-smooth w-[100vw] p-2 h-[100%] mb-10">
    <div className="w-[100%] h-[100%] flex flex-col justify-center items-center ">
    <div className="rubik text-[80px] sm:mt-10 sm:text-[50px]  text-center font-[900] text-[#ff8800]">WHAT'S GOOD!!</div>
    <div className="relative w-[70%] flex-wrap sm:flex-wrap-reverse   text-center flex justify-center items-center">
      <div className="text-[30px] font-bold w-[500px] sm:w-[200px] rubik text-[#838383] sm:text-center sm:text-[20px] text-left  ">{cartoonText}</div>
      <img className="w-[200px] h-[200px] bg-contain  " src={cartoonImg} alt="hero images" />
    </div>
    <a href="#cat" className="bg-[#ff8800] roboto text-white text-[900] rounded-[7px] hover:animate-bounce hover:opacity-[0.41] text-lg round-md flex justify-between m-5 items-center p-5 ">Choose Categories</a>
  </div>
  {!noRes ? <div id="cat" className=" w-[100%] scroll-smooth mt-10 h-[100%] flex flex-wrap justify-center items-center ">
  {cats.map(c=>(
      <Link to={`/items/?cat=${c.name}`} key={c._id} className='group m-[1px]  w-[350px] relative h-[350px]  flex justify-center items-center'>
        <img className="w-[350px] h-[350px] object-cover" src={c.img} alt="pics" />
        <div className="w-[350px] group-hover:animate-pulse z-2 h-[350px] bg-[#000000a9] absolute"></div>
        <p className="roboto absolute text-white text-2xl text-[900] ">{c.name}</p>
     </Link>
   ))} 
     <Link to={`/items`} className="w-[350px] hover:animate-pulse  h-[350px] bg-contain bg-[#0000006a] bg-blend-darken flex justify-around items-center bg-center   bg-no-repeat ">
        <p className="roboto text-white text-2xl text-[900] ">More..</p>
     </Link>
     
     
  </div> : <Empty/>}
  </div>
  <Footer/>
    </>
  )
} 

export default Home