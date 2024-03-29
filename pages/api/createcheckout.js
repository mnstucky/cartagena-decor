/* eslint-disable no-restricted-syntax */
const stripe = require("stripe")(process.env.STRIPE_TEST_SECRET);

const shippingRates = {
  0: "shr_1JI3wSJpFLurhJIAyY4e2AMj",
  5: "shr_1JF9DgJpFLurhJIAXsiygSCb",
  6: "shr_1JFs4aJpFLurhJIAfe6yAMle",
  7: "shr_1JF9EQJpFLurhJIA8QGY7N8p",
  8: "shr_1JFs51JpFLurhJIAzdyyzxO7",
  9: "shr_1JFs5PJpFLurhJIAMrjB6ehE",
  10: "shr_1JFs5cJpFLurhJIAP08lMN6a",
  11: "shr_1JFs7IJpFLurhJIA12HpgEW5",
  12: "shr_1JFs7cJpFLurhJIALLyds4Cg",
  13: "shr_1JFs7uJpFLurhJIAslWVw7rw",
  14: "shr_1JFs8DJpFLurhJIAa5H1LEYg",
  15: "shr_1JFs8WJpFLurhJIAqCnWHigg",
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    const cartContents = JSON.parse(req.body);
    let use7Shipping = false;
    let useFreeShipping = true;
    const cartMetadata = {};
    for (const item of cartContents) {
      if (item.itemUrl === "ls" || item.name.includes("16 Oz")) {
        use7Shipping = true;
      }
      if (item.itemUrl === "ts") useFreeShipping = true;
      const unformattedSelectionArray = item.option.split(" ");
      unformattedSelectionArray[0] = unformattedSelectionArray[0].toLowerCase();
      const unformattedSelection = unformattedSelectionArray.join("");
      cartMetadata[`${item.itemUrl}-${unformattedSelection}`] = item.quantity;
    }
    const shippingStartValue = use7Shipping ? 7 : 5;
    let shippingRate = cartContents.reduce(
      (acc, cur) => acc + Number(cur.quantity),
      shippingStartValue - 1
    );
    if (useFreeShipping) shippingRate = 0;
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
      dynamic_tax_rates: ["txr_1JFTzdJpFLurhJIAZnWhci1K"],
    }));
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      shipping_rates: [shippingRates[shippingRate]],
      shipping_address_collection: {
        allowed_countries: ["US"],
      },
      line_items: formattedContents,
      mode: "payment",
      success_url: `${process.env.NEXTAUTH_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/cart`,
      metadata: cartMetadata,
      allow_promotion_codes: true,
    });

    res.send({ id: session.id });
  }
}
