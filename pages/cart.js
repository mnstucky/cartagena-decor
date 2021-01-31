import React from 'react';
import DecrementButton from '../components/DecrementButton';
import IncrementButton from '../components/IncrementButton';

function Cart({
  cart,
  setCart,
}) {
  const imgStyle = {
    height: 150,
  };

  function incrementQuantity(name, option) {
    const newCart = cart.map((cartItem) => {
      if (cartItem.name === name && cartItem.option === option) {
        const updatedItem = {
          name: cartItem.name,
          price: cartItem.price,
          option: cartItem.option,
          images: cartItem.images,
          itemUrl: cartItem.itemUrl,
          quantity: cartItem.quantity + 1,
        };
        return updatedItem;
      }
      return cartItem;
    });
    setCart(newCart);
  }

  let cartContents = cart.map((item) =>
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
        <p>{item.name}</p>
        <p>{`Selected Option: ${item.option}`}</p>
      </div>
      <div className="column">

      </div>
      <div className="column">
        <p>{`Price: $${item.price}`}</p>
        <span className="is-flex is-justify-flex-start is-align-content-center">
          <DecrementButton name={item.name} option={item.option} quantity={item.quantity} cart={cart} setCart={setCart}/>
          <p>{item.quantity}</p>
          <IncrementButton name={item.name} option={item.option} cart={cart} setCart={setCart}/>
        </span>
      </div>
    </div>
  );
  if (cart.length === 0) {
    cartContents = <p>Your cart is empty.</p>;
  }

  return (
    <div className="container">
      <h1 className="title is-4 mt-2">Cart</h1>
      <div className="box">
        {cartContents}
      </div>
    </div>
  );
}

export default Cart;
