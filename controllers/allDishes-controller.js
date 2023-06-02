const AllDishes = require('../models/allDishes-model');
// const alldishes = require('../../client/src/allDishes.json');

class AllDishesController {
  async getAllDishes(req, res) {
    try {
      const page = parseInt(req.query.page) - 1 || 0;
      const limit = parseInt(req.query.limit) || 200;
      const search = req.query.search || '';

      const alldishes = await AllDishes.find({
        title: { $regex: search, $options: 'i' },
      })
        .skip(page * limit)
        .limit(limit);

      const total = await AllDishes.countDocuments({
        title: { $regex: search, $options: 'i' },
      });

      const response = {
        error: false,
        total,
        page: page + 1,
        limit,
        alldishes,
      };

      res.status(200).json(response);
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
  }
}

// const insertAllDishes = async () => {
//   try {
//     const docs = await AllDishes.insertMany(alldishes);
//     return Promise.resolve(docs);
//   } catch (e) {
//     return Promise.reject(err);
//   }
// };

// insertAllDishes()
//   .then((docs) => console.log(docs))
//   .catch((err) => console.log(err));

module.exports = new AllDishesController();
