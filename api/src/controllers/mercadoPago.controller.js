require("dotenv").config();
const mercadopago = require("mercadopago");
const { YOUR_ACCESS_TOKEN } = process.env;
const { Order } = require("../db");

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

//Ruta que recibe la información del pago
const successResponse = () => {
  
    console.info("EN LA RUTA PAGOS ", req);
    const payment_id = req.query.payment_id;
    const payment_status = req.query.status;
    const external_reference = req.query.external_reference;
    const merchant_order_id = req.query.merchant_order_id;
    console.log("EXTERNAL REFERENCE ", external_reference);

    //Aquí edito el status de mi orden
    Order.findByPk(external_reference)
      .then((order) => {
        order.payment_id = payment_id;
        order.payment_status = payment_status;
        order.merchant_order_id = merchant_order_id;
        order.status = "completed";
        console.info("Salvando order");
        order
          .save()
          .then((_) => {
            console.info("redirect success");

            return res.redirect("http://localhost:3000");
          })
          .catch((err) => {
            console.error("error al salvar", err);
            return res.redirect(
              `http://localhost:3000/?error=${err}&where=al+salvar`
            );
          });
      })
      .catch((err) => {
        console.error("error al buscar", err);
        return res.redirect(
          `http://localhost:3000/?error=${err}&where=al+buscar`
        );
      });

    //proceso los datos del pago
    //redirijo de nuevo a react con mensaje de exito, falla o pendiente
  );

  //Busco información de una orden de pago
  server.get("/pagos/:id", (req, res) => {
    const mp = new mercadopago(ACCESS_TOKEN);
    const id = req.params.id;
    console.info("Buscando el id", id);
    mp.get(`/v1/payments/search`, { status: "pending" }) //{"external_reference":id})
      .then((resultado) => {
        console.info("resultado", resultado);
        res.json({ resultado: resultado });
      })
      .catch((err) => {
        console.error("No se consulto:", err);
        res.json({
          error: err,
        });
      });
  });
};

module.exports = {
  createPayment,
  successResponse,
};
