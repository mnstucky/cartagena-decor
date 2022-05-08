import React, { useState, createContext } from "react";
import { CartContextType, CartItem, ProductVariant } from "../types";

export const CartContext = createContext<CartContextType>({
  cart: [],
  cartSize: 0,
  subtotal: 0,
});

const CartContextProvider = (props) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const addToCart = (product: ProductVariant, quantity: number) => {
    const existingItemIdx = cart.findIndex(
      (oldItem) => oldItem.product.slug.current === product.slug.current
    );
    if (existingItemIdx !== -1) {
      const cartCopy = [...cart];
      cartCopy[existingItemIdx] = {
        product,
        quantity: cartCopy[existingItemIdx].quantity + quantity,
      };
      setCart(cartCopy);
    } else {
      setCart([...cart, { product, quantity }]);
    }
  };
  const removeFromCart = (product: ProductVariant, quantity: number) => {
    const existingItemIdx = cart.findIndex(
      (oldItem) => oldItem.product.slug.current === product.slug.current
    );
    if (existingItemIdx === -1) return;
    if (cart[existingItemIdx].quantity - quantity <= 0) {
      const newCart = cart
        .slice(0, existingItemIdx)
        .concat(cart.slice(existingItemIdx + 1));
      setCart(newCart);
    } else {
      const cartCopy = [...cart];
      cartCopy[existingItemIdx] = {
        product,
        quantity: cartCopy[existingItemIdx].quantity - quantity,
      };
      setCart(cartCopy);
    }
  };
  const cartSize = cart.reduce((acc, cur) => acc + cur.quantity, 0);
  const subtotal = cart.reduce(
    (acc, cur) => acc + cur.quantity * cur.product.price,
    0
  );
  return (
    <CartContext.Provider
      value={{ cart, setCart, addToCart, removeFromCart, cartSize, subtotal }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
