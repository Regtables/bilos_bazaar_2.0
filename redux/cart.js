import { createSlice } from '@reduxjs/toolkit';


const cartSlice = createSlice({
	name: 'cart',
	initialState: {
		toggleCart: false,
		toggleDetailedCart: false,
		cartItems: {},
		totalCartItems: 0,
		cartTotal: 0,
	},
	reducers: {
		clearCart: (state, action) => {
			state.cartItems = {}
			state.totalCartItems = 0
			state.cartTotal = 0
		},
		toggleCart: (state, action) => {
			state.toggleCart = action.payload;
		},
		toggleDetailedCart: (state, action) => {
			state.toggleDetailedCart = action.payload
		},
		addCartItem: (state, action) => {
			const { sku } = action.payload.variant;
			const id = sku;
			const qty = action.payload.qty;
			const { price } = action.payload.item;

			if (state.cartItems[sku]) {
				state.cartItems[sku].qty = state.cartItems[sku].qty + qty;
				state.cartTotal = state.cartTotal + qty * price;
				state.totalCartItems = state.totalCartItems + qty;
			} else {
				state.cartItems[sku] = action.payload;
				state.cartTotal = state.cartTotal + qty * price;
				state.totalCartItems = state.totalCartItems + qty;
			}
		},
		removeCartItem: (state, action) => {
			console.log(action.payload)
			const { sku } = action.payload.variant;
			const qty = action.payload.qty;
			const { price } = action.payload.item;
			const totalQty = state.cartItems[sku].qty

			const cartItems = Object.values(state.cartItems).filter(({ variant }) => variant.sku !== sku);

			const newCartItems = {};

			for (let i = 0; i < cartItems.length; i++) {
				newCartItems[cartItems[i].variant.sku] = cartItems[i];
			}

			state.cartItems = newCartItems;
			state.cartTotal = state.cartTotal - qty * price;
			state.totalCartItems = state.totalCartItems - totalQty
		},
		incQty: (state, action) => {
			const { sku } = action.payload.variant;
			const { price } = action.payload.item;

			state.cartItems[sku].qty = state.cartItems[sku].qty + 1;
			state.cartTotal = state.cartTotal + price;
			state.totalCartItems = state.totalCartItems + 1;
		},
		decQty: (state, action) => {
			const { sku } = action.payload.variant;
			const { price } = action.payload.item;

			state.cartItems[sku].qty = state.cartItems[sku].qty - 1;
			state.cartTotal = state.cartTotal - price;
			state.totalCartItems = state.totalCartItems - 1;

			if (state.cartItems[sku].qty === 0) {
				const cartItems = Object.values(state.cartItems).filter(({ variant }) => variant.sku !== sku);

				const newCartItems = {};

				for (let i = 0; i < cartItems.length; i++) {
					newCartItems[cartItems[i].variant.sku] = cartItems[i];
				}

				state.cartItems = newCartItems;
			}
		},
	},
});

export const selectCartItems = (state) => state.cart.cartItems;
export const selectShowCart = (state) => state.cart.toggleCart;
export const selectShowDetailedCart = (state) => state.cart.toggleDetailedCart;
export const selectCartTotal = (state) => state.cart.cartTotal;
export const selectTotalCartItems = (state) => state.cart.totalCartItems;

export const { addCartItem, toggleCart, toggleDetailedCart, removeCartItem, incQty, decQty, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
