const { Schema, model } = require('mongoose');

const orderSchema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  city: { type: String, required: true },
  adressOfTheProvence: { type: String },
  adressOfTheUser: { type: String, required: true },
  methodOfPayment: { type: String, required: true },
  comment: { type: String },
  dishes: [
    {
      title: { type: String, required: true },
      price: { type: String, required: true },
      quantity: { type: String, required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
});

module.exports = model('orders', orderSchema);
