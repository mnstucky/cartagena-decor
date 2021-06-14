import { getSession } from 'next-auth/client';
import getAdmins from '../../services/getAdmins';

const mongoose = require('mongoose');
const Item = require('../../services/items.js');

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
        description, features, highlights, url, stock, price, selection, category,
      } = JSON.parse(req.body);
      const unformattedSelectionArray = selection.split(' ');
      unformattedSelectionArray[0] = unformattedSelectionArray[0].toLowerCase();
      const unformattedSelection = unformattedSelectionArray.join('');
      const itemToUpdate = await Item.findOne({ url });
      itemToUpdate.description = description;
      itemToUpdate.features = features;
      itemToUpdate.highlights = highlights;
      itemToUpdate.price = price;
      itemToUpdate.category = category;
      if (selection === 'default') {
        itemToUpdate.stock = stock;
      } else {
        itemToUpdate.multiples.options.set(unformattedSelection, stock);
      }
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
