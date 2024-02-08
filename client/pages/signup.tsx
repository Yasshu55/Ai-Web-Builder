import React, { useState } from 'react'

const signup = () => {

    const [formData,setFormData] = useState({
        userName:"",
        email:"",
        password:"",
    });

    const handleChange = (e:any) =>{
        setFormData({...formData,[e.target.name] : e.target.value})
    }

    const handleSubmit = async (e: any) =>{
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:8000/api/signup',{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if(!res.ok)
            {
                throw new Error('Failed to sign up');
            }

            const data = await res.json();
            console.log(data);            
        } catch (error:any) {
            console.error('Error signing up:', error.message);
        }
    }

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input type="text" name="userName" placeholder='Username' onChange={handleChange} />
            <input type="text" name="email" placeholder='Email' onChange={handleChange} />
            <input type="password" name="password" placeholder='password' onChange={handleChange} />
            <button type='submit'>Submit</button>
        </form>
    </div>
  )
}

export default signup