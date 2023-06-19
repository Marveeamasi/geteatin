import { Routes, Route } from "react-router-dom"
import Account from './pages/Account'
import Home from './pages/Home'
import Register from './pages/Register'
import Safebuy from './pages/Safebuy'
import Showcase from './pages/Showcase'
import Singlepost from './pages/Singlepost'
import Store from './pages/Store'
import ErrorDiv from './pages/ErrorDiv'
import Blog from "./pages/Blog"
import Singleblog from "./pages/Singleblog"
import Safebuys from "./pages/Safebuys"
import Safesells from "./pages/Safesells"
import { useContext } from "react"
import { Context } from "./context/Context"
import CreateBlog from "./components/CreateBlog"
import CreateCats from "./components/CreateCats"
import Eachsafebuys from "./components/Eachsafebuys"
import Eachusers from "./components/Eachusers"
import Eachposts from "./components/Eachposts"
import Adminbar from "./components/Adminbar"
import RegisterAdmin from "./pages/RegisterAdmin"
import Game from "./pages/Game"
import AdminGame from "./pages/AdminGame"
import Timer from "./pages/Timer"



const App = () => {
const {user} = useContext(Context)


  
  return (
    <div className="relative w-[100vw]">
    {user?.isAdmin &&  <Adminbar/> }
    <Routes>
        <Route path="/" exact element={ <Home/> } />
        <Route path="/items" element={ <Store/> } />
        <Route path="/register" element={ <Register/> } />
        <Route path="/account/:id" element={user? <Account/> : <Register/>} />
        <Route path="/items/:id" element={user ? <Singlepost/> : <Register/> } />
        <Route path="/safebuy/:id" element={user? <Safebuy/> : <Register/>} />
        <Route path="/showcase" element={user? <Showcase/> : <Register/>} />
        <Route path="/error" element={ <ErrorDiv/> } />
        <Route path="/blog" element={ <Blog/> } />
        <Route path="/blog/:id" element={ <Singleblog/> } />
        <Route path="/safes/:id" element={user ? <Safebuys/> : <Register/> } />
        <Route path="/buys/:id" element={user ? <Safesells/> : <Register/>} />
        <Route path="/vee120!!!" element={user?.isAdmin? <RegisterAdmin/> : <Home/>} />
        <Route path="/adminBlog" element={user?.isAdmin? <CreateBlog /> : <Home/>}/>
        <Route path="/adminCat" element={user?.isAdmin? <CreateCats /> : <Home/>}/>
        <Route path="/adminBuy" element={user?.isAdmin? <Eachsafebuys /> : <Home/>}/>
        <Route path="/adminUser" element={user?.isAdmin? <Eachusers /> : <Home/>}/>
        <Route path="/adminPost" element={user?.isAdmin? <Eachposts /> : <Home/>}/>
        <Route path="/game" element={ <Game />}/>
        <Route path="/admingame" element={user?.isAdmin? <AdminGame /> : <Home/>}/>
        <Route path="/timer" element={user?.isAdmin? <Timer /> : <Home/>}/>
        
      </Routes>
  </div>
   
  )
}

export default App