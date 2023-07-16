const { Router } = require("express");
const {
  createPayment,
  paymentResponse,
} = require("../controllers/mercadoPago.controller");
const mercadoPagoRoutes = Router();

// Ruta para realizar el pago
mercadoPagoRoutes.post("/", createPayment);
mercadoPagoRoutes.get("/paymentresponse", paymentResponse);

module.exports = mercadoPagoRoutes;
