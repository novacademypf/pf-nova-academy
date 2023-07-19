const { Router } = require("express");
const { verificarRole } = require("../middleware/authRole");
const { postCourseRating } = require("../controllers/courseRating.controller");
const VerifyAuthorization = require("../middleware/auth");
const courseRatingRoutes = Router();
courseRatingRoutes.post("/:idCourse/rate", postCourseRating);
module.exports = courseRatingRoutes;
