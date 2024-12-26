import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isVisible: false,
};

const menuStatusSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        toggleMenu: (state) => {
            state.isVisible = !state.isVisible; 
        },
    },
});

export const { toggleMenu } = menuStatusSlice.actions;
export default menuStatusSlice.reducer;