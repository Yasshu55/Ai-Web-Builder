import React from 'react'
import GenerateCode from './app/components/generate-code'
import { useRouter } from 'next/router'

function generate() {
  const router = useRouter()
  return (
    <div>
      <nav><button onClick={() =>router.push('/myprofile')}>My Profile</button></nav>
      <GenerateCode />
    </div>
  )
}

export default generate