const { verifyToken } = require("./generateToken");


 const getUserToken= async(req)=>{
    const token = req.headers.authorization.split(" ").pop();
    console.log("getUserToken", token)
    const user = await verifyToken(token);
    console.log("getUserToken user", user)
    return user
 }
 module.exports=getUserToken