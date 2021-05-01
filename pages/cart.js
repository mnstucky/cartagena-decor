import React, { useContext } from 'react';
import Link from 'next/link';
import DecrementCartButton from '../components/DecrementCartButton';
import IncrementCartButton from '../components/IncrementCartButton';
import Subtotal from '../components/Subtotal';
import RemoveButton from '../components/RemoveButton';
import { CartContext } from '../components/CartContextProvider';
import CartImage from '../components/CartImage';

function Cart() {
  const { cart } = useContext(CartContext);
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
        <div className="is-flex is-justify-content-flex-end">
          <Subtotal cart={cart} />
        </div>
      </div>
    </div>
  );
}

export default Cart;
