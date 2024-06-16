import React, { useState, useEffect } from 'react';
import { Container, PostForm } from '../components';
import Loader from './Spin/Loader';

function AddPost() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timer); // Cleanup the timer on component unmount
    }, []);

    return (
        <div className='py-8'>
            <Container>
                {!loading ? (
                    <PostForm />
                ) : (
                    <div className='flex justify-center items-center h-80'>
                        <Loader /> {/* You can replace Loader with a Skeleton Loader */}
                    </div>
                )}
            </Container>
        </div>
    );
}

export default AddPost;
