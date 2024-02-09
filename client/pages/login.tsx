import React, { useState } from 'react'
import { useRouter } from 'next/router'

function login() {
    const router = useRouter()
    const [token,setToken] = useState("");
    const[formData,setFormData] = useState({
        email:"",
        password:"",
    });

    const handleChange = (e:any) =>{
        setFormData({...formData,[e.target.name] : e.target.value})
    }

    const submitHandler = async (e:any) =>{
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:8000/api/login',{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)            
            })

            if(!res.ok){
                throw new Error('Failed to sign up');
            }
            const data = await res.json()
            console.log("Login data",data);
            localStorage.setItem('token', data.token);
            setToken(data.token)

            if(data.token){
                console.log("Entered");
                router.push('/generate')
            }
    
            
        } catch (error:any) {
            console.error('Error logging: ', error.message);
        }
    }

  return (
    <div>
        <form onSubmit={submitHandler}>
            <input type="text" placeholder='email' onChange={handleChange} name='email' />
            <input type="password" placeholder='password' onChange={handleChange} name='password' />
            <button type='submit'>Submit</button>
        </form>
    </div>
  )
}

export default login