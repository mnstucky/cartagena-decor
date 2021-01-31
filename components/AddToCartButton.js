import React from 'react';

function AddToCartButton({
  cart,
  setCart,
  item,
  selection,
  itemUrl,
}) {
  function addToCart() {
    let updatedItem = false;
    const newCart = cart.map((cartItem) => {
      if (cartItem.name === item.name && cartItem.option === selection) {
        const itemToAdd = {
          name: item.name,
          price: item.price,
          option: selection,
          images: item.images,
          itemUrl,
          quantity: cartItem ? cartItem.quantity + 1 : 1,
        };
        updatedItem = true;
        return itemToAdd;
      }
      return cartItem;
    });
    if (!updatedItem) {
      const itemToAdd = {
        name: item.name,
        price: item.price,
        option: selection,
        images: item.images,
        itemUrl,
        quantity: 1,
      };
      newCart.push(itemToAdd);
    }
    setCart(newCart);
  }

  return (
    <button type="button" className="button is-primary ml-2" onClick={addToCart}>
      Add to Cart
    </button>
  );
}

export default AddToCartButton;
