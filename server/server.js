const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const ApiController = require("./controllers/api.controller");
const GeneratedWebsite = require('./models/GeneratedWebsite')
const User = require('./models/User');
const jwt = require("jsonwebtoken");
// const middleware = require('./middleware/middleware')

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

app.post('/api/save', async (req,res) =>{
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

app.post('/api/signup', async (req,res) => {
    try {
    const {userName,email,password} = req.body;

    const user = new User({userName,email,password})
    console.log(user);
    await user.save();
    res.json({message: "User profile created successfully!!"})
    } catch (error) {
        console.log('Error saving changes: ',error);
        res.status(500).json({error:"INternal SERVER ERROR"})
    }
})

app.post('/api/login',async (req,res) =>{
    try {
        const {email,password} = req.body;
        
        if(!email || !password){
            return res.status(404).json({message:"Enter valid details"});
        }
        
        const exist = await User.findOne({email})
        if(!exist){
            return res.status(404).json({ error: 'User not found' });
        }
        if(exist.password !== password){
            return res.status(400).send("Invalid credentials");
        }

        let payload = {
            user :{
                id: exist.id
            }
        }

        jwt.sign(payload,`${process.env.JWT_TOKEN}`,{expiresIn: 3600000},(err,token) =>{
            if(err)
            throw err;

            return res.status(200).json({token});
        })

    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
