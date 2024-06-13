import React, {useCallback, useEffect, useState} from 'react'
import appwriteService from "../appwrite/config";
import {Container,  PostCard} from '../components'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import CarouselComponent from '../components/CarouselComponent';
import Spinner from './Spinner';

function Home() {
    const [posts, setPosts] = useState([])
    const authStatus = useSelector(state => state.auth.status)
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()


    const loadPosts = useCallback(async () => {
        // setLoading(true);
        const limit = 10;

        const posts = await appwriteService.getPosts([]);
          if (posts) {
             setPosts(posts.documents)
           }
           setLoading(true)
        }, []);


     useEffect(() => {
        loadPosts();
    }, [loadPosts])
  

    { 
     if( authStatus === false )
     return (
        <div className="w-full py-8 mt-4 text-center">
        <Container>
            <div className="flex flex-wrap">
                <div className="p-2 w-full">
                    <h1 className="text-2xl font-bold hover:text-gray-500">
                        Login to read posts
                    </h1>
                </div>
            </div>
        </Container>
    </div>
    )
    }
    
    return !loading || posts ? (

        <div className='w-full py-8'>
            
        <div className="w-full py-4">
            <Container>
            <CarouselComponent {...posts}/>
            </Container>
        </div>

      

         <div className='pt-14 pb-5 ml-10'>
            <p className=' text-xl w-[12%] h-[7vh] text-center  p-2 rounded-lg bg-black text-white font-mono hover:bg-slate-600'>
               Latest Post
            </p>  
         </div>

            <Container>
              <div className='flex flex-wrap'>
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard {...post} />
                    </div>
                ))}
              </div>

              <div className="text-center mt-4">
                    <button
                        onClick={() => navigate('/All-Posts')}
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        Load More
                    </button>
                </div>
                
            </Container>
        </div>
     )  : <Spinner />
  }

export default Home
