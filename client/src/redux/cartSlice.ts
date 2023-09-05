import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartState {
  items: CartItem[]; // Assuming CartItem is the type you defined for a cart item
}

// Define the initial state
const initialState: CartItem[] = [];

// Create the slice
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const existingItemIndex = state.findIndex(
        (item) => item.id === action.payload.id
      );
      if (existingItemIndex > -1) {
        // Update quantity if the item already exists
        state[existingItemIndex].quantity += action.payload.quantity;
      } else {
        // Add the new item to the cart
        state.push(action.payload);
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      return state.filter((item) => item.id !== action.payload);
    },
    updateItemQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const existingItemIndex = state.findIndex(
        (item) => item.id === action.payload.id
      );
      if (existingItemIndex > -1) {
        state[existingItemIndex].quantity = action.payload.quantity;
      }
    },
    clearCart: (state) => {
      return initialState;
    },
  },
});

// Export the actions
export const { addItem, removeItem, updateItemQuantity, clearCart } = cartSlice.actions;

export const selectCart = (state: { cart: CartState }) => state.cart.items;

// Export the reducer
export default cartSlice.reducer;

// Define the CartItem type
export type CartItem = {
  id: string;
  name: string;
  price: number;
  imgUrl: string;
  quantity: number;
};
