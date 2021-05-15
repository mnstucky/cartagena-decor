const mongoose = require('mongoose');
const Admin = require('../../services/admins.js');

export default async function handler(req, res) {
  // Connect to DB
  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .catch((err) => console.error(err));
  // Get notifications of connection errors
  mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error: '));

  // Return all admins
  Admin.find({})
    .select({ _id: 0, __v: 0 })
    .exec((err, items) => {
      const formattedItems = JSON.stringify(items);
      res.json(formattedItems);
    });
}
