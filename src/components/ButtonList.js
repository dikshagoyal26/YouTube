import React from 'react'
import Button from './Button'

const ButtonList = () => {
  return (
    <div className='flex'>
      {
        ["All", "Gaming", "Songs", "Live", "Cricket", "News", "Soccer"].map((name, index)=> <Button name={name} key={index}/>)
      }
    </div>
  )
}

export default ButtonList