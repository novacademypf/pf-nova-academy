const { Router } = require("express");
const { getOrders, getCoursesOrders } = require("../controllers/orders.controller.js");
const orderRoutes = Router();

orderRoutes.get("/courses/:profileId", getCoursesOrders)
orderRoutes.get("/:profileId", getOrders);

module.exports = orderRoutes;