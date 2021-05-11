const stripe = require('stripe')(process.env.STRIPE_TEST_SECRET);
// TODO: Update URL for production

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
    const customer = await stripe.customers.retrieve(session.customer);
    res.send({ session, customer });
  }
}
