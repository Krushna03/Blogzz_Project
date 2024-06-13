// CarouselComponent.jsx
import React, { useEffect, useState } from 'react';
import { Carousel } from '@mantine/carousel';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import appwriteService from '../appwrite/config';
import {Link} from 'react-router-dom'
import Spinner from '../pages/Spinner';


const CarouselComponent = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getPosts().then((response) => {
      if (response) {
        setPosts(response.documents.slice(0, 10));
      }
    });
  }, []);

  return posts ?  (
    <Carousel className='bg-gray-900 p-2 rounded-2xl ml-14 mr-15'
      withIndicators
      loop
      nextControlIcon={<KeyboardArrowRight style={{fontSize: 50, backgroundColor: 'rgba(0, 0, 0, 0.6)', }} />}
      previousControlIcon={<KeyboardArrowLeft style={{ fontSize: 50, backgroundColor: 'rgba(0, 0, 0, 0.6)',}}/>}
      styles={{ control: {
          width: '10px',height: '88px', margin: '0 275px', transform: 'translateY(-90%)',
        },
      }}
    >
    
    {posts.map((post) => (
      <Carousel.Slide key={post.$id}>
        <div style={{ width: '100%', height: '490px', display: 'flex',  justifyContent: 'center', alignItems: 'center'}}>
        
        <Link to={`/post/${post.$id}`}>
          <img
            src={appwriteService.getFilePreview(post.featuredImage)}
            alt={post.title}
            style={{ width: '150%',height: '160%', objectFit: 'contain' }}
          />
        </Link>

          <h2 
            style={{position: 'absolute',bottom: 29,left: 320,right:320, color: 'white', paddingBottom: '0px',
              textAlign: 'center', fontSize: '25px', background: 'rgb(0,0,0,0.3)'
            }}
          >
            {post.title}
          </h2>

          <Link to={`/post/${post.$id}`}>
          <p style={{ position: 'absolute', bottom: 0, left: 320, right:320, color: 'white', opacity: '90%',padding: '0px',
              textAlign: 'center', fontSize: '19px', background: 'rgb(0,0,0,0.3)', 
              }}
            className='hover:text-sky-700'
              >
           See more
          </p>
          </Link>
        </div>
      </Carousel.Slide>
    ))}

  </Carousel>
  ) : <Spinner />
};

export default CarouselComponent;
