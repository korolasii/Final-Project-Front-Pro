import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isVisible: false,
};

const signUpFormStatusSlice = createSlice({
    name: 'signUp',
    initialState,
    reducers: {
        toggleMenu: (state) => {
            state.isVisible = !state.isVisible; 
        },
    },
});

export const { toggleMenu } = signUpFormStatusSlice.actions;
export default signUpFormStatusSlice.reducer;