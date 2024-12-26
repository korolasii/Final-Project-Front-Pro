import { configureStore } from '@reduxjs/toolkit';
import navigationReducer from './NavigationSlice';
import menuStatus from './MenuStatusSlice';
import formSignUp from './formSignUp';
import formSignIn from './formSignIn';
import userReducer from './userSlice';
import editProfileFormStatusReducer from './editProfileFormStatusSlice';
import elementsReducer from './elementsSlice';

const store = configureStore({
    reducer: {
        navigation: navigationReducer,
        menuStatus: menuStatus,
        formSignUp: formSignUp,
        formSignIn: formSignIn,
        user: userReducer,
        editProfileFormStatus: editProfileFormStatusReducer,
        elements: elementsReducer,
    },
});

export default store;
