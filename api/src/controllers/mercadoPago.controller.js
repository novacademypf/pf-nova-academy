require("dotenv").config();
const mercadopago = require("mercadopago");
const { YOUR_ACCESS_TOKEN } = process.env;
const { Order } = require("../db");

// Configurar el acceso al SDK de MercadoPago
mercadopago.configure({
  access_token: YOUR_ACCESS_TOKEN,
});

const createOrder = async (items) => {
  try {
    const itemsOrder = items.map((el) => {
      return { idCourse: el.id };
    });
    console.log(itemsOrder);
    const order = await Order.create({
      items: itemsOrder,
      status: "created",
    });
    return order.idOrder;
  } catch (err) {
    console.log(err);
  }
};

// Controlador para realizar un pago
const createPayment = async (req, res) => {
  try {
    const coursesList = req.body;
    const externalRef = await createOrder(coursesList);

    // Crear el objeto de preferencia de pago
    const preference = {
      external_reference: `${externalRef}`,
      items: coursesList,
      back_urls: {
        success: "http://localhost:3001/mercadopago/paymentresponse",
        failure: "http://127.0.0.1:5173/",
        pending: "http://127.0.0.1:5173/",
      },
      auto_return: "approved",
      binary_mode: true,
    };

    mercadopago.preferences
      .create(preference)
      .then((response) => res.status(200).json({ response }));
  } catch (error) {
    console.error("Error al crear el pago:", error);
    return res.status(500).json({ error: error.message });
  }
};

//Ruta que recibe la información del pago
const paymentResponse = async (req, res) => {
  const { payment_id, status, external_reference, merchant_order_id } =
    req.query;
  let payment_status = status;

  console.table({
    payment_id,
    payment_status,
    external_reference,
    merchant_order_id,
  });
  try {
    const updateOrder = await Order.findByPk(external_reference);
    updateOrder.payment_id = payment_id;
    updateOrder.payment_status = payment_status;
    updateOrder.merchant_order_id = merchant_order_id;
    updateOrder.status = "completed";
    updateOrder.save();

    if (payment_status !== "approved") throw new Error();

    res.redirect("http://127.0.0.1:5173/paymentresponse?status=ok");
  } catch (err) {
    console.error(err);
    res.redirect("http://127.0.0.1:5173/paymentresponse?status=error");
  }
};

module.exports = {
  createPayment,
  paymentResponse,
};
