import React, { useReducer } from "react";

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  totalQuantitiy: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
});

const defaultCartState = {
  items: {},
  totalAmount: 0,
  totalQuantitiy: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.Item.price * action.item.amount;

    let updatedItems = { ...state.items };
    const updatedTotalQuantitiy = state.totalQuantitiy + action.item.amount;
    if (action.item.Item.id in updatedItems) {
      updatedItems[action.item.Item.id].amount += action.item.amount;
    } else {
      updatedItems[action.item.Item.id] = action.item;
    }
    console.log(updatedItems);
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
      totalQuantitiy: updatedTotalQuantitiy,
    };
  }
  if (action.type === "REMOVE") {

    let updatedItems = state.items;
    const updatedTotalAmount = state.totalAmount - updatedItems[action.id].item.price;
    const updatedTotalQuantitiy = state.totalQuantitiy - updatedItems[action.id].price;
    if(updatedItems[action.id].amount>1){
        updatedItems[action.id].amount-=1;
    }else{
        delete updatedItems[action.id]
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
      totalQuantitiy: updatedTotalQuantitiy,
    };
  }

  return defaultCartState;
};

export const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    totalQuantitiy: cartState.totalQuantitiy,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContext;
