import { getSession } from 'next-auth/client';

const mongoose = require('mongoose');
const Order = require('../../services/orders.js');

export default async function handler(req, res) {
  // Get user info
  const session = await getSession({ req });
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
    // If no id parameter is used, return all orders for signed-in user by email address
    if (Object.keys(query).length === 0) {
      Order.find({ email: session.user.email })
        .exec((err, orders) => {
          const formattedOrders = JSON.stringify(orders);
          res.json(formattedOrders);
        });
    }
  } else {
    // Handle other HTTP methods
  }
}
