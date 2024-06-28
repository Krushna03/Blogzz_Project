import React, { useCallback, useEffect, useState } from 'react';
import { Carousel } from '@mantine/carousel';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import appwriteService from '../appwrite/config';
import { Link } from 'react-router-dom';
import Loader from '../pages/Spin/Loader';

const CarouselComponent = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const postSlides = useEffect(() => {
    appwriteService.getPosts().then((response) => {
      if (response) {
        setPosts(response.documents.slice(0, 10));
        setLoading(false);
      }
    });
  }, []);


  useCallback(() => {
     postSlides()
  }, [postSlides])



  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader /> {/* You can replace Spinner with a Skeleton Loader */}
      </div>
    );
  }

  return (
    <Carousel
      className="w-full"
      withIndicators
      loop
      nextControlIcon={<KeyboardArrowRight className="bg-opacity-40" style={{ fontSize: 40 }} />}
      previousControlIcon={<KeyboardArrowLeft className="bg-opacity-40" style={{ fontSize: 40 }} />}
      styles={{
        control: {
          width: '40px',
          height: '40px',
          margin: '0 8px', // Default margin for small devices
          transform: 'translateY(-80%)',
          '@media (min-width: 768px)': {
            margin: '0 16px', // Margin for medium and large devices
          },
        },
        controls: {
          display: 'flex',
          justifyContent: 'space-between',
          position: 'absolute',
          top: '50%',
          left: '15px', // Default left position for small devices
          right: '15px', // Default right position for small devices
          transform: 'translateY(-140%)',
          '@media (min-width: 768px)': {
            left: '100px', // Left position for medium and large devices
            right: '100px', // Right position for medium and large devices
          },
        },
      }}
    >
      {posts.map((post) => (
        <Carousel.Slide key={post.$id}>
          <div className="flex flex-col items-center w-full">
            <Link to={`/post/${post.$id}`} className="flex justify-center w-full">
              <img
                src={appwriteService.getFilePreview(post.featuredImage)}
                alt={post.title}
                className="object-cover w-3/4 border-4 border-black rounded-2xl max-h-[400px]"
              />
            </Link>

            <div className="relative w-3/4 flex flex-col items-center mt-1">
              <h2 className="text-lg md:text-2xl font-bold bg-black bg-opacity-30 text-black p-2 rounded-lg">
                {post.title}
              </h2>
              <Link to={`/post/${post.$id}`}>
                <p
                  className="text-base md:text-lg bg-black bg-opacity-30 text-black p-2 rounded-lg hover:text-blue-500 mt-1"
                >
                  See more
                </p>
              </Link>
            </div>
          </div>
        </Carousel.Slide>
      ))}
    </Carousel>
  );
};

export default CarouselComponent;
