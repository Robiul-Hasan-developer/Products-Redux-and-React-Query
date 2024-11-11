const { createSlice } = require("@reduxjs/toolkit")

const initialState = {
    items: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const product = action.payload;
            const itemIndex = state.items.findIndex((item) => item.id === product.id);

            if(itemIndex === -1) {
                state.items.push({...product, quantity: 1});
            } else {
                state.items.splice(itemIndex, 1);
            }
        },

        incrementQuantity: (state, action) => {
            const productId = action.payload;
            const item = state.items.find((item) => item.id === productId);
            if(item) {
                item.quantity = item.quantity + 1;
            }
        },
        decrementQuantity: (state, action) => {
            const productId = action.payload;
            const item = state.items.find((item) => item.id === productId);

            if(item && item.quantity > 1) {
                item.quantity = item.quantity - 1;
            } else if (item && item.quantity === 1) {
                state.items = state.items.filter((item) => item.id !== productId);
            }
        },

        removeToCart: (state, action) => {
            const productId = action.payload;
            state.items = state.items.filter((item) => item.id !== productId);
        }
    }
});

export default cartSlice.reducer;
export const { addToCart, incrementQuantity, decrementQuantity, removeToCart} = cartSlice.actions;