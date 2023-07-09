const jwt = require("jsonwebtoken");


const { JWT_SECRET } = process.env;
const createtoken = async (user) => {
  console.log("token user",user)
  return jwt.sign(
    {
      
      idUser: user.profileId,
      role: user.role,
      email:user.email
      
    },
    JWT_SECRET,
    { expiresIn: "2h" }
  );
};
const verifyToken = async (token) => {
  console.log("verifytoken1", token);

  try {
    console.log("verifytoken2", token);
    return jwt.verify(token,JWT_SECRET);
  } catch (error) {
    console.log("error verify token, generate token")
    throw Error(error.message)
  }
};
module.exports = { createtoken, verifyToken };