const { Order, CourseForSale, Module, Lesson } = require("../db");
const getOrders = async (req, res) => {
  const { profileId } = req.params;
  const ordersByUser = await Order.findAll({
    where: {
      idProfile: profileId,
    },
  });
  res.send(ordersByUser);
};
function extractCourseIds(data) {
  const courseIds = [];

  data.forEach((order) => {
    if (order.payment_status === "approved") {
      order.items.forEach((item) => {
        courseIds.push(item.idCourse);
      });
    }
  });

  return courseIds;
}

const getCoursesOrders = async (req, res) => {
  try {
    const { profileId } = req.params;
    const ordersByUser = await Order.findAll({
      where: {
        idProfile: profileId,
      },
    });

    const arrayIds = extractCourseIds(ordersByUser);

    const courses = await CourseForSale.findAll({
      where: {
        id: arrayIds,
      },
      include: [
        {
          model: Module,
          attributes: ["id", "name", "description"],
          include: [
            {
              model: Lesson,
              attributes: ["id", "title", "content", "resource"],
            },
          ],
        },
      ],
    });
    res.json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error retrieving courses" });
  }
};
module.exports = {
  getOrders,
  getCoursesOrders,
};
