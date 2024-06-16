import React, {useEffect, useState} from 'react'
import ClipLoader from "react-spinners/ClipLoader";

function Spinner() {
   const [loading, setLoading] = useState(true)
   
   // useEffect(() => {
   //    setLoading(true)
   // } , [])

   return (
      <div style={{marginTop: '55px' }}>
      <ClipLoader
      color={'#000000'}
      loading={loading}
      size={60}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
    </div>
   )
}

export default Spinner
