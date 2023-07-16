const { verifyToken } = require("../helpers/generateToken");
const { Profile } = require("../db");
const verificarRole = (role) => async (req, res, next) => {
  try {
    console.log("token header auto role", req.headers.authorization)
    const token = req.headers.authorization.split(" ").pop();
    
    const tokenData = await verifyToken(token);
    
    const userData = await Profile.findByPk(tokenData.idUser);
    console.log("verifi toke", userData)
    if (userData && [role].includes(userData.role)) next();
    else throw Error("User not authorized");
  } catch (error) {
    console.log("error verify rol,")
    console.error("error", error);
    res.status(401).json({ error: error.message });
  }
};
module.exports = { verificarRole };