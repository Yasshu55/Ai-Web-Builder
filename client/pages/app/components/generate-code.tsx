"use client"

import React, { useEffect, useState } from 'react'
import Preview from './Preview'
import {extractCode, updatePreview} from '../../../utils/helper';
import { Editor } from 'primereact/editor';

    
function GenerateCode() {
    
    // store the html,css,js code
    const[codes,setCodes] = useState({
        html: "",
        css: "",
        js: ""
    });
    
    const[isGenerated,setIsGenerated] = useState(false);
    const[inputData,setInputData] = useState("");
    const[previewContent,setPreviewContent] = useState('');
    const[isLoading,setIsLoading] = useState(false);

        const htmlHandler: React.ChangeEventHandler<HTMLTextAreaElement> = (event) => {
            setCodes((prev) => ({
            ...prev,
            html: event.target.value,
            }));
            console.log("entered htmlHandler");
            
            updatePreview(codes)
        };
      
        const cssHandler: React.ChangeEventHandler<HTMLTextAreaElement> = (event) => {
            setCodes((prev) => ({
            ...prev,
             css: event.target.value,
            }));
            
            updatePreview(codes)
        };
      
      const jsHandler: React.ChangeEventHandler<HTMLTextAreaElement> = (event) => {
        setCodes((prev) => ({
          ...prev,
          js: event.target.value,
        }));
        
        updatePreview(codes)
      };

      const saveHandler = async () =>{

            try {
                const res = await fetch("https://ai-web-builder.onrender.com/api/save",{
                    method:'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}` 
                    },
                    body: JSON.stringify({
                        prompt: inputData,
                        htmlCode:codes.html,
                        cssCode:codes.css,
                        jsCode:codes.js
                    })
                })
        
                if(!res.ok){
                    throw new Error("Failes to save")
                }
        
                const data = await res.json();
                console.log(data);
                alert("Saved successfully!")
            } catch (error:any) {
                console.log("Error at saving : ",error.message);
            }
      }
      
      
 

    const generateCode = async () => {
        setIsLoading(true);
        // const codeGenerateBackendUrl = "http://localhost:8000/api/generate";
         const codeGenerateBackendUrl = "https://ai-web-builder.onrender.com/api/generate";

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

            if (data && data.textCode == undefined) {
                alert("Oops! Inncorrect prompt try different prompts or the type of the website you want! :)")
            }

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
        }  finally{
            setIsLoading(false);
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
        <div className="flex w-full">
            <div className="w-1/2 p-6">
                <h1 className="text-2xl font-bold mb-4">Input Prompt</h1>
                <textarea
                    name="input"
                    value={inputData}
                    cols={30}
                    rows={5}
                    placeholder="Enter your input prompt here..."
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                    onChange={(e) => setInputData(e.target.value)}
                ></textarea>
                <button onClick={generateCode} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Generate</button>

                {isLoading && <p>Loading.....please wait for few seconds</p>}

                {isGenerated &&
                    <div className="mt-6">
                        <h1 className="text-2xl font-bold mb-4">Generated Code</h1>
                        <button onClick={saveHandler} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Save Changes</button>
                        <div className="mt-4">
                            <h2 className="text-xl font-semibold mb-2">HTML Code</h2>
                            <textarea
                                onChange={htmlHandler}
                                name="htmlCode"
                                id=""
                                cols={30}
                                rows={10}
                                value={codes.html}
                                className="w-full p-2 border border-gray-300 rounded mb-4"
                            ></textarea>

                            <h2 className="text-xl font-semibold mb-2">CSS Code</h2>
                            <textarea
                                onChange={cssHandler}
                                name="cssCode"
                                id=""
                                cols={30}
                                rows={10}
                                value={codes.css}
                                className="w-full p-2 border border-gray-300 rounded mb-4"
                            ></textarea>

                            <h2 className="text-xl font-semibold mb-2">JS Code</h2>
                            <textarea
                                onChange={jsHandler}
                                name="jsCode"
                                id=""
                                cols={30}
                                rows={10}
                                value={codes.js}
                                className="w-full p-2 border border-gray-300 rounded mb-4"
                            ></textarea>
                        </div>
                    </div>
                }
            </div>
            <div className="w-1/2">
                <h1 className="text-2xl font-bold text-center mb-4">Live Preview</h1>
                <Preview previewContent={previewContent} />
            </div>
        </div>
    );
}


export default GenerateCode;

