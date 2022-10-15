import { createSlice } from '@reduxjs/toolkit';

const initialState = { value: 'name' };
const sortSlice = createSlice({
  name: 'SORT',
  initialState,
  reducers: {
    sortItems: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const { sortItems } = sortSlice.actions;
export default sortSlice.reducer;
