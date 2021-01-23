const mongoose = require("mongoose");
const Item = require("../../mongoose/items.js");

export default async function handler(req, res) {
	// Connect to DB
	await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
		.catch(err => console.error(err));
	// Get notifications of connection errors
	mongoose.connection.on("error", console.error.bind(console, "MongoDB connection error: "));
	// Handle requests
	const query = req.query;
	if (req.method === "GET") {
		// If no REST parameters are used, return the entire inventory
		if (Object.keys(query).length === 0) {
			Item.find({}).
			where("stock").gte(0).
			exec(function(err, items) {
				const formattedItems = JSON.stringify(items);	
				console.log(formattedItems);
				res.json(formattedItems);
			});
		}
	} else if (req.method == "POST") {

	} else {
    // Handle other HTTP methods
	}
}
