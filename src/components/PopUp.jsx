import { useContext } from "react"
import { Link } from "react-router-dom"
import { Context } from '../context/Context'

const PopUp = ({isOn, s, b}) => {



  const {user} = useContext(Context)

    return (
      <div className={isOn? "flex flex-col  justify-center z-45 bottom-[0] right-[0]  items-center fixed" : "hidden"}>
     <Link to={`/safes/${user?._id}`} className="relative group flex justify-center items-center fixed  bottom-[100px] right-[40px] mx-5"  >
          <li  className="text-[#ff3300] p-2 border-2 bg-[#fff] z-[60] list-none roboto hidden group-hover:flex   absolute transition-c group-hover:translate-x-5" >Buys</li>
          <i class="fa-solid fa-cart-shopping text-[#ff3300] text-[50px] ">
            </i> <sup className="p-2 border-2 text-[#ff3300]">{b.length}</sup>
            </Link>
            <Link to={`/buys/${user?._id}`} className="relative group fixed bottom-[50px] right-[150px] flex justify-center items-center mx-5"  >
          <li  className="text-[#ff3c00] border-2 bg-[#fff] p-2 z-[60] list-none roboto hidden group-hover:flex   absolute transition-c group-hover:translate-x-5" >Sells</li>
          <i class="fa-solid fa-shop text-[#ff3300] text-[50px] ">
            </i> <sup className="p-2 border-2 text-[#ff3300]">{s.length}</sup>
            </Link>     
   </div>
   
    )
  }
  
  export default PopUp