"use client"
import { set } from 'mongoose';
import React, { useEffect, useState } from 'react'

function GenerateCode() {
    useEffect(() =>{

    },[])

    const[htmlCode,setHtmlCode] = useState("");
    const[cssCode,setCssCode] = useState("");
    const[isGenerated,setIsGenerated] = useState(false);
    const[inputData,setInputData] = useState("");

    const generateCode = async () => {
        const codeGenerateBackendUrl = "http://localhost:8000/api/generate";

        try {
            const res = await fetch(codeGenerateBackendUrl,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "input": inputData
                })
            })

            if(!res.ok){
                throw new Error("Something went wrong in code generation : ${res.status}"); 
            }

            const data = await res.json();
            
            console.log(data.htmlCode);
            console.log(data.cssCode);
            setHtmlCode(data.htmlCode);
            setCssCode(data.cssCode);
            setIsGenerated(true);
        } catch (error) {
            console.log("Error fetching the data at code generation : ",error);
            
        }
           
    }
    return (
        <div>
            <h1>Generate Website</h1>

            <textarea name="input"  value={inputData} cols={30} rows={10} onChange = {(e) => setInputData(e.target.value)}></textarea>
            <button onClick={generateCode}>Generate</button>

            {isGenerated && 
                <div>
                    <h1>Generated Code</h1>
                    <h2>HTML Code</h2>
                    <textarea name="htmlCode" id="" cols={30} rows={10}>{htmlCode}</textarea>
                    <h2>CSS Code</h2>
                    <textarea name="cssCode" id="" cols={30} rows={10} value={cssCode}>{cssCode}</textarea>
                </div>
            }
        </div>
    );
}

export default GenerateCode;

