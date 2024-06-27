import React from 'react'
import Picture from '../assets/Picture.png'

function Logo({width}) {
  return (
    <div className='p-0'>
      <img 
        src={Picture} 
        style={{width}}
        alt="Blogzz" 
        className='p-0 w-24 sm:w-30 md:w-38 lg:w-40'
        height={40}
        width={40}
      />
    </div>
  )
}

export default Logo