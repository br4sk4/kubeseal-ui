import Application from "./Application"
import { CssBaseline } from "@mui/material"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { createContext, useMemo, useState } from "react"

export const ColorModeContext = createContext({
    toggleColorMode: () => {},
})

function ApplicationProvider() {
    let initialColorMode = localStorage.getItem("kubeseal-ui-color-mode")

    if (initialColorMode === null || initialColorMode === "") {
        initialColorMode = "dark"
        localStorage.setItem("kubeseal-ui-color-mode", initialColorMode)
    }

    const [colorMode, setColorMode] = useState(initialColorMode)

    const toggleColorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setColorMode((prevMode) => {
                    const nextMode = prevMode === "light" ? "dark" : "light"
                    localStorage.setItem("kubeseal-ui-color-mode", nextMode)
                    return nextMode
                })
            },
        }),
        []
    )

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: colorMode,
                    background: {
                        ...(colorMode === "dark" && {
                            default: "#1e1e1e",
                        }),
                        ...(colorMode === "light" && {
                            default: "#fffffe",
                        }),
                    },
                    primary: {
                        main: "#009485",
                        contrastText: "#ffffff",
                    },
                    neutral: {
                        ...(colorMode === "dark" && {
                            main: "#151617",
                            dark: "#151617",
                            border: "#697177",
                            contrastText: "#ffffff",
                        }),
                        ...(colorMode === "light" && {
                            main: "#eae9e8",
                            light: "#eae9e8",
                            border: "#697177",
                            contrastText: "#000000",
                        }),
                    },
                },
            }),
        [colorMode]
    )

    return (
        <ColorModeContext.Provider value={toggleColorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Application />
            </ThemeProvider>
        </ColorModeContext.Provider>
    )
}

export default ApplicationProvider
