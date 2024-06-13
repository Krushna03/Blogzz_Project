import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import service from '../../appwrite/config'
import Input from '../Input'

function SearchBar({authStatus}) {
    const [query, setQuery] = useState('')
    const [recommendations, setRecommendation] = useState([])
    const navigate = useNavigate()
    const [error, setError] = useState('')

    useEffect(() => {
       if(query.length > 1) {
        const fetchRecommendation = async () => {
        try {
          const result = await service.searchPosts(query)
          if (result.documents.length === 0) {
              setError('No blog titles found.')
              setRecommendation([])
          } else {
              setRecommendation(result.documents)
              setError('')
          }
      } catch (err) {
          setError('An error occurred while searching.')
          setRecommendation([])
        }
     }

      fetchRecommendation()
    } 
    else 
    {
      setRecommendation([])
      setError('')
    }
    }, [query])


    const handleSearchChange = (e) => {
      e.preventDefault()
      setQuery(e.target.value);
    };


    const handleRecommendationClick = ($id) => {
      navigate(`/post/${$id}`);
      setQuery('');
      setRecommendation([]);
      setError('')
    };


   return (
      <div className='relative w-[95%]'>
      {authStatus && (
        <Input
          type='text'
          className='text-m duration-200 hover:bg-blue-100 rounded-full text-zinc-950 pr-40 w-[120%] '
          placeholder='Search for the Blog'
          value={query}
          onChange={handleSearchChange}
        />
      )}

        {error && (
            <div className="absolute bg-white border border-gray-200 rounded-lg shadow-lg mt-2 w-full z-10 p-4 text-red-500">
                {error}
            </div>
        )}

      {recommendations.length > 0 && (
        <ul className="absolute bg-white border border-gray-200 rounded-lg shadow-lg mt-2 w-full z-10">
          {recommendations.map((item) => (
            <li
              key={item.$id}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleRecommendationClick(item.$id)}
            >
              {item.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar
