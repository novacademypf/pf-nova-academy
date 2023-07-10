const {Router} = require('express');
const {
    createLesson,
    getLessons, 
    getLessonById, 
    updateLessonById, 
    deleteLessonById
} = require ("../controllers/lesson.controller");
const VerifyAuthorization = require("../middleware/auth");
const { verificarRole } = require("../middleware/authRole");
const lessonRoutes = Router();


lessonRoutes.get("/", getLessons)
lessonRoutes.get("/:lessonId", getLessonById)
lessonRoutes.post(
    "/createLesson",
    createLesson
    )
lessonRoutes.put(
    "/updateLesson/:lessonId",
    VerifyAuthorization,
    verificarRole("user"), 
    updateLessonById
    )
lessonRoutes.delete(
    "/deleteLesson/:lessonId",
    deleteLessonById
    )

module.exports = lessonRoutes;