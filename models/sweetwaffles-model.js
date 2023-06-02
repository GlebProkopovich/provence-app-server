const { Schema, model } = require('mongoose');

const sweetWafflesSchema = new Schema({
  imgSrc: { type: String, required: true },
  category: { type: String },
  altImg: { type: String, required: true },
  title: { type: String, required: true },
  price: { type: String, required: true },
});

module.exports = model('sweetwaffles', sweetWafflesSchema);
