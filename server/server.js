const express = require("express");
const app = express();
const PORT = 8000;
const cors = require("cors");
app.use(cors());




app.get("/api/home",(req,res) =>{
    res.json({message:"Hello World"})
})

app.listen(PORT,() =>{
    console.log(`Listening on port ${PORT}`)
})
