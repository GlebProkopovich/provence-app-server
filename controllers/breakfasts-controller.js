const Breakfasts = require('../models/breakfasts-model');
// const breakfasts = require('../../client/src/breakfasts.json');

class BreakfastController {
  async getBreakfasts(req, res) {
    try {
      const page = parseInt(req.query.page) - 1 || 0;
      const limit = parseInt(req.query.limit) || 8;
      const search = req.query.search || '';

      const breakfasts = await Breakfasts.find({
        title: { $regex: search, $options: 'i' },
      })
        .skip(page * limit)
        .limit(limit);

      const total = await Breakfasts.countDocuments({
        title: { $regex: search, $options: 'i' },
      });

      const response = {
        error: false,
        total,
        page: page + 1,
        limit,
        breakfasts,
      };

      res.status(200).json(response);
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
  }
}

// const insertBreakfasts = async () => {
//   try {
//     const docs = await Breakfasts.insertMany(breakfasts);
//     return Promise.resolve(docs);
//   } catch (e) {
//     return Promise.reject(err);
//   }
// };

// insertBreakfasts()
//   .then((docs) => console.log(docs))
//   .catch((err) => console.log(err));

module.exports = new BreakfastController();
