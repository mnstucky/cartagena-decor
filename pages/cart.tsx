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
  "pk_live_51JC8iGJpFLurhJIASqy8xOrD2zs7FaKAg4bPLOzVhEdYvtNxeRduyZqd4NmBefV5Iln6kmqmj1Lu9qeEXR48F7ny00Ifzbulua"
);

function Cart() {
  const { cart } = useContext(CartContext);
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
  return null;
}

export default Cart;
