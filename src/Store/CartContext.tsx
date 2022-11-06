import React, { useReducer } from "react";
import Item from "../models/items";

interface ICartContext {
  items: { [key: string] : any };
  totalAmount: number;
  totalQuantitiy: number;
  addItem: (item:{item:Item, amount:number})=>void;
  removeItem:(id:string)=>void;
}
const CartContext = React.createContext<ICartContext>({
  items:{},
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

const cartReducer = (state: any, action: any) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.item.price * action.item.amount;

    let updatedItems = { ...state.items };
    const updatedTotalQuantitiy = state.totalQuantitiy + action.item.amount;
    if (action.item.item.id in updatedItems) {
      updatedItems[action.item.item.id].amount += action.item.amount;
    } else {
      updatedItems[action.item.item.id] = action.item;
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
      totalQuantitiy: updatedTotalQuantitiy,
    };
  }
  if (action.type === "REMOVE") {


    let updatedItems = {...state.items};
    let updatedTotalAmount = state.totalAmount;
    let updatedTotalQuantitiy=state.totalQuantitiy;

    if(updatedItems[action.id]){
        updatedTotalAmount = state.totalAmount - updatedItems[action.id].item.price;
        updatedTotalQuantitiy = state.totalQuantitiy - 1;
        if(updatedItems[action.id].amount>1){
        
            updatedItems[action.id].amount-=1;
        }else if(updatedItems[action.id].amount===1){
       
            delete updatedItems[action.id]
        }
    }


    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
      totalQuantitiy: updatedTotalQuantitiy,
    };
  }

  return defaultCartState;
};

export const CartProvider = (props: any) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item: any) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemFromCartHandler = (id: string) => {
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
