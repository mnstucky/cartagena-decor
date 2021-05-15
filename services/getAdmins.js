const mongoose = require('mongoose');
const Admin = require('./admins.js');

export default async function getAdmins() {
  // Connect to DB
  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .catch((err) => console.error(err));
  // Get notifications of connection errors
  mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error: '));

  // Return all admins
  const rawAdmins = await Admin.find({})
    .select({ _id: 0, __v: 0 });
  const admins = JSON.stringify(rawAdmins);
  return rawAdmins;
}
