const reducer = (state, action) => {
  // clear the cart
  if (action.type === "CLEAR_CART") {
    return { ...state, cart: [] };
  }

  // remove an item from the cart
  if (action.type === "REMOVE_ITEM") {
    const filtredCart = state.cart.filter((cartItem) => {
      return cartItem.id !== action.payload;
    });
    return { ...state, cart: filtredCart };
  }

  // increment (+) cart item by 1
  if (action.type === "INCREMENT_ITEM") {
    const incItem = state.cart.map((cartItem) => {
      if (cartItem.id === action.payload) {
        return { ...cartItem, amount: cartItem.amount + 1 };
      }
      return cartItem;
    });
    return { ...state, cart: incItem };
  }

  // decrement (-) cart item by 1
  if (action.type === "DECREMENT_ITEM") {
    const decItem = state.cart
      .map((cartItem) => {
        if (cartItem.id === action.payload) {
          return { ...cartItem, amount: cartItem.amount - 1 };
        }
        return cartItem;
      })
      .filter((cartItem) => cartItem.amount !== 0);
    return { ...state, cart: decItem };
  }

  // get num of items in the cart and their sum
  if (action.type === "GET_TOTALS") {
    let { totalItems, totalSum } = state.cart.reduce(
      (acc, CurrentCartItem) => {
        const { amount, price } = CurrentCartItem;
        acc.totalItems += amount;
        acc.totalSum += amount * price;
        return acc;
      },
      {
        totalItems: 0,
        totalSum: 0,
      }
    );
    totalSum = parseFloat(totalSum.toFixed(2));
    return { ...state, totalItems, totalSum };
  }

  if (action.type === "LOADING") {
    return { ...state, loading: true };
  }

  if (action.type === "DISPLAY_ITEMS") {
    return { ...state, cart: action.payload, loading: false };
  }

  //end of reducer
  return state;
};

export default reducer;
