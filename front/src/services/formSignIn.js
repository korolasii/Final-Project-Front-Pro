import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isVisible: false,
};

const signInFormStatusSlice = createSlice({
    name: 'signIn',
    initialState,
    reducers: {
        toggleMenu: (state) => {
            state.isVisible = !state.isVisible; 
        },
    },
});

export const { toggleMenu } = signInFormStatusSlice.actions;
export default signInFormStatusSlice.reducer;