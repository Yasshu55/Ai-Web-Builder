import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

function index() {
  const router = useRouter()
  const [message, setMessage] = useState('Loading...')
  
  return (
    <div>
      <h1>Welcome to Ai-Web Builder</h1>
      <button onClick={() =>router.push('/login')}>Login</button>
      <button onClick={() =>router.push('/signup')}>SignUp</button>
    </div>
  )
}

export default index