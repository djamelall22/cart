import React, { useState, useContext, useReducer, useEffect } from "react";
import cartItems from "./data";
import reducer from "./reducer";
const url = "https://course-api.com/react-useReducer-cart-project";
const AppContext = React.createContext();

const intialState = {
  cart: cartItems,
  loading: false,
  totalItems: 0,
  totalSum: 0,
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, intialState);

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const removeItem = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  const incrementItem = (id) => {
    dispatch({ type: "INCREMENT_ITEM", payload: id });
  };

  const decrementItem = (id) => {
    dispatch({ type: "DECREMENT_ITEM", payload: id });
  };

  useEffect(() => {
    dispatch({ type: "GET_TOTALS" });
  }, [state.cart]);

  const fetchData = async () => {
    dispatch({ type: "LOADING" });
    try {
      const response = await fetch(url);
      const cart = await response.json();
      dispatch({ type: "DISPLAY_ITEMS", payload: cart });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        removeItem,
        incrementItem,
        decrementItem,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
