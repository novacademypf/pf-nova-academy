const { Router } = require("express");
const { verificarRole } = require("../middleware/authRole");
const { postCourseRating, putCourseRating, getCourseRating, getCourseRatingByProfile } = require("../controllers/courseRating.controller");
const VerifyAuthorization = require("../middleware/auth");
const courseRatingRoutes = Router();
courseRatingRoutes.post("/:idCourse/rate", VerifyAuthorization,postCourseRating);
courseRatingRoutes.get('/:idCourse?',getCourseRating)
courseRatingRoutes.put('/:idCourse/rate',VerifyAuthorization,putCourseRating)
courseRatingRoutes.get("/:idCourse/profile",getCourseRatingByProfile)
module.exports = courseRatingRoutes;

