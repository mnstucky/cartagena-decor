const mongoose = require('mongoose');
const Item = require('../../mongoose/items.js');

export default async function handler(req, res) {
  // Connect to DB
  console.log(`The URI is: ${process.env.MONGO_URL}\n`);
  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .catch((err) => console.error(err));
  // Get notifications of connection errors
  console.log("Connected\n");
  mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error: '));
  console.log("Error handling on\n");
  // Handle requests
  const { query } = req;
  if (req.method === 'GET') {
    // If no id parameter is used, return the entire in-stock inventory
    if (Object.keys(query).length === 0) {
      Item.find({})
        .where('stock')
        .gte(0)
        .exec((err, items) => {
          console.log("Query returned\n");
          const formattedItems = JSON.stringify(items);
          console.log("Results formatted\n");
          res.json(formattedItems);
        });
      // If an id parameter is used, return a single item
    } else {
      Item.find({ url: query.id })
        .select({ _id: 0 })
        .exec((err, item) => {
          const formattedItem = JSON.stringify(item);
          res.json(formattedItem);
        });
    }
    // eslint-disable-next-line eqeqeq
  } else if (req.method == 'POST') {

  } else {
    // Handle other HTTP methods
  }
}
