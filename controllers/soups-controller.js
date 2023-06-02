const Soups = require('../models/soups-model');
// const soups = require('../../client/src/soups.json');

class SoupsController {
  async getSoups(req, res) {
    try {
      const page = parseInt(req.query.page) - 1 || 0;
      const limit = parseInt(req.query.limit) || 8;
      const search = req.query.search || '';

      const soups = await Soups.find({
        title: { $regex: search, $options: 'i' },
      })
        .skip(page * limit)
        .limit(limit);

      const total = await Soups.countDocuments({
        title: { $regex: search, $options: 'i' },
      });

      const response = {
        error: false,
        total,
        page: page + 1,
        limit,
        soups,
      };

      res.status(200).json(response);
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
  }
}

// const insertSoups = async () => {
//   try {
//     const docs = await Soups.insertMany(soups);
//     return Promise.resolve(docs);
//   } catch (e) {
//     return Promise.reject(err);
//   }
// };

// insertSoups()
//   .then((docs) => console.log(docs))
//   .catch((err) => console.log(err));

module.exports = new SoupsController();
