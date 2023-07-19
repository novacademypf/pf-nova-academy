const { Router } = require("express");
const {
  postCreateCourseForSale,
  deleteCourseForSale,
  updateCourseForSale,
  getCourseForSaleById,
  getFilterCourseForSale,
  getCourseForSale,
  searchCoursesByName,
  postRaitingCourse
} = require("../controllers/courseForSale.controller");
const VerifyAuthorization = require("../middleware/auth");
const { verificarRole } = require("../middleware/authRole");
const courseForsaleRouter = Router();

courseForsaleRouter.get("/",getCourseForSale);
courseForsaleRouter.get("/filter",getFilterCourseForSale);
courseForsaleRouter.get("/search", searchCoursesByName);
courseForsaleRouter.get("/:courseId", getCourseForSaleById );

courseForsaleRouter.post(       
  "/createCourse",
  VerifyAuthorization,
  verificarRole("user"),
  postCreateCourseForSale
);

courseForsaleRouter.put(
  "/updateCourse/:courseId",
  VerifyAuthorization,
  verificarRole("user"),
  updateCourseForSale
);

courseForsaleRouter.delete(
  "/deleteCourse/:courseId",
  deleteCourseForSale
);

module.exports = courseForsaleRouter;
