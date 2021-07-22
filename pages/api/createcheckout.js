/* eslint-disable no-restricted-syntax */
const stripe = require("stripe")(process.env.STRIPE_TEST_SECRET);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const cartContents = JSON.parse(req.body);
    let use7Shipping = false;
    const cartMetadata = {};
    for (const item of cartContents) {
      if (item.itemUrl === "ls" || item.name.includes("16 Oz")) {
        use7Shipping = true;
      }
      const unformattedSelectionArray = item.option.split(" ");
      unformattedSelectionArray[0] = unformattedSelectionArray[0].toLowerCase();
      const unformattedSelection = unformattedSelectionArray.join("");
      cartMetadata[`${item.itemUrl}-${unformattedSelection}`] = item.quantity;
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
      tax_rates: ["txr_1JFTzdJpFLurhJIAZnWhci1K"],
    }));
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      shipping_rates: use7Shipping
        ? ["shr_1JF9EQJpFLurhJIA8QGY7N8p"]
        : ["shr_1JF9DgJpFLurhJIAXsiygSCb"],
      shipping_address_collection: {
        allowed_countries: ["US"],
      },
      line_items: formattedContents,
      mode: "payment",
      success_url: `${process.env.NEXTAUTH_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/cart`,
      metadata: cartMetadata,
    });

    res.send({ id: session.id });
  }
}

// TODO: Enable taxes
// TODO: Make stripe keys environment variables
// TODO: Shipping, add an extra dollar on top of base price per unit
