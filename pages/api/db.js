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
	console.log(query);
	if (req.method === "GET") {
		// If no id parameter is used, return the entire in-stock inventory
		if (Object.keys(query).length === 0) {
			Item.find({}).
			where("stock").gte(0).
			exec(function(err, items) {
				const formattedItems = JSON.stringify(items);	
				res.json(formattedItems);
			});
		// If an id parameter is used, return a single item
		} else {
			console.log(query.id);
			Item.find({ url: query.id }).
			exec(function(err, item) {
				const formattedItem = JSON.stringify(item);
				// console.log(formattedItem);
				res.json(formattedItem);
			})
		}
		console.log(query);
	} else if (req.method == "POST") {

	} else {
    // Handle other HTTP methods
	}
}
