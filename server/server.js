const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const ApiController = require("./controllers/api.controller");
const GeneratedWebsite = require('./models/GeneratedWebsite')

const app = express();
app.use(express.json());
app.use(cors());
const PORT = 8000;
require('./mongo/db')



app.get("/api/home",(req,res) =>{
    res.json({message:"Hello World"})
})

app.post("/api/generate", async (req,res) =>{
    try {
    const input = req.body.input;
    console.log("My frontend input : ",input);
    const result = await ApiController(input);
    console.log(result);
    console.log("This is the result sending from /api/generate : ",result);
    res.json({textCode:result})
    } catch (error) {
        console.log("Error at Generate APi: " + error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

app.post('/save', async (req,res) =>{
    try {
    const{userId,htmlCode,cssCode,jsCode} = req.body;

    const generatedWebCode = new GeneratedWebsite({
        userId,
        htmlCode,
        cssCode,
        jsCode,
    });

    const savedWebsite = await generatedWebCode.save();
    res.json(({message: " Changes saved successfulyy!!",savedWebsite}))
    } catch (error) {
        console.log('Error saving changes: ',error);
        res.status(500).json({error:"INternal SERVER ERROR"})
    }
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
