
import React from 'react'
import appwriteService from "../appwrite/config"
import {Link} from 'react-router-dom'

function PostCard({$id, title, featuredImage}) {
    
return (
  <Link to={`/post/${$id}`}>
    <div className='w-full bg-gray-100 rounded-xl p-3'>
      <div className='w-full flex justify-center mb-4'>
        
        <div className='h-48 w-58 overflow-hidden'>
          <img 
            src={appwriteService.getFilePreview(featuredImage)} 
            alt={title}
            className='rounded-xl h-full w-full object-cover' 
          />
        </div>

      </div>

        <h2 className='text-xl font-bold'>
          {title}
        </h2>

    </div>
  </Link>
)
}


export default PostCard
