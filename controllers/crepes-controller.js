const Crepes = require('../models/crepes-model');
// const crepes = require('../../client/src/crepes.json');

class CrepesController {
  async getCrepes(req, res) {
    try {
      const page = parseInt(req.query.page) - 1 || 0;
      const limit = parseInt(req.query.limit) || 8;
      const search = req.query.search || '';

      const crepes = await Crepes.find({
        title: { $regex: search, $options: 'i' },
      })
        .skip(page * limit)
        .limit(limit);

      const total = await Crepes.countDocuments({
        title: { $regex: search, $options: 'i' },
      });

      const response = {
        error: false,
        total,
        page: page + 1,
        limit,
        crepes,
      };

      res.status(200).json(response);
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
  }
}

// const insertCrepes = async () => {
//   try {
//     const docs = await Crepes.insertMany(crepes);
//     return Promise.resolve(docs);
//   } catch (e) {
//     return Promise.reject(err);
//   }
// };

// insertCrepes()
//   .then((docs) => console.log(docs))
//   .catch((err) => console.log(err));

module.exports = new CrepesController();
