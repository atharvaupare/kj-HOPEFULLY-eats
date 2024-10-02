/* eslint-disable react/prop-types */
import { useState } from "react";
import cartContext from "./cartContext";

const CartState = (props) => {
  const [items, addItem] = useState([]);

  return (
    <cartContext.Provider value={{ items, addItem }}>
      {props.children}
    </cartContext.Provider>
  );
};

export default CartState;
