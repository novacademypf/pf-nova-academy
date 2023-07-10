const {Router} = require("express");
const {postLoginGoogle}=require("../controllers/google.controller");
const verifyGoogleToken = require("../middleware/verifyGoogleToken");
const googleRoutes=Router()
googleRoutes.post('/verifyToken',verifyGoogleToken,postLoginGoogle)
module.exports = googleRoutes