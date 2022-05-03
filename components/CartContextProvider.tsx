import React, { useState, createContext } from "react";
import { CartContextType, CartItem } from "../types";

export const CartContext = createContext<CartContextType>({ cart: [] });

const CartContextProvider = (props) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
