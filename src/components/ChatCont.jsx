import React from 'react'
import { Link } from 'react-router-dom'

const ChatCont = ({c, user}) => {
  return (
    <div className={c.userId === user._id ? "flex flex-col my-[20px] self-end bg-[#ff99009e] rounded-md boxsh p-2  m-5 " : 'flex flex-col self-start my-[20px] rounded-md boxsh p-2  m-5 '}>
        <div className='flex justify-between items-center '>
            <img src={c.userPics} className='w-6 h-6 rounded-full object-cover' alt="userImg" />
            <Link to={`/account/${c.userId}`} className={c.userId === user._id ? "text-white" : "text-[#ff99009e]"}>{c.username}</Link>
        </div>
        <div className='text-white'>{c.createdAt}</div>
       {c.text && <div className="text-[#050505dd]">{c.text}</div>}
        {c.img && <img src={c.img} className='w-[300px] h-[300px] rounded-md object-cover' alt="visual note" />}
        {c.audio && <audio src={c.audio} className='glasss bg-[#00000073000]' controls  alt="voice note" />}
    </div>
  )
}

export default ChatCont
