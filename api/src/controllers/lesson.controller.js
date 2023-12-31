const { Lesson, Module } = require("../db");

const createLesson = async (req, res) => {
  try {
    const { title, content, resource,  idModule} = req.body;
    const module = await Module.findByPk(idModule);
    if (!module) {
      return res.status(404).json({ error: "Module not found" });
    }
    if(!title || !content){
      return res.status(404).json({ error: "Data is missing" });
    }
    const lesson = await Lesson.create({ 
      title, 
      content, 
      resource,
      idModule:idModule
    });
    res.json(lesson);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating lesson" });
  }
};

const getLessons = async (req, res) => {
  try {
    const lessons = await Lesson.findAll();
    res.json(lessons);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error retrieving lessons" });
  }
};

const getLessonById = async (req, res) => {
  try {
    const { lessonId } = req.params;
    const lesson = await Lesson.findByPk(lessonId);
    if (!lesson) {
      return res.status(404).json({ error: "Lesson not found" });
    }
    res.json(lesson);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error retrieving lesson" });
  }
};

const updateLessonById = async (req, res) => {
  try {
    const { lessonId } = req.params;
    const { title, content, resource } = req.body;
    const lesson = await Lesson.findByPk(lessonId);
    if (!lesson) {
      return res.status(404).json({ error: "Lesson not found" });
    }
    await lesson.update({ title, content, resource });
    res.json(lesson);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating lesson" });
  }
};

const deleteLessonById = async (req, res) => {
  try {
    const { lessonId } = req.params;
    const lesson = await Lesson.findByPk(lessonId);
    if (!lesson) {
      return res.status(404).json({ error: "Lesson not found" });
    }
    await lesson.destroy();
    res.json({ message: "Lesson deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting lesson" });
  }
};

module.exports = {
  createLesson,
  getLessons,
  getLessonById,
  updateLessonById,
  deleteLessonById,
};
