const { Profile, User, CourseForSale,Course } = require("../db");
const getUserToken = require("../helpers/getUsertoken");
const data = require("../constants/data");
const getProfile = async (req, res) => {
  try {
    console.log("getProfile", req.headers)
    const user = await getUserToken(req);
    console.log("getProfile user", user)
    const userProfile = await Profile.findOne({
      where: { profileId: user.idUser },
      include: {
        model: User,
        attributes: { exclude: ["password", "userId", "role"] },
      },
    });
    if (!userProfile) throw Error("User profile not found");
    res.send(userProfile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getCoursesByProfileId = async (req, res) => {
  // const profileId = req.params.profileId; // Obtener el ID del perfil de los parámetros de la solicitud
  const user = await getUserToken(req);
  const profileId = user.idUser 
  try {
    const courses = await CourseForSale.findAll({
      where: { idProfile: profileId },
      attributes: {
        exclude: ["createdAt", "updatedAt"], 
      },
    });

    res.json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los cursos" });
  }
};
module.exports = { getProfile , getCoursesByProfileId};
