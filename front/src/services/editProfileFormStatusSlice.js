import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isVisible: false, 
};

const editProfileFormSlice = createSlice({
    name: 'editProfileForm',
    initialState,
    reducers: {
        toggleEditProfileForm(state) {
            state.isVisible = !state.isVisible;
        },
    },
});

export const { toggleEditProfileForm } = editProfileFormSlice.actions;
export default editProfileFormSlice.reducer;
