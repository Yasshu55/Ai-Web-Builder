"use client"

import React, { useEffect, useState } from 'react'
import Preview from './Preview'
import {extractCode, updatePreview} from './utils/helper';
import { Editor } from 'primereact/editor';

        

function GenerateCode() {
    
    const[codes,setCodes] = useState({
        html: "",
        css: "",
        js: ""
    });
    
    const[isGenerated,setIsGenerated] = useState(false);
    const[inputData,setInputData] = useState("");
    const[previewContent,setPreviewContent] = useState('');

    const htmlHandler = (event: React.ChangeEvent<HTMLDivElement>) => {
        setCodes((prev) =>({
            ...prev,
            html: event.target.innerText
        }))
    }

    const cssHandler = (event: React.ChangeEvent<HTMLDivElement>) => {
        setCodes((prev) =>({
            ...prev,
            css: event.target.innerText // or event.target.textContent
        }))
    }

    const jsHandler = (event: React.ChangeEvent<HTMLDivElement>) => {
        setCodes((prev) =>({
            ...prev,
            js: event.target.innerText // or event.target.textContent
        }))
    }
 

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

            if (!res.ok) {
                throw new Error(`Something went wrong in code generation: ${res.status}`);
            }

            const data = await res.json();
            console.log(data);
            console.log("data.textCode : ", data.textCode);

            // Extract HTML code
            const html = extractCode(data.textCode, '---starthtml---', '---endhtml---');

            //Extract css code
            const css = extractCode(data.textCode, '---startcss---', '---endcss---');

            //Extract JS code
            const js = extractCode(data.textCode, '---startjs---', '---endjs---');

            setCodes({html,css,js})
            updatePreview({html,css,js});

            setIsGenerated(true);
            
            // if(data.htmlCode && data.cssCode){
            //     generateCodeSandBox(data.htmlCode,data.cssCode);
            // }
        } catch (error) {
            console.log("Error fetching the data at code generation : ",error);
        }
    }

    const updatePreview = (codes: any) =>{
        const newContent = `<html>
        <head>
        <title>Ai-Builder Generation</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>${codes.css}</style>
        </head>
        <body>${codes.html}</body>
        <script>${codes.js}</script>
        </html>` //write content in iFrame with the extracted code from message

        console.log("NewContent in updatePreview: ",newContent);
        

        setPreviewContent(newContent);
    }

    // const generateCodeSandBox = async (htmlCode:any,cssCode:any) =>{
    //     try {
    //         const linesCountHTML = htmlCode.split('\n').length;
    //         const linesCountCSS = cssCode.split('\n').length;
    //         const res = await fetch('https://codesandbox.io/api/v1/sandboxes/define?json=1',{
    //             method: 'POST',
    //             headers : {
    //                 'Content-Type' : 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 files:{
    //                     'sandbox.html': {
    //                         content: htmlCode,
    //                       },
    //                     'sandbox.css': {
    //                         content: cssCode,
    //                       },
    //                 },
    //                 query: {
    //                     codemirror: 1,
    //                     highlights: Array.from({ length: linesCountHTML + linesCountCSS }, (_, index) => index + 1).join(','),
    //                   },
    //             }),
    //         })

    //         if(!res.ok){
    //             throw new Error(`HTTP Error at generateCodeSandBox function :  ${res.status}`)
    //         }

    //         const data = await res.json();
    //         console.log("Response data from codesandbox: ",data);
    //         const previewUrl = `https://codesandbox.io/embed/${data.sandbox_id}?codemirror=1&highlights=${Array.from({ length: linesCountHTML + linesCountCSS }, (_, index) => index + 1).join(',')}`;
    //         console.log("Live preview url: ",previewUrl);
            
            
    //         setLivePreviewUrl(previewUrl);
    //     } catch (error) {
    //         console.log();
            
    //     }
    // }
  

    return (
        <div>
            <h1>Generate Website</h1>

            <textarea name="input"  value={inputData} cols={30} rows={10} onChange = {(e) => setInputData(e.target.value)}></textarea>
            <button onClick={generateCode}>Generate</button>

            {isGenerated && 
                <div>
                    <div>

                    <h1>Generated Code</h1>
                    <h2>HTML Code</h2>
                     <textarea name="htmlCode" id="" cols={30} rows={10} value={codes.html}>{codes.html}</textarea> 
                     {/* <Editor value={codes.html} 
                     onChange={htmlHandler}
                     style={{ height: '320px', }} 
                    /> */}

                    <h2>CSS Code</h2>
                    <textarea name="cssCode" id="" cols={30} rows={10} value={codes.css}></textarea> 
                    {/* <Editor value={codes.css} 
                     onChange={cssHandler}
                     style={{ height: '320px' }} 
                    /> */}

                    <h2>JS Code</h2>
                    <textarea name="jsCode" id="" cols={30} rows={10} value={codes.js}></textarea> 
                    {/* <Editor value={codes.js} 
                     onChange={jsHandler}
                     style={{ height: '320px' }} 
                    /> */}
                            
                    </div>
                        <div>
                        <Preview previewContent={previewContent}/>
                        </div>
                </div>
            }
        </div>
    );
}

export default GenerateCode;

