const stripe = require('stripe')('sk_test_51IpzwDAh1yeccWEtuiPcesCNBrFErskmqmlntUKzQFq3VxxTPnCBWqmmDMxmIRwAhXGnYBnqklGj9o2QePLvkx9N00zGzy974C');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'T-shirt',
            },
            unit_amount: 2000,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:3000/',
      cancel_url: 'http://localhost:3000/',
    });

    res.send({ id: session.id });
  }
}
