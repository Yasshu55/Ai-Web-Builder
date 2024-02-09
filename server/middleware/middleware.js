const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });

module.exports = function(req,res,next){
    try {
        if (!req.headers.authorization) {
            return res.status(400).send("Authorization header missing");
        }

        let token = req.header("Authorization").split(" ")[1];
        if(!token){
            return res.status(400).send("user not found!")
        }
        let decode = jwt.verify(token,`${process.env.JWT_TOKEN}`)
        req.user = decode.user
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal error");
    }
}