const WaffleBurgers = require('../models/waffleBurgers-model');
// const waffleburgers = require('../../client/src/waffleBurgers.json');

class WaffleBurgersController {
  async getWaffleBurgers(req, res) {
    try {
      const page = parseInt(req.query.page) - 1 || 0;
      const limit = parseInt(req.query.limit) || 8;
      const search = req.query.search || '';

      const waffleburgers = await WaffleBurgers.find({
        title: { $regex: search, $options: 'i' },
      })
        .skip(page * limit)
        .limit(limit);

      const total = await WaffleBurgers.countDocuments({
        title: { $regex: search, $options: 'i' },
      });

      const response = {
        error: false,
        total,
        page: page + 1,
        limit,
        waffleburgers,
      };

      res.status(200).json(response);
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
  }
}

// const insertWaffleBurgers = async () => {
//   try {
//     const docs = await WaffleBurgers.insertMany(waffleburgers);
//     return Promise.resolve(docs);
//   } catch (e) {
//     return Promise.reject(err);
//   }
// };

// insertWaffleBurgers()
//   .then((docs) => console.log(docs))
//   .catch((err) => console.log(err));

module.exports = new WaffleBurgersController();
