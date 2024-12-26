import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    redirectTo: null,
};

const navigationSlice = createSlice({
    name: 'navigation',
    initialState,
    reducers: {
        redirect: (state, action) => {
            state.redirectTo = action.payload;
        },
        clearRedirect: (state) => {
            state.redirectTo = null;
        },
    },
});

export const { redirect, clearRedirect } = navigationSlice.actions;
export default navigationSlice.reducer;
