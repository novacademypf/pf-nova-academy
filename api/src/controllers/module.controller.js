const { Module , CourseForSale  } = require("../db");

const createModule = async (req, res) => {
  try {
    const { name, description, courseId } = req.body;
    const courseForSale = await CourseForSale.findByPk(courseId);
    if (!courseForSale || !name || !description) {
      return res.status(404).json({ error: "Data missing" });
    }
    const module = await Module.create({ 
      name, 
      description, 
      idCourseForSale: courseId 
    });
    res.json(module);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating module" });
  }
};

const getModules = async (req, res) => {
  try {
    const modules = await Module.findAll();
    res.json(modules);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error retrieving modules" });
  }
};

const getModuleById = async (req, res) => {
  try {


    const { moduleId } = req.params;
    const module = await Module.findByPk(moduleId);
    if (!module) {
      return res.status(404).json({ error: "Module not found" });
    }
    res.json(module);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error retrieving module" });
  }
};

const updateModuleById = async (req, res) => {
  try {
    const { moduleId } = req.params;
    const { name, description } = req.body;
    const module = await Module.findByPk(moduleId);
    if (!module) {
      return res.status(404).json({ error: "Module not found" });
    }
    await module.update({ name, description});
    res.json(module);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating module" });
  }
};

const deleteModuleById = async (req, res) => {
  try {
    const { moduleId } = req.params;
    const module = await Module.findByPk(moduleId);
    if (!module) {
      return res.status(404).json({ error: "Module not found" });
    }
    await module.destroy();
    res.json({ message: "Module deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting module" });
  }
};

module.exports = {
  createModule,
  getModules,
  getModuleById,
  updateModuleById,
  deleteModuleById,
};
