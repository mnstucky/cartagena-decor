const mongoose = require('mongoose');

const { Schema } = mongoose;

const adminSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
});

let Admin;
try {
  Admin = mongoose.model('Admin');
} catch {
  Admin = mongoose.model('Admin', adminSchema);
}

module.exports = Admin;
