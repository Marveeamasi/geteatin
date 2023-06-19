import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import GameParticipants from '../components/GameParticipants'
import ValidGameParticipants from '../components/ValidGameParticipants'
import Winners from '../components/Winners'

const AdminGame = () => {
  const[one, setOne] = useState(false)
  const[two, setTwo] = useState(false)
  const[three, setThree] = useState(false)
  const[partc, setPartc] = useState([])
  const[val, setVal] = useState([])
  const[win, setWin] = useState([])

  useEffect(()=>{
    const fetchParticipants = async() => {
      const res = await axios.get(`/users/?isPlaying=${true}`)
      setPartc(res.data)
    }
    fetchParticipants()
  },[])

  useEffect(()=>{
    const fetchValids = async() => {
      const res = await axios.get(`/users/?validPlayer=${true}`)
      setVal(res.data)
    }
    fetchValids()
  },[])

  useEffect(()=>{
    const fetchWinner = async() => {
      const res = await axios.get(`/users/?isWinner=${true}`)
      setWin(res.data)
    }
    fetchWinner()
  },[])

  const doOne = () => {
  setOne(!one);
  setTwo(false);
  setThree(false);
  };

  const doTwo = () => {
    setOne(false);
    setTwo(!two);
    setThree(false);
    };

    const doThree = () => {
      setOne(false);
      setTwo(false);
      setThree(!three);
      };

  return (
    <div className='flex flex-col  justify-center items-center  '>
    <div className='flex justify-center items-center '>
    <Link to="/timer" className='roboto p-2 rounded-md m-5 bg-white text-[#ff2600ed] hover:text-white hover:bg-[#ff2600ed] border-2 border-[#ff2600ed] text-white'>Set Timer</Link>
    
    <button onClick={doOne} className={one? 'roboto p-5 rounded-md m-5 bg-[#ff2600ed] text-white' : 'roboto p-5 rounded-md m-5 text-[#ff2600ed]'}>Game Participant</button>
      <button onClick={doTwo} className={two? 'roboto p-5 rounded-md m-5 bg-[#ff2600ed] text-white' : 'roboto p-5 rounded-md m-5 text-[#ff2600ed]'}>valid For Game</button>
      <button onClick={doThree} className={three? 'roboto p-5 rounded-md m-5 bg-[#ff2600ed] text-white' : 'roboto p-5 rounded-md m-5 text-[#ff2600ed]'}>Winner</button>
 
      </div> 
      {one &&<GameParticipants p={partc}/>}
       {two && <ValidGameParticipants v={val}/>}
      {three && <Winners w={win}/>}
    </div>
  )
}

export default AdminGame
