import { createSlice } from '@reduxjs/toolkit';

const savedUser = localStorage.getItem('user');

const initialUserState = savedUser ? JSON.parse(savedUser) : {
    id: null,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    goat: [],
    like: [],
};

const userSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: {
        setUser(state, action) {
            const userData = action.payload;
            localStorage.setItem('user', JSON.stringify(userData));
            return { ...state, ...userData };
        },
        setGoat(state, action) {
            state.goat = Array.isArray(state.goat) ? [...state.goat, action.payload] : [action.payload];
            localStorage.setItem('user', JSON.stringify(state));
        },
        setLike(state, action) {
            state.like = Array.isArray(state.like) ? [...state.like, action.payload] : [action.payload];
            localStorage.setItem('user', JSON.stringify(state));
        },
        updateUserData(state, action) {
            state.goat = action.payload.goat;
            state.like = action.payload.like;
            localStorage.setItem('user', JSON.stringify(state));
        },
        logoutUser(state) {
            localStorage.removeItem('user');
            return { id: null, firstName: '', lastName: '', email: '', phone: '', goat: [], like: [] };
        },
    }
});


export const { setUser,updateUserData, logoutUser, setGoat, setLike } = userSlice.actions;

export default userSlice.reducer;
