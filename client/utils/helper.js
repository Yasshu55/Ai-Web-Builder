const extractCode = (code, startTag, endTag) => {
    const startIndex = code.indexOf(startTag);
    const endIndex = code.indexOf(endTag);

    if (startIndex === -1 || endIndex === -1) {
        throw new Error(`Start or end tag not found: ${startTag}, ${endTag}`);
    }

    const extractedCode = code.slice(startIndex + startTag.length, endIndex).trim();
    console.log("extracted code: ", extractedCode);
    return extractedCode;
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