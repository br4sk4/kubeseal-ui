import { createSlice } from "@reduxjs/toolkit"
import { PaletteMode } from "@mui/material"

export interface ThemeState {
    colorMode: PaletteMode
}

const initialState: ThemeState = {
    colorMode: localStorage.getItem("kubeseal-ui-color-mode") === "light" ? "light" : "dark",
}

export const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        toggleColorMode: state => {
            const colorMode: PaletteMode = state.colorMode === "dark" ? "light" : "dark"
            localStorage.setItem("kubeseal-ui-color-mode", colorMode)
            state.colorMode = colorMode
        },
    },
})

export const { toggleColorMode } = themeSlice.actions

export default themeSlice.reducer
