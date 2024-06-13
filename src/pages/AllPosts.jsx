
import React, {useState, useEffect} from 'react'
import { Container, PostCard } from '../components'
import appwriteService from "../appwrite/config";
import Spinner from './Spinner';
import { useCallback } from 'react';

function AllPosts() {
    const [posts, setPosts] = useState([])
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(true);

    // useEffect(() => {}, [])
    // appwriteService.getPosts([]).then((posts) => {
    //     if (posts) {
    //         setPosts(posts.documents)
    //     }
    //     setLoading(false)
    // })

     const loadPosts = async () => {
        setLoading(true);
        const limit = 10;
        const offset = page * limit;
        const posts = await appwriteService.getPosts([]);
          if (posts) {
            // setPosts(posts.documents)
            setPosts(prevPosts => [...prevPosts, ...posts.documents]);
          }
            // setHasMore(posts.documents);
            console.log(posts);
          
          setLoading(false)
         };
        

  useEffect(() => {
    loadPosts();
 }, [page])


    
  return  !loading || posts ? (
    <div className='w-full py-4'>

        <Container>
            <div className='flex flex-wrap p-1 '>
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-full sm:w-1/2 md:w-1/4'>
                        <PostCard {...post} />
                    </div>
                ))}
            </div>

            {posts && (
                <div className="text-center mt-4">
                    <button
                        onClick={() => setPage(prevPage => prevPage + 1)}
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                        disabled={loading}
                    >
                        {loading ? 'Loading...' : 'Load More'}
                    </button>
                </div>
                )}

            </Container>
       </div>
  ) : <Spinner />
}

export default AllPosts
