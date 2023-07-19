const { Order } = require("../db");

const getOrders = async (req, res) => {
  const { profileId } = req.params;
  console.log("params", profileId);
  const ordersByUser = await Order.findAll({
    where: {
      idProfile: profileId,
    },
  });
  res.send(ordersByUser);
};

module.exports = {
  getOrders,
};