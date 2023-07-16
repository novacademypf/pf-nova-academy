const { Router } = require("express");
const { getProfile, getCoursesByProfileId } = require("../controllers/profile.controller");
const VerifyAuthorization = require("../middleware/auth");
const {verificarRole} = require("../middleware/authRole");
const profileRoutes = Router()

profileRoutes.get('/',VerifyAuthorization,getProfile)
profileRoutes.get('/courseForSale',VerifyAuthorization,getCoursesByProfileId)

module.exports =profileRoutes