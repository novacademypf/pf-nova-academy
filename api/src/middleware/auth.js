const { verifyToken } = require("../helpers/generateToken");

const VerifyAuthorization = async (req, res, next) => {
  console.log("headers auth",req.body)

  try {
    console.log("headers",req.headers.authorization)
    const token = req.headers.authorization.split(" ").pop();
    console.log("token verifyAuthori", token)
    const tokenData = await verifyToken(token);
    console.log("tokendata verifyauthorization", tokenData)
    if (tokenData.idUser) next();
    else throw Error("token invalid");
  } catch (error) {
    console.log("error verifyAuthorization, auth")
    res.status(403).json({ error: error.message });
  }
};
module.exports = VerifyAuthorization;