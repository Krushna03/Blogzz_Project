
import {configureStore} from '@reduxjs/toolkit';
import authSlice from './authSlice';
import ThemeSlice from './ThemeSlice';

const store = configureStore({
    reducer: {
        auth : authSlice,
        theme : ThemeSlice
        //TODO: add more slices here for posts
    }
});


export default store;
