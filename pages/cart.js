import React from 'react';
import DecrementButton from '../components/DecrementButton';
import IncrementButton from '../components/IncrementButton';
import Subtotal from '../components/Subtotal';

function Cart({
  cart,
  setCart,
}) {
  const imgStyle = {
    height: 150,
  };
  let cartContents = cart.map((item) => (
    <div className="columns">
      <div className="column">
        <img
          className="image"
          style={imgStyle}
          src={item.option === undefined || item.option === 'default' ? `/images/${item.images[0]}` : `/images/${item.itemUrl}_${item.option.replace(' ', '')
            .toLowerCase()}.JPG`}
          alt="Product for sale"
        />
      </div>
      <div className="column">
        <p className="has-text-weight-bold">{item.name}</p>
        <p>{`Selected Option: ${item.option}`}</p>
        <p>{`$${item.price}`}</p>
      </div>
      <div className="column" />
      <div className="column">
        <span className="is-flex is-justify-flex-start is-align-content-center">
          <DecrementButton name={item.name} option={item.option} quantity={item.quantity} cart={cart} setCart={setCart} />
          <p className={'is-size-6 pt-1 pb-1 pl-3 pr-3'}>{item.quantity}</p>
          <IncrementButton name={item.name} option={item.option} cart={cart} setCart={setCart} />
        </span>
      </div>
    </div>
  ));
  if (cart.length === 0) {
    cartContents = <p>Your cart is empty.</p>;
  }

  return (
    <div className="container">
      <h1 className="title is-4 mt-2">Cart</h1>
      <div className="box">
        {cartContents}
        <div className="is-flex is-justify-content-flex-end">
          <Subtotal cart={cart}/>
        </div>
      </div>
    </div>
  );
}

export default Cart;
