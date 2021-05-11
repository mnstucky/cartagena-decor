import React, { useContext } from 'react';
import Link from 'next/link';
import { loadStripe } from '@stripe/stripe-js';
import DecrementCartButton from '../components/DecrementCartButton';
import IncrementCartButton from '../components/IncrementCartButton';
import Subtotal from '../components/Subtotal';
import RemoveButton from '../components/RemoveButton';
import { CartContext } from '../components/CartContextProvider';
import CartImage from '../components/CartImage';

const stripePromise = loadStripe('pk_test_51IpzwDAh1yeccWEtIig7AKjgidmx64ismOoTdlpj99ZRUSO17RZCc1lyHuVOrU8ihzyAnzUegojZna9xbmARVSPT00n2GQ7Tnn');

function Cart() {
  const { cart } = useContext(CartContext);
  async function handleCheckout(event) {
    const stripe = await stripePromise;
    const response = await fetch('/api/createcheckout', { method: 'POST' });
    const session = await response.json();
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });
    if (result.error) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
    }
  }
  let cartContents;
  if (cart.length === 0) {
    cartContents = <p>Your cart is empty.</p>;
  } else {
    cartContents = cart.map((item) => (
      <section>
        <div className="columns mb-0">
          <div className="column is-one-quarter">
            <CartImage item={item} />
          </div>
          <div className="column">
            <Link href={`/${item.itemUrl}`}>
              <a className="has-text-weight-bold has-text-black">{item.name}</a>
            </Link>
            <p>{item.option !== 'default' && `Selected Option: ${item.option}`}</p>
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
              <IncrementCartButton
                name={item.name}
                option={item.option}
              />
              <RemoveButton
                name={item.name}
                option={item.option}
              />
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
          <Subtotal cart={cart} />
          <button type="button" className="button is-primary ml-3" onClick={handleCheckout}>Checkout</button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
