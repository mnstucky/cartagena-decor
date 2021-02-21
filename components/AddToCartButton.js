import React, { useState } from 'react';

function AddToCartButton({
  cart,
  setCart,
  item,
  selection,
  itemUrl,
}) {
  const [buttonContent, setButtonContent] = useState('Add to Cart');
  const [isDisabled, setIsDisabled] = useState(false);
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
    localStorage.setItem('cart', JSON.stringify(newCart));
    setCart(newCart);
    setButtonContent('Item Added');
    setIsDisabled(true);
  }

  return (
    <button type="button" className="button is-primary ml-2" onClick={addToCart} disabled={isDisabled}>
      {buttonContent}
    </button>
  );
}

export default AddToCartButton;
