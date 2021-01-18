const mongoose = require("mongoose");
const { Schema } = mongoose;

// Connect to DB
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch(err => console.error(err));

// Get notifications of connection errors
mongoose.connection.on("error", console.error.bind(console, "MongoDB connection error: "));

export default function handler(req, res) {
  if (req.method === "GET") {

  } else if (req.method == "POST") {

  } else {
    // Handle other HTTP methods
  }
}
