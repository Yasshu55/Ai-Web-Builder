import React, { useEffect } from 'react'
import GenerateCode from './app/components/generate-code'
import { useRouter } from 'next/router'

function Generate() {
  const router = useRouter()
  
  useEffect(() =>{
    const token = localStorage.getItem('token');
    if(!token){
      router.push('/login')
    }
  },[router])

  return (
    <div>
      <nav style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', backgroundColor: '#F3F4F6', padding: '1rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1E40AF' }}>AI Web Builder</h1>
        <button
          onClick={() => router.push('/myprofile')}
          style={{ backgroundColor: '#1E40AF', color: 'white', padding: '0.5rem 1rem', borderRadius: '0.5rem', cursor: 'pointer', border: 'none' }}
        >
          My Profile
        </button>
      </nav>

      <GenerateCode />
    </div>
  );
}

export default Generate