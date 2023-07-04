const { verifyToken } = require("../helpers/generateToken");

const VerifyAuthorization = async (req, res, next) => {
  console.log("headers auth",req.body)

  try {
    console.log("headers",req.body.headers.Authorization)
    const token = req.body.headers.Authorization.split(" ").pop();
    console.log("token verifyAuthori", token)
    const tokenData = await verifyToken(token);
    console.log("tokendata verifyauthorization", tokenData.idUser)
    if (tokenData.idUser) next();
    else throw Error("token invalid");
  } catch (error) {
    console.log("error verifyAuthorization, auth")
    res.status(403).json({ error: error.message });
  }
};
module.exports = VerifyAuthorization;
