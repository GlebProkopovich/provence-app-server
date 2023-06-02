const WaffleSandwiches = require('../models/wafflesandwiches-model');
// const wafflesandwiches = require('../../client/src/wafflesandwich.json');

class WaffleSandwichesController {
  async getWaffleSandwiches(req, res) {
    try {
      const page = parseInt(req.query.page) - 1 || 0;
      const limit = parseInt(req.query.limit) || 8;
      const search = req.query.search || '';

      const wafflesandwiches = await WaffleSandwiches.find({
        title: { $regex: search, $options: 'i' },
      })
        .skip(page * limit)
        .limit(limit);

      const total = await WaffleSandwiches.countDocuments({
        title: { $regex: search, $options: 'i' },
      });

      const response = {
        error: false,
        total,
        page: page + 1,
        limit,
        wafflesandwiches,
      };

      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
  }
}

// const insertWaffleSandwiches = async () => {
//   try {
//     const docs = await WaffleSandwiches.insertMany(wafflesandwiches);
//     return Promise.resolve(docs);
//   } catch (e) {
//     return Promise.reject(err);
//   }
// };

// insertWaffleSandwiches()
//   .then((docs) => console.log(docs))
//   .catch((err) => console.log(err));

module.exports = new WaffleSandwichesController();
