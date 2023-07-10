const { verifyToken } = require("./generateToken");

 const getUserToken= async(req)=>{
    const token = req.body.headers.Authorization.split(" ").pop();
    const user = await verifyToken(token);
    return user
 }
 module.exports=getUserToken