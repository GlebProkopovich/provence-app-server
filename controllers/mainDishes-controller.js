const MainDishes = require('../models/mainDishes-models');
// const mainDishes = require('../../client/src/mainDishes.json');

class MainDishesController {
  async getMainDishes(req, res) {
    try {
      const page = parseInt(req.query.page) - 1 || 0;
      const limit = parseInt(req.query.limit) || 8;
      const search = req.query.search || '';

      const maindishes = await MainDishes.find({
        title: { $regex: search, $options: 'i' },
      })
        .skip(page * limit)
        .limit(limit);

      const total = await MainDishes.countDocuments({
        title: { $regex: search, $options: 'i' },
      });

      const response = {
        error: false,
        total,
        page: page + 1,
        limit,
        maindishes,
      };

      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
  }
}

// const insertMainDishes = async () => {
//   try {
//     const docs = await MainDishes.insertMany(mainDishes);
//     return Promise.resolve(docs);
//   } catch (e) {
//     return Promise.reject(err);
//   }
// };

// insertMainDishes()
//   .then((docs) => console.log(docs))
//   .catch((err) => console.log(err));

module.exports = new MainDishesController();
