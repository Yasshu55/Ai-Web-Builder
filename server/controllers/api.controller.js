const dotenv = require("dotenv");
dotenv.config();
const { GoogleGenerativeAI } = require("@google/generative-ai");


// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI('AIzaSyBkGV0U8BdNr94du8iBN9wnisFQa3m2qYc');

async function ApiController(input) {
 try {
   console.log("recieved input : "+input);

   const model = genAI.getGenerativeModel({ model: "gemini-pro"});

   
   const prompt = "Give me only HTMl code and no CSS code in single <!DOCTYPE html> page linking to a css file with styles.css for this input - " + input;
   const htmlResult = await model.generateContent(prompt);
   const htmlResponse = await htmlResult.response;
   const htmlText = htmlResponse.text();

   
   const cssPrompt = "Give me CSS code for " + htmlText;
   const cssResult = await model.generateContent(cssPrompt);
   const cssResponse = await cssResult.response;
   const cssText = cssResponse.text();

   console.log("HTML Text : ",htmlText);
   console.log("CSS Text : ",cssText);

   const text = {
      htmlText,
      cssText
   }
   
   return text;

 } catch (error) {
  console.log("Error at Api controller - ",error);
 }
}

module.exports = ApiController;