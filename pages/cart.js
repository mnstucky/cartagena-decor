import React from 'react';

function Cart({
  cart,
  setCart,
}) {
  const imgStyle = {
    height: 150,
  };
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
          <button type="button" className="button is-primary is-light pr-4">-</button>
          <p>{item.quantity}</p>
          <button type="button" className="button is-primary is-light pl-4">+</button>
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
