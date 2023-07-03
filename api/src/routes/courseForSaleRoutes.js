const { Router } = require("express");
const {
  postCreateCourseForSale,
  getCourseForSale,
  deleteCourseForSale,
  updateCourseForSale,
  getCourseForSaleById,
  getfilterCourseForSale
} = require("../controllers/courseForSale.controller");

const VerifyAuthorization = require("../middleware/auth");
const { verificarRole } = require("../middleware/authRole");
const courseForsaleRouter = Router();

courseForsaleRouter.get("/", getCourseForSale);
courseForsaleRouter.get("/filter", getfilterCourseForSale)
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
