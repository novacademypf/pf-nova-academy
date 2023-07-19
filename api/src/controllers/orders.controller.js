
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