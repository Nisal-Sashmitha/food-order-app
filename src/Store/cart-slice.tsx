import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: {},
    totalAmount: 0,
    totalQuantitiy: 0,
  },
  reducers: {
    addItem(state: any, action: any) {
      state.totalAmount += action.payload.item.price * action.payload.amount;
      state.totalQuantitiy += action.payload.amount;

      if (action.payload.item.id in state.items) {
        state.items[action.payload.item.id].amount += action.payload.amount;
      } else {
        state.items[action.payload.item.id] = action.payload;
      }
    },
    removeItem(state: any, action: any) {
      if (state.items[action.payload]) {
        state.totalAmount -= state.items[action.payload].item.price;
        state.totalQuantitiy -= 1;
        if (state.items[action.payload].amount > 1) {
          state.items[action.payload].amount -= 1;
        } else if (state.items[action.payload].amount === 1) {
          delete state.items[action.payload];
        }
      }
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
