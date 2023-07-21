import {
  ADD_TO_CART,
  CLEAR_CART,
  REMOVE_ALL_FROM_CART,
  REMOVE_ONE_FROM_CART,
  ADD_TO_CART_LOCAL,
} from "../action-type/action-types";

export const addToCart = (data) => {
  const prevLocalCart = JSON.parse(localStorage.getItem("shoppingCart")) || [];

  const isAlreadyInCart = prevLocalCart.some((item) => item.id === data.id);

  if (!isAlreadyInCart) {
    const mergedCart = [...prevLocalCart, data];
    localStorage.setItem("shoppingCart", JSON.stringify(mergedCart));
  }
  return { type: ADD_TO_CART, payload: data };
};

export const addFromStorage = (data) => {
  return { type: ADD_TO_CART_LOCAL, payload: data };
};

export const delFromCart = (id, all = false) => {
  const prevLocalCart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
  let updatedCart = [];

  if (all) {
    updatedCart = prevLocalCart.filter((item) => item.id !== id);
  } else {
    const indexToRemove = prevLocalCart.findIndex((item) => item.id === id);
    if (indexToRemove !== -1) {
      updatedCart = [
        ...prevLocalCart.slice(0, indexToRemove),
        ...prevLocalCart.slice(indexToRemove + 1),
      ];
    }
  }

  localStorage.setItem("shoppingCart", JSON.stringify(updatedCart));

  // Devolver el objeto de acción modificado
  return all
    ? { type: REMOVE_ALL_FROM_CART, payload: id }
    : { type: REMOVE_ONE_FROM_CART, payload: id };
};

export const clearCart = () => {
  // Realizar operación de limpieza en el localStorage
  localStorage.removeItem("shoppingCart");

  // Devolver el objeto de acción
  return { type: CLEAR_CART };
};
