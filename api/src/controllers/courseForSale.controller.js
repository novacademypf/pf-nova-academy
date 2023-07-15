const { CourseForSale, Profile, User } = require("../db");
const getUserToken = require("../helpers/getUsertoken");
const { Op, Sequelize } = require("sequelize");
const { cursos, category } = require("../constants/data");

const postCreateCourseForSale = async (req, res) => {
  try {
    const { name, category, duration, description, images, price } =
      req.body.headers.body;
    const user = await getUserToken(req);
    if (!name || !category || !duration || !description || !images || !price) {
      return res.status(404).json({ error: "Data missing" });
    }
    const newCourse = await CourseForSale.create({
      name,
      category,
      duration,
      description,
      images,
      price,
      idProfile: user.idUser,
    });
    res.json(newCourse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCourseForSale = async (req, res) => {
  try {
    const { page, limit } = req.query;
    if (page && limit) {
      const offset = (page - 1) * limit;
      const { count, rows } = await CourseForSale.findAndCountAll({
        offset,
        limit,
        include: {
          model: Profile,
          attributes: { exclude: ["photo"] },
        },
      });
      res.send({ courseCount: count, courseAll: rows });
    } else {
      const { count, rows } =
        await CourseForSale.findAndCountAll({
          include: {
            model: Profile,
            attributes: { exclude: ["photo"] },
          },
          
        });
        const maxPrice = await CourseForSale.max('price');
        const minPrice = await CourseForSale.min('price');
        
        res.send({
          courseCount: count,
          courseAll: rows,
          maxPrice,
          minPrice
        });
     
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const getFilterCourseForSale = async (req, res) => {
  try {
    const { categories, priceMin, priceMax, page, limit } = req.query;
    if (categories && priceMin && priceMax) {
      const { count, rows } = await CourseForSale.findAndCountAll({
        where: {
          category: {
            [Op.contains]: categories,
          },
          price: {
            [Op.between]: [priceMin, priceMax],
          },
        },
        include: {
          model: Profile,
          attributes: { exclude: ["photo"] },
        },
      });

      return res.json({ courseCount: count, courseAll: rows });
    }
    if (categories) {
      const offset = (page - 1) * limit;
      const { count, rows } = await CourseForSale.findAndCountAll({
        offset,
        limit,
        where: {
          category: {
            [Op.contains]: categories,
          },
        },
        include: {
          model: Profile,
          attributes: { exclude: ["photo"] },
        },
      });
      return res.json({ courseCount: count, courseAll: rows });
    }
  } catch (error) {
    res.json({ error: error.message });
  }
};
const updateCourseForSale = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const updateCourse = req.body;
    const user = await getUserToken(req);
    const updatedCourse = await CourseForSale.update(updateCourse, {
      where: {
        id: courseId,
        idProfile: user.idUser,
      },
    });
    if (updatedCourse[0] === 0) {
      res
        .status(400)
        .json({ error: "Course not found for the current user profile" });
    } else {
      res.send("update course successfully");
    }
  } catch (error) {
    res.json({ error: error.message });
  }
};
const deleteCourseForSale = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const user = await getUserToken(req);
    const courseDelete = await CourseForSale.destroy({
      where: { id: courseId, idProfile: user.idUser },
    });
    if (courseDelete === 0) {
      return res
        .status(404)
        .json({ error: "Course not found for the current user profile" });
    } else {
      res.send("courses deleted");
    }
    res.json(courseDelete);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getCourseForSaleById = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await CourseForSale.findByPk(courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error retrieving course" });
  }
};
const searchCoursesByName = async (req, res) => {
  try {
    const { name } = req.query;
    console.log(name);
    // const dataBaseCourses=await CourseForSale.find({name:{ $regex:name,$options:"i"}})
    const dataBaseCourses = await CourseForSale.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
    });
    const results = [...dataBaseCourses];
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: "Error al buscar los cursos." });
  }
};

module.exports = {
  postCreateCourseForSale,
  getCourseForSale,
  deleteCourseForSale,
  updateCourseForSale,
  getCourseForSaleById,
  getFilterCourseForSale,
  searchCoursesByName,
};
