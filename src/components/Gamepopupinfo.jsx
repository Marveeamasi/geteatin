import React from 'react'

function Gamepopupinfo({ina, isClicked, hide}) {
  return (
    <div className={isClicked?"hidden" : "bg-gradient-to-r from-[#ad0101] to-[#ff0000] via-[#dd0505] text-white sm:w-[200px] sm:h-[200px] roboto w-[500px] h-[200px] fixed top-[50%] z-[75]  left-[50%] sm:mt-[-100px]  sm:ml-[-100px] rounded-md flex flex-col justify-center text-center items-center p-5 mt-[-100px] ml-[-250px]"}>
    <div className="m-2">
     {ina.info}
    </div>
    <button onClick={hide} className={" hover:border-2 m-2 p-2 bg-white text-[#ff8800] hover:bg-[#ff8800] hover:text-white "}>Noted</button>
    </div>
  )
}

export default Gamepopupinfo
