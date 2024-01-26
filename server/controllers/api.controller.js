const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });

const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = process.env.API_KEY;

if (!apiKey) {
  console.error("API key is missing. Make sure to set it in the .env file.");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

async function ApiController(input) {
 try {
   console.log("recieved input : "+input);

   const model = genAI.getGenerativeModel({ model: "gemini-pro"});

   
   const prompt = "Write code. descriptive sections,  for the images add from https://source.unsplash.com/featured/?{$input} and images max size should fix to webpage size and should not exceed Give me only HTMl code and no CSS code in single <!DOCTYPE html> page linking to a css file with styles.css for this input and Wrap html code with ---starthtml--- ---endhtml--- " + input;
   const htmlResult = await model.generateContent(prompt);
   const htmlResponse = await htmlResult.response;
   const htmlText = htmlResponse.text();

   
   const cssPrompt = "Write csscode  good design for every class and tag,vibrant colors, " + htmlText;
   const cssResult = await model.generateContent(cssPrompt);
   const cssResponse = await cssResult.response;
   const cssText = cssResponse.text();

   console.log("HTML Text : ",htmlText);
   console.log("CSS Text : ",cssText);

   const text = {
      htmlText,
      cssText
   }
   console.log("text : ",text);
   
   return text;

 } catch (error) {
  console.log("Error at Api controller - ",error);
 }
}

module.exports = ApiController;