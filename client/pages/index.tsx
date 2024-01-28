import React, { useEffect, useState } from 'react'
import GenerateCode from './app/components/generate-code'

function index() {
  const [message, setMessage] = useState('Loading...')
  
  return (
    <div>
      <h1>Welcome to Ai-Web Builder</h1>
      <GenerateCode />
    </div>
  )
}

export default index