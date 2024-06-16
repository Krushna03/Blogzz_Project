import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    themeMode : 'light'
}

const ThemeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        lightTheme: (state) => {
            state.themeMode = 'light';
        },
        darkTheme: (state) => {
            state.themeMode = 'dark';
        }
     }
})

export const {lightTheme, darkTheme} = ThemeSlice.actions;

export default ThemeSlice.reducer; 