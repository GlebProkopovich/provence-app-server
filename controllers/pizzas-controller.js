const Pizzas = require('../models/pizzas-model');
// const pizzas = require('../../client/src/pizzas.json');

class PizzasController {
  async getPizzas(req, res) {
    try {
      const page = parseInt(req.query.page) - 1 || 0;
      const limit = parseInt(req.query.limit) || 8;
      const search = req.query.search || '';

      const pizzas = await Pizzas.find({
        title: { $regex: search, $options: 'i' },
      })
        .skip(page * limit)
        .limit(limit);

      const total = await Pizzas.countDocuments({
        title: { $regex: search, $options: 'i' },
      });

      const response = {
        error: false,
        total,
        page: page + 1,
        limit,
        pizzas,
      };

      res.status(200).json(response);
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
  }
}

// const insertPizzas = async () => {
//   try {
//     const docs = await Pizzas.insertMany(pizzas);
//     return Promise.resolve(docs);
//   } catch (e) {
//     return Promise.reject(err);
//   }
// };

// insertPizzas()
//   .then((docs) => console.log(docs))
//   .catch((err) => console.log(err));

module.exports = new PizzasController();
