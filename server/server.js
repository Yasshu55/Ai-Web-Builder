const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const ApiController = require("./controllers/api.controller");
const GeneratedWebsite = require('./models/GeneratedWebsite')
const User = require('./models/User');
const jwt = require("jsonwebtoken");
const middleware = require('./middleware/middleware')

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 8000;
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

app.post('/api/save',middleware,async (req,res) =>{
    try {
    const {prompt,htmlCode,cssCode,jsCode} = req.body;
    console.log("ENtered /api/save api");
    const userId = req.user.id;
    console.log("and useriD: ",userId);
    
        const generatedWebCode = new GeneratedWebsite({
            userId,
            prompt,
            htmlCode,
            cssCode,
            jsCode,
        });

        
        const savedWebsite = await generatedWebCode.save();
        console.log("saved website",savedWebsite);
        res.json(({message: "Changes saved successfulyy!!",savedWebsite}))
    } catch (error) {
        console.log('Error saving changes: ',error);
        res.status(500).json({error:"INternal SERVER ERROR"})
    }    
})

app.delete("/api/delete/:codeId",middleware, async (req,res) =>{
    try {
        const userId = req.user.id;
        const codeId = req.params.codeId;

        // check if code is berlongs to user
        const code = await GeneratedWebsite.findOne({_id: codeId,userId:userId})
        if(!code){
            return res.status(404).json({ message: 'Code not found or unauthorized' });
        }
        await GeneratedWebsite.deleteOne({_id:codeId})
        res.json({ message: 'Code deleted successfully' });

    } catch (error) {
        console.error('Error deleting code:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

app.get('/api/myprofile',middleware,async (req,res) =>{
   try {
    const userId = req.user.id;
    const user = await User.findById(userId)
    console.log(user);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    const userCodes = await GeneratedWebsite.find({userId})
    res.json({userName: user.userName,userCodes: userCodes})
   } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Internal Server Error' });
   }
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
