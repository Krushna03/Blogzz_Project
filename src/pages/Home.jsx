import React, { useCallback, useEffect, useState } from 'react';
import appwriteService from "../appwrite/config";
import { Container, PostCard } from '../components';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Spinner from './Spin/Spinner';
import CarouselComponent from '../components/CarouselComponent';
import BlogLanding from '../assets/BlogLanding.png'

function Home() {
    const [posts, setPosts] = useState([]);
    const authStatus = useSelector(state => state.auth.status);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const loadPosts = useCallback(async () => {
        const posts = await appwriteService.getPosts([]);
        if (posts) {
            setPosts(posts.documents.slice(0, 12));
        }
        setLoading(true);
    }, []);

    useEffect(() => {
        loadPosts();
    }, [loadPosts]);

 
    if (authStatus === false) {
        return (
            <div className="w-full py-16 mt-4 text-center bg-gradient-to-r from-black to-gray-800">
    <Container>
        <div className="flex flex-wrap justify-center items-center">
            <div className="w-full lg:w-1/2 p-8">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                    Welcome to Our Blog Platform
                </h1>
                <p className="text-lg md:text-2xl text-gray-300 mb-8">
                    Discover a world of fascinating articles, insights, and stories from our diverse community of writers. Join us today to start reading, sharing, and creating amazing content.
                </p>
                <div className="flex flex-col sm:flex-row justify-center items-center">
                    <Link to="/login">
                        <button className="px-4 py-2 md:px-6 md:py-3 bg-white text-black rounded-full font-semibold hover:bg-gray-200 mb-2 sm:mb-0">
                            Login to Explore
                        </button>
                    </Link>
                    <Link to="/signup" className="sm:ml-4">
                        <button className="px-4 py-2 md:px-6 md:py-3 bg-white text-black rounded-full font-semibold hover:bg-gray-200">
                            Sign Up Now
                        </button>
                    </Link>
                </div>
            </div>
            <div className="w-full lg:w-1/2 p-8">
                <img src={BlogLanding} alt="Blogging" className="rounded-lg shadow-2xl w-full" />
            </div>
        </div>
    </Container>
</div>

        );
    }


    return !loading || posts ? (
        <div className="w-full py-8">
            <div className="py-4">
                <CarouselComponent {...posts} />
            </div>

            <div className="pt-10 pb-5 mx-auto w-full md:w-1/4 text-center">
                <p className="text-xl h-[7vh] p-2 rounded-lg bg-black text-white font-mono">
                    Latest Post
                </p>
            </div>

            <Container>
                <div className="flex flex-wrap">
                    {posts.map((post) => (
                        <div key={post.$id} className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
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
    ) : <Spinner />;
}

export default Home;
