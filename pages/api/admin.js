import { getSession } from 'next-auth/client';

const mongoose = require('mongoose');
const Item = require('../../services/items.js');

export default async (req, res) => {
  const session = await getSession({ req });
  if (session) {
    if (req.method === 'POST') {
    // Connect to the DB
      await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
        .catch((err) => console.error(err));
      const {
        description, features, highlights, url,
      } = JSON.parse(req.body);
      const itemToUpdate = await Item.findOne({ url });
      itemToUpdate.description = description;
      itemToUpdate.features = features;
      itemToUpdate.highlights = highlights;
      const updatedItem = await itemToUpdate.save();
      if (updatedItem === itemToUpdate) {
        res.send({
          message: 'Item successfully updated.',
        });
      }
    }
  } else {
    res.send({
      error: 'You must be logged in to view this page.',
    });
  }
};
