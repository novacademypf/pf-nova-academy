require("dotenv").config();
const mercadopago = require("mercadopago");
const { YOUR_ACCESS_TOKEN } = process.env;
const { Order } = require("../db");

// Configurar el acceso al SDK de MercadoPago
mercadopago.configure({
  access_token: YOUR_ACCESS_TOKEN,
});

const createOrder = async (body) => {
  try {
    const itemsOrder = body.items.map((el) => {
      return { idCourse: el.id };
    });
    console.log("profileID -->", body.user.profileId);
    const order = await Order.create({
      items: itemsOrder,
      status: "created",
      idProfile: body.user.profileId,
    });
    return order.idOrder;
  } catch (err) {
    console.log(err);
  }
};

// Controlador para realizar un pago
const createPayment = async (req, res) => {
  try {
    const coursesList = req.body.items;
    const externalRef = await createOrder(req.body);

    // Crear el objeto de preferencia de pago
    const preference = {
      external_reference: `${externalRef}`,
      items: coursesList,
      back_urls: {
        success: "https://pf-nova-academy-production.up.railway.app/mercadopago/paymentresponse",
        failure: "https://pf-nova-academy.vercel.app",
        pending: "https://pf-nova-academy.vercel.app",
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

    res.redirect("https://pf-nova-academy.vercel.app");
  } catch (err) {
    console.error(err);
    res.redirect("https://pf-nova-academy.vercel.app/paymentresponse?status=error");
  }
};

module.exports = {
  createPayment,
  paymentResponse,
};