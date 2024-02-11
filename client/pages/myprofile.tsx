import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'

interface UserCode {
    _id: string,
    prompt: string;
    htmlCode: string;
    cssCode: string;
    jsCode: string;
}

function MyProfile() {
    const router = useRouter()
    const [userName, setUserName] = useState<string>("");
    const [userCodes, setUserCodes] = useState<UserCode[]>([]);
    const [selectedCode, setSelectedCode] = useState<UserCode | null>(null);
    const [isShown,setIsShown] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(!token){
          router.push('/login')
        }
        fetchData();
    }, []);


    const fetchData = async () => {
        try {
            const res = await fetch('http://localhost:8000/api/myprofile', {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })

            if (!res.ok) {
                throw new Error('Failed to fetch user profile');
            }
            const data = await res.json();

            setUserName(data.userName);
            setUserCodes(data.userCodes);
        } catch (error:any) {
            console.error('Error fetching user profile:', error.message);
        }
    }
    
    const deleteCode = async (codeId : any) =>{
       try {
        const res = await fetch(`http://localhost:8000/api/delete/${codeId}`,{
            method : "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })

        if(!res.ok){
            throw new Error("Failed to delete code")
        }
        fetchData();
       } catch (error) {
        console.error('Error deleting code:', error);
       }
    }

    const handleCodeClick = (code: UserCode) => {
        setSelectedCode(code);
        setIsShown(!isShown)
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4 text-purple-800">My Profile</h1>
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Username: {userName}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    {userCodes.map((code, index) => (
        <div key={index} className="relative">
            <div className="bg-purple-200 rounded-lg p-4 cursor-pointer hover:bg-purple-300 transition duration-300" onClick={() => handleCodeClick(code)}>
                <h4 className="text-lg font-semibold text-purple-800">{code.prompt}</h4>
            </div>
            <button
                onClick={() => deleteCode(code._id)}
                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-md text-sm"
            >
                Delete
            </button>
        </div>
    ))}
</div>

            
            {selectedCode && isShown && (
                <div className="mt-8">
                    <h2 className="text-2xl font-bold mb-4 text-green-800">Selected Code</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <h3 className="text-lg font-semibold mb-2 text-green-800">HTML Code</h3>
                            <textarea
                                value={selectedCode.htmlCode}
                                rows={10}
                                className="w-full px-4 py-2 bg-green-100 rounded-lg"
                                readOnly
                            ></textarea>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-2 text-green-800">CSS Code</h3>
                            <textarea
                                value={selectedCode.cssCode}
                                rows={10}
                                className="w-full px-4 py-2 bg-green-100 rounded-lg"
                                readOnly
                            ></textarea>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-2 text-green-800">JS Code</h3>
                            <textarea
                                value={selectedCode.jsCode}
                                rows={10}
                                className="w-full px-4 py-2 bg-green-100 rounded-lg"
                                readOnly
                            ></textarea>
                        </div>
                    </div>
                    <div className="mt-8">
                        <h2 className="text-2xl font-bold mb-4 text-blue-800">Live Preview</h2>
                        <iframe
                            title="Preview"
                            srcDoc={`
                                <html>
                                <head>
                                    <style>${selectedCode.cssCode}</style>
                                </head>
                                <body>
                                    ${selectedCode.htmlCode}
                                    <script>${selectedCode.jsCode}</script>
                                </body>
                                </html>
                            `}
                            className="w-full h-96 border border-blue-300"
                        ></iframe>
                    </div>
                </div>
            )}
        </div>
    );
}


export default MyProfile;
