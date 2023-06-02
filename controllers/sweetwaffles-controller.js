const SweetWaffles = require('../models/sweetwaffles-model');
// const sweetWaffles = require('../../client/src/sweetwaffles.json');

class SweetWafflesController {
  async getSweetWaffles(req, res) {
    try {
      const page = parseInt(req.query.page) - 1 || 0;
      const limit = parseInt(req.query.limit) || 8;
      const search = req.query.search || '';

      const sweetwaffles = await SweetWaffles.find({
        title: { $regex: search, $options: 'i' },
      })
        .skip(page * limit)
        .limit(limit);

      const total = await SweetWaffles.countDocuments({
        title: { $regex: search, $options: 'i' },
      });

      const response = {
        error: false,
        total,
        page: page + 1,
        limit,
        sweetwaffles,
      };

      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
  }
}

// const insertSweetWaffles = async () => {
//   try {
//     const docs = await SweetWaffles.insertMany(sweetWaffles);
//     return Promise.resolve(docs);
//   } catch (e) {
//     return Promise.reject(err);
//   }
// };

// insertSweetWaffles()
//   .then((docs) => console.log(docs))
//   .catch((err) => console.log(err));

module.exports = new SweetWafflesController();
