import { getSession } from 'next-auth/client';
import getAdmins from '../../services/getAdmins';

const mongoose = require('mongoose');
const Item = require('../../services/items.js');

export default async (req, res) => {
  const session = await getSession({ req });
  const admins = await getAdmins();
  if (session && admins.some((admin) => admin.email === session?.user?.email)) {
    if (req.method === 'DELETE') {
      // Connect to the DB
      await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
        .catch((err) => console.error(err));
      const {
        url,
      } = JSON.parse(req.body);
      Item.deleteOne({ url }, (err) => {
        if (err) {
          console.error(err);
          res.send({
            error: 'Something went wrong.',
          });
        } else {
          res.send({
            message: 'Item deleted.',
          });
        }
      });
    }
  } else {
    res.send({
      error: 'You must be logged in to view this page.',
    });
  }
};
