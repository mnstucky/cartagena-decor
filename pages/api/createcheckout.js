const stripe = require("stripe")(process.env.STRIPE_TEST_SECRET);
// TODO: Update URL for production

export default async function handler(req, res) {
  if (req.method === "POST") {
    const cartContents = JSON.parse(req.body);
    let use7Shipping = false;
    for (const item of cartContents) {
      if (item.itemUrl === "ls" || item.name.includes("16 Oz")) {
        use7Shipping = true;
      }
    }
    const formattedContents = cartContents.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: `${item.name} ${
            item.option !== "default" ? `| ${item.option}` : ""
          }`,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      // TODO: Incorporate additional logic to handle different shipping rates, if desired
      shipping_rates: use7Shipping
        ? ["shr_1JF81jJpFLurhJIATK6T3X8D"]
        : ["shr_1JEHRJJpFLurhJIA1gvl8B3i"],
      shipping_address_collection: {
        allowed_countries: ["US"],
      },
      line_items: formattedContents,
      mode: "payment",
      success_url: `${process.env.NEXTAUTH_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/cart`,
    });

    res.send({ id: session.id });
  }
}
