// noinspection HtmlUnknownTarget

import React, { useContext } from "react";
import Link from "next/link";
import { loadStripe } from "@stripe/stripe-js";
import DecrementCartButton from "../components/DecrementCartButton";
import IncrementCartButton from "../components/IncrementCartButton";
import Subtotal from "../components/Subtotal";
import RemoveButton from "../components/RemoveButton";
import { CartContext } from "../components/CartContextProvider";
import CartImage from "../components/CartImage";
import Error from "../components/Error";

const stripePromise = loadStripe(
  "pk_test_51JC8iGJpFLurhJIAsOGokWyTuMcR3yYN0VZPmjVh5wCCAFINNwP1cUplm9RMD5480wgRSe6n4ulNZQyZ30SYt4t000Atdc6wrR"
);

function Cart() {
  const { cart } = useContext(CartContext);
  // eslint-disable-next-line consistent-return
  async function handleCheckout() {
    const stripe = await stripePromise;
    const response = await fetch("/api/createcheckout", {
      method: "POST",
      body: JSON.stringify(cart),
    });
    const session = await response.json();
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });
    if (result.error) {
      return (
        <Error
          message={`The following error occurred: ${result.error.message}`}
        />
      );
    }
  }
  let cartContents;
  if (cart.length === 0) {
    cartContents = <p>Your cart is empty.</p>;
  } else {
    cartContents = cart.map((item) => (
      <section key={item.itemUrl}>
        <div className="columns mb-0">
          <div className="column is-one-quarter">
            <CartImage item={item} />
          </div>
          <div className="column">
            <Link href={`/${item.itemUrl}`}>
              <a className="has-text-weight-bold has-text-black">{item.name}</a>
            </Link>
            <p>
              {item.option !== "default" && `Selected Option: ${item.option}`}
            </p>
            <p>{`$${item.price}`}</p>
          </div>
          <div className="column">
            <span className="is-flex is-justify-content-flex-end is-align-content-center">
              <DecrementCartButton
                name={item.name}
                option={item.option}
                quantity={item.quantity}
              />
              <p className="is-size-6 pt-1 pb-1 pl-3 pr-3">{item.quantity}</p>
              <IncrementCartButton name={item.name} option={item.option} />
              <RemoveButton name={item.name} option={item.option} />
            </span>
          </div>
        </div>
        <hr className="navbar-divider mt-0" />
      </section>
    ));
  }
  return (
    <div className="container pr-3 pl-3">
      <h1 className="title is-4 mt-2">Cart</h1>
      <div className="box">
        {cartContents}
        <div className="is-flex is-justify-content-flex-end is-align-items-center">
          <Link href="/shop/">
            <button type="button" className="button is-link mb-2">
              Keep Shopping
            </button>
          </Link>
        </div>
        <div className="is-flex is-justify-content-flex-end is-align-items-center">
          <Subtotal cart={cart} />
          <button
            type="button"
            className="button is-primary ml-3"
            onClick={handleCheckout}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
