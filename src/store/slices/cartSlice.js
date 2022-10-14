import { createSlice } from '@reduxjs/toolkit';

const initialState = [];
const cartSlice = createSlice({
  name: 'CART',
  initialState,
  reducers: {
    updateCartItem: (state, action) => {
      const itemID = state.map((items) => items.id).indexOf(action.payload.id);
      if (itemID >= 0) {
        state[itemID] = action.payload;
      } else {
        state.push(action.payload);
      }
    },
    deleteCartItem: (state, action) => {
      const itemID = state.map((items) => items.id).indexOf(action.payload.id);
      state.splice(itemID, 1);
    },
  },
});
export const { updateCartItem, deleteCartItem } = cartSlice.actions;
export default cartSlice.reducer;
