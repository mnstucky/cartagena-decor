import { getSession } from 'next-auth/client';
import getAdmins from '../../services/getAdmins';

const mongoose = require('mongoose');
const Order = require('../../services/orders.js');

export default async (req, res) => {
  const session = await getSession({ req });
  const admins = await getAdmins();
  if (session && admins.some((admin) => admin.email === session?.user?.email)) {
    if (req.method === 'POST') {
      // Connect to the DB
      await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
        .catch((err) => console.error(err));
      const {
        id, trackingNumber,
      } = JSON.parse(req.body);
      const itemToUpdate = await Order.findOne({ _id: id });
      itemToUpdate.shipping.tracking = trackingNumber;
      itemToUpdate.shipping.hasShipped = true;
      const updatedItem = await itemToUpdate.save();
      if (updatedItem === itemToUpdate) {
        res.send({
          message: 'Order successfully updated.',
        });
      } else {
        res.send({
          error: 'There was a problem updating the order.',
        });
      }
    }
  } else {
    res.send({
      error: 'You must be logged in to view this page.',
    });
  }
};
