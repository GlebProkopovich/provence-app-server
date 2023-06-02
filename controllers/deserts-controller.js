const Desserts = require('../models/desserts-model');
// const desserts = require('../../client/src/deserts.json');

class DessertsController {
  async getDesserts(req, res) {
    try {
      const page = parseInt(req.query.page) - 1 || 0;
      const limit = parseInt(req.query.limit) || 8;
      const search = req.query.search || '';

      const desserts = await Desserts.find({
        title: { $regex: search, $options: 'i' },
      })
        .skip(page * limit)
        .limit(limit);

      const total = await Desserts.countDocuments({
        title: { $regex: search, $options: 'i' },
      });

      const response = {
        error: false,
        total,
        page: page + 1,
        limit,
        desserts,
      };

      res.status(200).json(response);
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
  }
}

// const insertDesserts = async () => {
//   try {
//     const docs = await Desserts.insertMany(desserts);
//     return Promise.resolve(docs);
//   } catch (e) {
//     return Promise.reject(err);
//   }
// };

// insertDesserts()
//   .then((docs) => console.log(docs))
//   .catch((err) => console.log(err));

module.exports = new DessertsController();
