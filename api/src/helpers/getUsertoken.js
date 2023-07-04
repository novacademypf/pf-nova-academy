const { verifyToken } = require("./generateToken");

 const getUserToken= async(req)=>{
   console.log("gettoken req.body", req.body.headers)
    const token = req.body.headers.Authorization.split(" ").pop();
    console.log("token back", token)
    const user = await verifyToken(token);

    return user
 }
 module.exports=getUserToken