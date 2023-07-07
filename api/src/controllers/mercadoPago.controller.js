require("dotenv").config();
const mercadopago = require("mercadopago");
const { YOUR_ACCESS_TOKEN } = process.env;

// Configurar el acceso al SDK de MercadoPago
mercadopago.configure({
  access_token: YOUR_ACCESS_TOKEN,
});

// Controlador para realizar un pago
const createPayment = async (req, res) => {
  try {
    const prod = req.body;
    // Crear el objeto de preferencia de pago
    const preference = {
      items: prod,
      back_urls: {
        success: "http://127.0.0.1:5173/",
        failure: "http://127.0.0.1:5173/",
        pending: "http://127.0.0.1:5173/",
      },
      auto_return: "approved",
      binary_mode: true,
    };

    // Crear la preferencia de pago
    /*const response = await mercadopago.preferences.create(preference);*/

    mercadopago.preferences
      .create(preference)
      .then((response) => res.status(200).json({ response }));

    // Redireccionar al usuario a la página de pago de MercadoPago
    /*return res.redirect(response.body.init_point);*/
  } catch (error) {
    console.error("Error al crear el pago:", error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createPayment,
};
