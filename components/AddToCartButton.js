import React, { useState, useEffect, useContext } from "react";
import { ProductVariant } from "../types";
import { CartContext } from "./CartContextProvider";

interface Props {
  item: ProductVariant;
  quantity?: number;
}

function AddToCartButton({ item, quantity = 1 }: Props) {
  const { cart, setCart } = useContext(CartContext);
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
          maxQuantity: !item.multiples.hasMultiples
            ? item.stock
            : item.multiples.options[
                selection.charAt(0).toLowerCase() +
                  selection.slice(1).replace(" ", "")
              ],
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
        maxQuantity: !item.multiples.hasMultiples
          ? item.stock
          : item.multiples.options[
              selection.charAt(0).toLowerCase() +
                selection.slice(1).replace(" ", "")
            ],
      };
      newCart.push(itemToAdd);
    }
    localStorage.setItem("cart", JSON.stringify(newCart));
    setCart(newCart);
    setButtonContent("Item Added");
    setIsDisabled(true);
    setCartButtonVisibility(true);
  }

  return (
    <button
      type="button"
      className="button is-primary"
      onClick={addToCart}
      disabled={isDisabled}
    >
      {buttonContent}
    </button>
  );
}

export default AddToCartButton;
