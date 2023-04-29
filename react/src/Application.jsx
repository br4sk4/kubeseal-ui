import { Box } from "@mui/material"
import ApplicationBar from "./components/ApplicationBar.jsx"

function Application() {
    return (
        <Box width="100vw" height="100vh" minWidth="1344px" overwflow-x="auto">
            <ApplicationBar />
        </Box>
    )
}

export default Application
