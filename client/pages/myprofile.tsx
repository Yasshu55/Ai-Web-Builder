import React, { useEffect, useState } from 'react';

interface UserCode {
    prompt: string;
    htmlCode: string;
    cssCode: string;
    jsCode: string;
}

function MyProfile() {
    const [userName, setUserName] = useState<string>("");
    const [userCodes, setUserCodes] = useState<UserCode[]>([]);
    const [selectedCode, setSelectedCode] = useState<UserCode | null>(null);
    const [isShown,setIsShown] = useState(false);

    useEffect(() => {
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

    const handleCodeClick = (code: UserCode) => {
        setSelectedCode(code);
        setIsShown(!isShown)
    };

    return (
        <div>
            <h1>My Profile</h1>
            <h3>Username: {userName}</h3>
            <div>
                {userCodes.map((code, index) => (
                    <div key={index} className="code-card" onClick={() => handleCodeClick(code)}>
                        <h4>{code.prompt}</h4>
                    </div>
                ))}
            </div>
            {selectedCode && isShown && (
                <div>
                    <h2>Selected Code</h2>
                    <div style={{ display: 'flex' }}>
                        <div style={{ flex: 1 }}>
                            <h3>HTML Code</h3>
                            <textarea
                                value={selectedCode.htmlCode}
                                rows={10}
                                style={{ width: '100%', minHeight: '200px' }}
                                readOnly
                            ></textarea>
                        </div>
                        <div style={{ flex: 1 }}>
                            <h3>CSS Code</h3>
                            <textarea
                                value={selectedCode.cssCode}
                                rows={10}
                                style={{ width: '100%', minHeight: '200px' }}
                                readOnly
                            ></textarea>
                        </div>
                        <div style={{ flex: 1 }}>
                            <h3>JS Code</h3>
                            <textarea
                                value={selectedCode.jsCode}
                                rows={10}
                                style={{ width: '100%', minHeight: '200px' }}
                                readOnly
                            ></textarea>
                        </div>
                    </div>
                    <div>
                        <h2>Live Preview</h2>
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
                            style={{ width: '100%', height: '500px', border: '1px solid #ccc' }}
                        ></iframe>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MyProfile;
