const { Profile, User, CourseForSale } = require("../db");
const getUserToken = require("../helpers/getUsertoken");
const data = require("../constants/data");

const getProfile = async (req, res) => {
  try {
    console.log("getProfile", req.headers);
    const user = await getUserToken(req);
    console.log("getProfile user", user);
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
  const profileId = user.idUser;
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
const getAllProfile = async (req,res) => {
  try {
    const profile = await Profile.findAll();
    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error retrieving users" });
  }
}


const updateProfile = async (req,res) => {
  try {
    const { profileId } = req.params;
    const { status } = req.body;
    const user = await Profile.findByPk(profileId);
    if (!user) {
      return res.status(404).json({ error: "Profile not found" });
    }
    await user.update({ status });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating Profile" });
  }
}

module.exports = { getProfile, getCoursesByProfileId, getAllProfile, updateProfile };