import React from 'react'
import Picture from '../assets/Picture.png'

function Logo({width}) {
  return (
    <div className='p-0'>
      <img src={Picture} alt="Blogzz" style={{width}} className='p-0'/>
    </div>
  )
}

export default Logo