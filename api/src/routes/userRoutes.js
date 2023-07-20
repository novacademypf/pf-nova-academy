const { Router } = require("express");
const {
  createUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  postLoginUser,
} = require("../controllers/user.controller.js");
const { verificarRole } = require("../middleware/authRole"); 
const {validateCreateuser,validateLoginUser} = require("../validators/user.js");
const VerifyAuthorization = require("../middleware/auth.js");
const userRoutes = Router();
userRoutes.delete("/deleteUser/:userId",deleteUserById);
userRoutes.get("/userId/:userId",getUserById);
userRoutes.put("/updateUser/:userId",updateUserById);
userRoutes.post("/login",validateLoginUser,postLoginUser);
userRoutes.post("/singup",validateCreateuser, createUser);
userRoutes.get("/",getUsers,);

module.exports = userRoutes;