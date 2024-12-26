import { createSlice } from '@reduxjs/toolkit';

const elementsSlice = createSlice({
    name: 'elements',
    initialState: JSON.parse(localStorage.getItem('elements')) || [],
    reducers: {
        addElement(state, action) {
            const newElement = action.payload;
            state.push(newElement);
            localStorage.setItem('elements', JSON.stringify(state));
        },
        deleteElement(state, action) {
            const updatedState = state.filter((el) => el.id !== action.payload);
            localStorage.setItem('elements', JSON.stringify(updatedState));
            return updatedState;
        },
        setElements(state, action) {
            const elements = action.payload;
            localStorage.setItem('elements', JSON.stringify(elements));
            return elements;
        },
    },
});

export const { addElement, deleteElement, setElements } = elementsSlice.actions;

export default elementsSlice.reducer;
