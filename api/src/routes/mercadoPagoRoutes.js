const { Router } = require("express");
const {
  createPayment,
  successResponse,
} = require("../controllers/mercadoPago.controller");
const mercadoPagoRoutes = Router();

// Ruta para realizar el pago
mercadoPagoRoutes.post("/", createPayment);
mercadoPagoRoutes.get("/success", successResponse);
//mercadoPagoRoutes.get("/failure", createPayment);

module.exports = mercadoPagoRoutes;
