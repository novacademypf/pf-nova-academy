const {Router} = require("express");
const {postLoginGoogle, getGoogle, deleteGoogleById}=require("../controllers/google.controller");
const verifyGoogleToken = require("../middleware/verifyGoogleToken");
const googleRoutes=Router()

googleRoutes.post('/verifyToken',verifyGoogleToken,postLoginGoogle)
googleRoutes.get("/",getGoogle,);
googleRoutes.delete("/deleteUser/:id",deleteGoogleById);



module.exports = googleRoutes