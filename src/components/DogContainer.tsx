import React from 'react'
import { useState, useEffect } from 'react'
import "./DogContainerStyle.css"
export default function DogContainer() {
     const [imageURL,setimageURL] = useState(null)
  const [count, setCount] = useState(0)
  const [dofetchdog, setDofetchdog] = useState(0)
  function fetchdogs() {
      fetch('https://dog.ceo/api/breeds/image/random')
    .then((response)=> response.json())
    .then((data)=>{
      setimageURL(data.message)
      
    })
  }

  
  useEffect(()=>{
   fetchdogs();
  }, [dofetchdog])
  return (
    <div className='dogcontainer'>
       < img  className='dogimage' src={imageURL} alt="" />
       <button  className= "dogbutton" onClick={() => setDofetchdog(prev => prev + 1)}>get a new dog</button>
    </div>
  )
}
