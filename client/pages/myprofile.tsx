import React, { useEffect, useState } from 'react'

function myprofile() {
    const [userName,setUserName] = useState("");
    useEffect(() =>{
        fetchUsername();
    },[])
    
    const fetchUsername = async () =>{
        try {
            const res = await fetch('http://localhost:8000/api/myprofile',{
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })

            if(!res.ok){
                throw new Error('Failed to fetch username');
            }
            const data = await res.json();
            
            setUserName(data.userName);
            console.log("Entered and username is : ",data.userName);
            console.log("usercodes: ", data.userCodes);
            
        } catch (error:any) {
            console.error('Error fetching username:', error.message);
            // router.push('/login');
        }
    }

  return (
    <div>
        <h1>My Profile</h1>
        <h3>UserName : {userName}</h3>
    </div>
  )
}

export default myprofile