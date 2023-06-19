import React from 'react'
import ValidGmPrt from './ValidGmPrt'

const ValidGameParticipants = ({v}) => {
  return (
    <div className='w-full h-full p-2 flex flex-wrap justify-center items-center'>
     {v.map(v=>
      <ValidGmPrt v={v} key={v._id}/>
      )}
    </div>
  )
}

export default ValidGameParticipants
