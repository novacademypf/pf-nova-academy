const { Router } = require("express");
const {
  postCreateCourseForSale,
  deleteCourseForSale,
  updateCourseForSale,
  getCourseForSaleById,
  getFilterCourseForSale,
} = require("../controllers/courseForSale.controller");
const {getCourseForSaleMiddleware} =require("../middleware/courseForSaleMiddleware.js")
const VerifyAuthorization = require("../middleware/auth");
const { verificarRole } = require("../middleware/authRole");
const courseForsaleRouter = Router();

courseForsaleRouter.get("/", getCourseForSaleMiddleware);
courseForsaleRouter.get("/filter",getFilterCourseForSale)
courseForsaleRouter.get("/:courseId", getCourseForSaleById )

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
  VerifyAuthorization,
  verificarRole("user"),
  deleteCourseForSale
);

module.exports = courseForsaleRouter;
