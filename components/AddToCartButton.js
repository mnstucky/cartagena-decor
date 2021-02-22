import React, { useState, useEffect } from 'react';

function AddToCartButton({
  cart,
  setCart,
  item,
  selection,
  itemUrl,
  setCartButtonVisibility,
  quantity,
}) {
  const [buttonContent, setButtonContent] = useState('Add to Cart');
  const [isDisabled, setIsDisabled] = useState(item.multiples.hasMultiples && selection === 'default');
  useEffect(() => {
    if (selection !== 'default') {
      setIsDisabled(false);
    } else if (item.multiples.hasMultiples) {
      setIsDisabled(true);
    }
  }, [selection]);
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
          quantity: cartItem ? cartItem.quantity + quantity : quantity,
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
        quantity,
      };
      newCart.push(itemToAdd);
    }
    localStorage.setItem('cart', JSON.stringify(newCart));
    setCart(newCart);
    setButtonContent('Item Added');
    setIsDisabled(true);
    setCartButtonVisibility(true);
  }

  return (
    <button type="button" className="button is-primary" onClick={addToCart} disabled={isDisabled}>
      {buttonContent}
    </button>
  );
}

export default AddToCartButton;
