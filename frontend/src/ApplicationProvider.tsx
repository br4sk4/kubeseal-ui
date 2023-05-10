import Application from "./Application"
import { CssBaseline } from "@mui/material"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { useMemo } from "react"
import { useSelector } from "react-redux"

declare module "@mui/material/styles" {
    interface Palette {
        neutral: Palette["primary"];
    }

    // allow configuration using `createTheme`
    interface PaletteOptions {
        neutral?: PaletteOptions["primary"];
    }

    interface PaletteColor {
        border?: string
    }
}

function ApplicationProvider() {
    const colorMode = useSelector((state: any) => state.theme.colorMode)

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
                        ...{
                            main: "#151617",
                            border: "#697177",
                            contrastText: "#ffffff",
                        },
                        ...(colorMode === "light" && {
                            main: "#eae9e8",
                            contrastText: "#000000",
                        }),
                    },
                },
            }),
        [colorMode],
    )

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Application />
        </ThemeProvider>
    )
}

export default ApplicationProvider
