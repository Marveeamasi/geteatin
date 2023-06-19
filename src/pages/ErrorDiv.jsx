
const ErrorDiv = () => {
  return (<>
  
    <div class="flex justify-center items-center flex-col
     w-[100%]  bg-[url(https://images.pexels.com/photos/1789968/pexels-photo-1789968.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500)]
   bg-[#ff33008f] bg-contain  bg-blend-darken
   bg-position-center">
    <h1 className=' squareI font-[900] md:text-[70px] text-[150px] m-5 text-[#ffffff]'>oops</h1>
   <div className='flex justify-around items-center flex-wrap w-[100%]'><h2 className=' robot font-[800] text-[30px] md:text-[15px] m-5 text-center text-[#ffffff] '>NO RESULT FOUND</h2>
    <button className=' md:text-[15px] hover:animate-none hover:opacity-[0.4] opacity-[0.7] animate-bounce m-5 p-5 bg-[#ffffff] rounded-[15px] robot text-[30px] text-[#ff1100]'>Back To Home Page </button>
    </div> </div>

</>
  )
}

export default ErrorDiv
