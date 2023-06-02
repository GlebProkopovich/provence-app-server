const Croissants = require('../models/croissants-model');
// const croissants = require('../../client/src/croissants.json');

class CroissantsController {
  async getCroissants(req, res) {
    try {
      const page = parseInt(req.query.page) - 1 || 0;
      const limit = parseInt(req.query.limit) || 8;
      const search = req.query.search || '';

      const croissants = await Croissants.find({
        title: { $regex: search, $options: 'i' },
      })
        .skip(page * limit)
        .limit(limit);

      const total = await Croissants.countDocuments({
        title: { $regex: search, $options: 'i' },
      });

      const response = {
        error: false,
        total,
        page: page + 1,
        limit,
        croissants,
      };

      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
  }
}

// const insertCroissants = async () => {
//   try {
//     const docs = await Croissants.insertMany(croissants);
//     return Promise.resolve(docs);
//   } catch (e) {
//     return Promise.reject(err);
//   }
// };

// insertCroissants()
//   .then((docs) => console.log(docs))
//   .catch((err) => console.log(err));

module.exports = new CroissantsController();
