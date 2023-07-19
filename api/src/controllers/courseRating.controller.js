const { CourseForSale, Profile, CourseRating } = require("../db");
const getUserToken = require("../helpers/getUsertoken");
const courseForSale = require("../models/courseForSale");

const postCourseRating = async (req, res) => {
  const { idCourse } = req.params;
  const { rating, review } = req.body;
  try {
    const { idUser } = await getUserToken(req);
    const course = await CourseForSale.findByPk(idCourse);
    // Verificar si el usuario ya ha valorado este curso antes
    const existingRating = await CourseRating.findOne({
      where: { profileId: idUser, courseForSaleId: idCourse },
    });
    if (!course) {
      return res.status(404).json({ error: "Curso no encontrado." });
    }

    if (existingRating) {
      return res
        .status(400)
        .json({ error: "El usuario ya ha valorado este curso." });
    }

    await CourseRating.create({
      rating: +rating,
      review,
      profileId: idUser,
      courseForSaleId: idCourse,
    });
    const newRatingTotal = course.totalRating + parseInt(rating);
    const newRatingCount = course.totalRatings + 1;
    const newRatingAverage = newRatingTotal / newRatingCount;
    console.log("ratingTotal-->", newRatingTotal);
   
    await course.update({
      totalRating: newRatingTotal,
      totalRatings: newRatingCount,
      ratingAverage: newRatingAverage,
    });

    return res.json({ message: "Valoración registrada exitosamente." });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
const getCourseRating = async (req, res) => {
  try {
    const { idCourse } = req.params;
    let courseRatings;

    if (idCourse) {
      // Si se proporciona idCourse, realiza la consulta filtrando por curso
      courseRatings = await CourseRating.findAll({
        where: { courseForSaleId: idCourse },
        attributes: ['rating', 'review'],
        include: [
          {
            model: Profile,
            attributes: ['profileId', 'name', 'photo'],
          },
        ],
      });
    } else {
      // Si NO se proporciona idCourse, realiza la consulta sin filtrar por curso
      courseRatings = await CourseRating.findAll({
        attributes: ['rating', 'review'],
        include: [
          {
            model: Profile,
            attributes: ['profileId', 'name', 'photo'],
          },
        ],
      });
    }

    res.send(courseRatings);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const putCourseRating = async (req, res) => {
  try {
    const { idCourse } = req.params;
    const { rating, review } = req.body;
    const { idUser } = await getUserToken(req);
    const existingRating = await CourseRating.findOne({
      where: {
        courseForSaleId: idCourse,
        profileId: idUser,
      },
    });
    if (existingRating) {
      const prevRating = existingRating.rating;
      existingRating.rating = parseInt(rating) ?? existingRating.rating;
      existingRating.review = review ?? existingRating.review;
      await existingRating.save();
      const course = await CourseForSale.findByPk(idCourse);
      const newRatingTotal =
        course.totalRating - prevRating + existingRating.rating;
      const newRatingAverage = newRatingTotal / course.totalRatings;
      await course.update({
        totalRating: newRatingTotal,
        ratingAverage: newRatingAverage,
      });

      return res.json({ message: "Valoración actualizada exitosamente." });
    }
  } catch (error) {
    res.status(500).send(error.message)
  }
};
module.exports = { postCourseRating, putCourseRating,getCourseRating };
