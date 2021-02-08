const mongoose = require("mongoose");
const { Schema } = mongoose;

const itemSchema = new Schema({
	name: {
	  type: String,
	  required: true,
	},
	category: {
	  type: String,
	  enum: ['coaster', 'tray', 'lazySusan'],
	},
	stock: {
	  type: Number,
	  required: true,
	},
	price: {
	  type: Number,
	  required: true,
	},
	highlights: {
	  type: String,
	},
	description: {
	  type: [String],
	  required: true,
	},
	features: {
	  type: [String],
	},
	multiples: {
	  hasMultiples: {
		type: Boolean,
		required: true,
	  },
	  options: {
		type: Map,
		of: Number,
	  },
	},
	shipping: {
	  type: String,
	},
	rating: {
	  type: Number,
	},
	images: {
	  type: [String],
	  required: true,
	},
	url: {
	  type: String,
	  required: true,
	},
  });		

let Item;
try {
	Item = mongoose.model("Item");
} catch {
	Item = mongoose.model("Item", itemSchema);
}	

module.exports = Item;
