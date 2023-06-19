import axios from "axios"


const Blogcat = ({b}) => {
    const deleteB = async() => {
        await axios.delete(`/categories/blog/${b._id}`)
       
    }

  return (
    <div onClick={deleteB}
      className="text-[#868686] hover:border-b-2 m-2 font-bold robot group " >
        {b.name} 
        <sup className=" group-hover:opacity-[1] rubik font-bold opacity-[0]">x</sup>
        </div> 
          
  )
}

export default Blogcat
