import React, { useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import DecrementButton from '../components/DecrementButton';
import IncrementButton from '../components/IncrementButton';
import Subtotal from '../components/Subtotal';
import RemoveButton from '../components/RemoveButton';
import { CartContext } from '../components/CartContextProvider';

function Cart() {
  const imgStyle = {
    height: 150,
  };
  const { cart } = useContext(CartContext);
  let cartContents = cart.map((item) => (
    <section>
      <div className="columns mb-0">
        <div className="column is-one-quarter">
          <Link href={`/${item.itemUrl}`}>
            <a>
              <Image
                className="image"
                height="150"
                width="225"
                style={imgStyle}
                src={
                  // If an item option doesn't have an associated image, or no option is selected,
                  //  display a default image
              !item.images.includes(`${item.itemUrl}_${item.option.replaceAll(' ', '').toLowerCase()}.JPG`) || item.option === undefined || item.option === 'default'
                ? `/images/${item.images[0]}`
                : `/images/${item.itemUrl}_${item.option
                  .replaceAll(' ', '')
                  .toLowerCase()}.JPG`
            }
                alt="Product for sale"
              />
            </a>
          </Link>
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
            <DecrementButton
              name={item.name}
              option={item.option}
              quantity={item.quantity}
            />
            <p className="is-size-6 pt-1 pb-1 pl-3 pr-3">{item.quantity}</p>
            <IncrementButton
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
  if (cart.length === 0) {
    cartContents = <p>Your cart is empty.</p>;
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
