import React, { useState } from 'react'
import { Container, PostForm } from '../components'
import Spinner from './Spinner';
import { useEffect } from 'react';

function AddPost() {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => {
          setLoading(false);
      }, 2000); 

      return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, []);

  return !loading ? (
    <div className='py-8'>
        <Container>
            <PostForm />
        </Container>
    </div>
    
  ) : <Spinner />
}

export default AddPost