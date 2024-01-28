const extractCode = (code,startTag,endTag) => {
    const startIndex = code.indexOf(startTag) + startTag.length;
    const endIndex = code.indexOf(endTag);
    console.log("extractedcode: ", code.slice(startIndex, endIndex).trim());
    return code.slice(startIndex, endIndex).trim();
};


// this function displays the visual represtentation of the generated code
const updatePreview = (code) =>{
    console.log("UpdatePReview function called!");
    const iframe = document.getElementById("preview")
    const iframeContent = iframe.contentDocument;
    iframeContent.open();
    iframeContent.write(
        `<html>
        <head>
        <title>Ai-Builder Generation</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>${code.css}</style>
        </head>
        <body>${code.html}</body>
        <script>${code.js}</script>
        </html>` //write content in iFrame with the extracted code from message
        );    
    iframeContent.close();
    console.log("UpdatePReview function successfuly finished!");
}


export {extractCode, updatePreview}