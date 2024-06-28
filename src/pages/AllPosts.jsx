import React, { useState, useEffect, useCallback } from 'react';
import { Container, PostCard } from '../components';
import appwriteService from "../appwrite/config";
import Loader from './Spin/Loader';

function AllPosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const AllPost = useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents);
            }
            setLoading(false);
        });
    }, []);


    useCallback(() =>{
        AllPost()
    }, [AllPost])


    return !loading ? (
        <div className='w-full py-4'>
            <Container>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    ) : (
        <Loader />
    );
}

export default AllPosts;