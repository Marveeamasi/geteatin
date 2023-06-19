import axios from "axios"


const Itemcat = ({i}) => {
    const deleteI = async() => {
        await axios.delete(`/categories/${i._id}`)
       
    }

  return (
    <div onClick={deleteI}
      className="text-[#868686] hover:border-b-2 m-2 font-bold robot group " >
        {i.name} 
        <sup className=" group-hover:opacity-[1] rubik font-bold opacity-[0]">x</sup>
        </div> 
          
  )
}

export default Itemcat
