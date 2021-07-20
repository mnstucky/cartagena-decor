/* eslint-disable no-await-in-loop */
const stripe = require("stripe")(process.env.STRIPE_TEST_SECRET);
const mongoose = require("mongoose");
const Order = require("../../services/orders.js");
const Item = require("../../services/items.js");

export default async function handler(req, res) {
  if (req.method === "GET") {
    // Get order information from Stripe checkout
    const session = await stripe.checkout.sessions.retrieve(
      req.query.session_id
    );
    const customer = await stripe.customers.retrieve(session.customer);
    const lineItems = await stripe.checkout.sessions.listLineItems(
      req.query.session_id
    );
    const { metadata } = session;
    // Connect to the DB
    await mongoose
      .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .catch((err) => console.error(err));

    // Prepare Stripe data for storage
    const { name, email, address, shipping } = customer;
    const { amount_subtotal: subtotal, amount_total: total } = session;
    const formattedLineItems = lineItems.data.map((item) => ({
      description: item.description,
      quantity: item.quantity,
      subtotal: item.amount_subtotal,
      total: item.amount_total,
    }));
    // Update quantities in DB
    // eslint-disable-next-line no-restricted-syntax
    for (const url of Object.keys(metadata)) {
      const urlArray = url.split("-");
      const uniqueUrl = urlArray[0];
      const unformattedSelection = urlArray[1];
      const itemToUpdate = await Item.findOne({ url: uniqueUrl });
      if (unformattedSelection === "default") {
        itemToUpdate.stock -= metadata[url];
      } else {
        const currentStock = itemToUpdate.multiples.options.get(
          unformattedSelection
        );
        itemToUpdate.multiples.options.set(
          unformattedSelection,
          currentStock - metadata[url]
        );
      }
      await itemToUpdate.save();
    }
    // Create Order to save to DB
    const newOrder = new Order({
      name,
      email,
      address: {
        city: address.city,
        country: address.country,
        line1: address.line1,
        line2: address.line2,
        postal_code: address.postal_code,
        state: address.state,
      },
      shipping: {
        address: {
          city: shipping.address.city,
          country: shipping.address.country,
          line1: shipping.address.line1,
          line2: shipping.address.line2,
          postal_code: shipping.address.postal_code,
          state: shipping.address.state,
        },
        name: shipping.name,
        phone: shipping.phone,
        hasShipped: false,
        tracking: "",
        shippingType: "",
      },
      subtotal,
      total,
      items: formattedLineItems,
      date: new Date(),
    });

    // Save order to DB
    try {
      const response = await newOrder.save();
      res.send({
        session,
        customer,
        message: "Order saved.",
      });
    } catch (err) {
      res.send({
        session,
        customer,
        error: "Something went wrong saving your order.",
      });
    }
  }
}
