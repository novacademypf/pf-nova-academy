const { Router } = require("express");
const { getProfile, getCoursesByProfileId, getAllProfile, updateProfile } = require("../controllers/profile.controller");
const VerifyAuthorization = require("../middleware/auth");
const {verificarRole} = require("../middleware/authRole");
const profileRoutes = Router()

profileRoutes.put('/updateProfile/:profileId',updateProfile);
profileRoutes.get('/allProfile', getAllProfile);
profileRoutes.get('/',VerifyAuthorization,getProfile);
profileRoutes.get('/courseForSale',VerifyAuthorization,getCoursesByProfileId);

module.exports =profileRoutes