const GeorgianDishes = require('../models/georgiandishes-model');
// const georgiandishes = require('../../client/src/georgdishes.json');

class GeorgianDishesController {
  async getGeorgianDishes(req, res) {
    try {
      const page = parseInt(req.query.page) - 1 || 0;
      const limit = parseInt(req.query.limit) || 8;
      const search = req.query.search || '';

      const georgiandishes = await GeorgianDishes.find({
        title: { $regex: search, $options: 'i' },
      })
        .skip(page * limit)
        .limit(limit);

      const total = await GeorgianDishes.countDocuments({
        title: { $regex: search, $options: 'i' },
      });

      const response = {
        error: false,
        total,
        page: page + 1,
        limit,
        georgiandishes,
      };

      res.status(200).json(response);
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
  }
}

// const insertGeorgianDishes = async () => {
//   try {
//     const docs = await GeorgianDishes.insertMany(georgiandishes);
//     return Promise.resolve(docs);
//   } catch (e) {
//     return Promise.reject(err);
//   }
// };

// insertGeorgianDishes()
//   .then((docs) => console.log(docs))
//   .catch((err) => console.log(err));

module.exports = new GeorgianDishesController();
