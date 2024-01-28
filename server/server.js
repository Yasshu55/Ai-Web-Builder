const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const ApiController = require("./controllers/api.controller");

const app = express();
app.use(express.json());
app.use(cors());
const PORT = 8000;



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



app.listen(PORT,() =>{
    console.log(`Listening on port ${PORT}`)
})
