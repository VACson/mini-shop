import { createSlice } from '@reduxjs/toolkit';

const initialState = [];
const cartSlice = createSlice({
  name: 'CART',
  initialState,
  reducers: {
    updateCartItem: (state, action) => {
      const itemID = state.map((items) => items.cartId).indexOf(action.payload.cartId);
      if (itemID >= 0) {
        state[itemID] = action.payload;
        console.log(itemID, state, action.payload, 'found');
      } else {
        state.push(action.payload);
        console.log(itemID, state, action.payload, 'not found');
      }
    },
    deleteCartItem: (state, action) => {
      const itemID = state.map((items) => items.cartId).indexOf(action.payload.cartId);
      state.splice(itemID, 1);
    },
  },
});
export const { updateCartItem, deleteCartItem } = cartSlice.actions;
export default cartSlice.reducer;
