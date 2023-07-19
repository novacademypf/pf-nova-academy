const { Router } = require("express");
const { getOrders } = require("../controllers/orders.controller.js");
const orderRoutes = Router();

orderRoutes.get("/:profileId", getOrders);

module.exports = orderRoutes;