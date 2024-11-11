
const { createSlice } = require("@reduxjs/toolkit")

const initialState = {
    value: 0,
}

const counterSlice = createSlice({
    name: 'counters',
    initialState,
    reducers: {
        increment: (state) => {
            state.value++
        },
        decrement: (state) => {
            if(state.value > 0) {
                state.value--
            }
        }
    }
});

export default counterSlice.reducer;
export const {increment, decrement} = counterSlice.actions; 