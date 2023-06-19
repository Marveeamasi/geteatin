import React from 'react'
import Win from './Win'

const Winners = ({w}) => {
  return (
    <>
      {w.map(w=>
         <Win w={w}/>
        )}
    </>
  )
}

export default Winners
