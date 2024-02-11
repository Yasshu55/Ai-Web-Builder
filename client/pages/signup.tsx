import React, { useState } from 'react'
import { useRouter } from 'next/router';

const Signup = () => {
    const router = useRouter();

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
            alert("Successfully account created! Now login and start Generating!")        
             router.push('/login')
        } catch (error:any) {
            console.error('Error signing up:', error.message);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
            <div className="bg-white shadow-md rounded-md p-8">
                <h2 className="text-3xl font-semibold text-center mb-6">Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input
                            type="text"
                            name="userName"
                            placeholder="Username"
                            className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-indigo-500"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            name="email"
                            placeholder="Email"
                            className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-indigo-500"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-indigo-500"
                            onChange={handleChange}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:bg-indigo-600 transition duration-300"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};


export default Signup