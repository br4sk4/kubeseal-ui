import { AppBar, Box, Stack, Typography } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import LightModeIcon from "@mui/icons-material/LightModeOutlined"
import DarkModeIcon from "@mui/icons-material/DarkModeOutlined"
import secretImage from "../assets/secret.png"
import { ColorModeContext } from "../ApplicationProvider"
import { useContext } from "react"
import FormButton from "../widgets/FormButton"

function ApplicationBar() {
    const theme = useTheme()
    const colorMode = useContext(ColorModeContext)

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color="primary" enableColorOnDark>
                <Box sx={{ height: "60px", padding: "10px" }}>
                    <Stack direction="row" spacing="15px">
                        <Box
                            component="img"
                            sx={{
                                height: 40,
                                width: 40,
                                maxHeight: { xs: 40, md: 40 },
                                maxWidth: { xs: 40, md: 40 },
                            }}
                            src={secretImage}
                        />
                        <Typography
                            component="div"
                            sx={{
                                flexGrow: "1",
                                fontSize: "14pt",
                                fontWeight: "bold",
                                lineHeight: "40px",
                            }}>
                            KubeSeal UI
                        </Typography>
                        <FormButton
                            onClick={colorMode.toggleColorMode}
                            sx={{
                                padding: "0",
                                minWidth: "40px",
                                width: "40px",
                                height: "40px",
                            }}
                            variant="contained"
                            color="neutral">
                            {theme.palette.mode === "dark" ? (
                                <LightModeIcon sx={{ width: "16px", height: "16px" }} />
                            ) : (
                                <DarkModeIcon sx={{ width: "16px", height: "16px" }} />
                            )}
                        </FormButton>
                    </Stack>
                </Box>
            </AppBar>
        </Box>
    )
}

export default ApplicationBar
