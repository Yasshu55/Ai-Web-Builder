import React, { useEffect, useState } from 'react'

function index() {
  useEffect(() =>{
    fetch('http://localhost:8000/api/home').then(
      res => res.json()
    ).then(
      data =>{
        console.log(data)
        setMessage(data.message)
      }
    )
  },[])

  const [message, setMessage] = useState('Loading...')
  
  return (
    <div>{message}</div>
  )
}

export default index