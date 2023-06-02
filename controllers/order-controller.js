const Order = require('../models/order-model');

class OrderController {
  async putOrderToDb(req, res) {
    try {
      console.log(req.body);
      const order = new Order(req.body);
      const savedOrder = await order.save();
      res.status(201).json(savedOrder);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new OrderController();
