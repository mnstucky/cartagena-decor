import { getSession } from "next-auth/client";
import getAdmins from "../../services/getAdmins";

const mongoose = require("mongoose");
const Order = require("../../services/orders.js");

export default async function handler(req, res) {
  // Validate admin user
  const session = await getSession({ req });
  const admins = await getAdmins();
  if (!admins.some((admin) => admin.email === session?.user?.email)) {
    res.json({
      error:
        "You must be signed in as an administrator to retrieve all orders.",
    });
    return;
  }
  // Connect to DB
  await mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .catch((err) => console.error(err));
  // Get notifications of connection errors
  mongoose.connection.on(
    "error",
    console.error.bind(console, "MongoDB connection error: ")
  );
  // Handle requests
  const { query } = req;
  if (req.method === "GET") {
    // If no parameter is used, return all orders
    if (Object.keys(query).length === 0) {
      Order.find({})
        .sort({ date: -1 })
        .exec((err, orders) => {
          const formattedOrders = JSON.stringify(orders);
          res.json(formattedOrders);
        });
    }
  } else {
    // Handle other HTTP methods
  }
}
