const { verifyToken } = require("./generateToken");

 const getUserToken= async(req)=>{
    const token = req.headers.authorization.split(" ").pop();
    console.log("token back", token)
    const user = await verifyToken(token);

    return user
 }
 module.exports=getUserToken