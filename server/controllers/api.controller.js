const dotenv = require("dotenv");
dotenv.config();
const { GoogleGenerativeAI } = require("@google/generative-ai");


// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI('AIzaSyBkGV0U8BdNr94du8iBN9wnisFQa3m2qYc');

async function ApiController(input) {
 try {
   const model = genAI.getGenerativeModel({ model: "gemini-pro"});
   const prompt = "Give me HTMl code for " + input;
   const cssPrompt = "Give me CSS code for " + prompt;
   console.log("recieved input : "+prompt);
 
   const result = await model.generateContent(prompt);
   const response = await result.response;
   const text = response.text();
   console.log(text);
   
   return text;

 } catch (error) {
  console.log("Error at Api controller - ",error);
 }
}

module.exports = ApiController;