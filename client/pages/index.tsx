import React, { useEffect, useState } from 'react'
import GenerateCode from './app/components/generate-code'

function index() {
  // useEffect(() =>{
  //   fetch('http://localhost:8000/api/home').then(
  //     res => res.json()
  //   ).then(
  //     data =>{
  //       console.log(data)
  //       setMessage(data.message)
  //     }
  //   )
  // },[])

  const [message, setMessage] = useState('Loading...')
  
  return (
    <div>
      <h1>Welcome to Ai-Web Builder</h1>
      <GenerateCode />
    </div>
  )
}

export default index