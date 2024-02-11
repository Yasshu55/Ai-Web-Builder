const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });

const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = process.env.API_KEY;

if (!apiKey) {
  console.error("API key is missing. Make sure to set it in the .env file.");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// this function generates the HTML,CSS and JS code for the given prompt
async function ApiController(input) {
 try {
   console.log("recieved input : "+input);

   const model = genAI.getGenerativeModel({ model: "gemini-pro"});

   
   const prompt =  "Generate code with full functionality, descriptive sections, make it look visually appealing. Use vibrant colors. For the images, add 'https://source.unsplash.com/featured/?{prompt here}' to the 'src' attribute and fix the images width height accordingly. Provide HTML code without 'html', 'body', 'head', and 'script' tags. Wrap the HTML code with /---starthtml--- and ---endhtml---. Enclose the CSS code with /---startcss--- and ---endcss---. Include the JavaScript code between /---startjs--- and ---endjs---. Ensure the order is HTML first, followed by CSS, and then JavaScript. Output each code segment separately to allow extraction between the specified tags." + input
   const result = await model.generateContent(prompt);
   const response = await result.response;
   const textCode = await response.text();

   console.log("textCode : ",textCode);
   
   return textCode;

 } catch (error) {
  console.log("Error at Api controller - ",error);
 }
}

module.exports = ApiController;