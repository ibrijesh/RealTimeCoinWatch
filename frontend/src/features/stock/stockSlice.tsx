import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CounterState {
  value: any;
}

const initialState: CounterState = {
  value : [{"info": "Shark teeth are embedded in the gums rather than directly affixed to the jaw, and are constantly replaced throughout life.", "source": "https://en.wikipedia.org/wiki/Shark"}],
};

export const stockSlice = createSlice({
  name: 'stock',
  initialState,
  reducers: {
    updateStock: (state, action: PayloadAction<any>) => {
      state.value = action.payload;
    }
  },
});

export const { updateStock } = stockSlice.actions;

export default stockSlice.reducer;
