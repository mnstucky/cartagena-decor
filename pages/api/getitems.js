const mongoose = require('mongoose');
const Item = require('../../services/items.js');

export default async function handler(req, res) {
  // Connect to DB
  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .catch((err) => console.error(err));
  // Get notifications of connection errors
  mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error: '));
  // Handle requests
  const { query } = req;
  if (req.method === 'GET') {
    // If no id parameter is used, return the entire in-stock inventory
    if (Object.keys(query).length === 0) {
      Item.find({})
        .where('stock')
        .gte(0)
        .exec((err, items) => {
          const formattedItems = JSON.stringify(items);
          res.json(formattedItems);
        });
      // If an id parameter is used, return a single item
    } else if (query.id) {
      Item.find({ url: query.id })
        .select({ _id: 0 })
        .exec((err, item) => {
          const formattedItem = JSON.stringify(item[0]);
          res.json(formattedItem);
        });
      // If a list parameter is used, return a list of the specified field
    } else if (query.list) {
      Item.find({})
        .distinct(`${query.list}`)
        .exec((err, item) => {
          const formattedItem = JSON.stringify(item);
          res.json(formattedItem);
        });
    }
    // eslint-disable-next-line eqeqeq
  }
}
