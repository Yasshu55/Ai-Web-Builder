const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });

module.exports = function(req,res,next){
    try {
        let token = req.header("x-token")
        if(!token){
            return res.status(400).send("user not found!")
        }
        let decode = jwt.verify(token,`${process.env.JWT_TOKEN}`)
        req.user = decode.user
        next();
    } catch (error) {
        console.log(err);
        return res.status(500).send("Internal error");
    }
}