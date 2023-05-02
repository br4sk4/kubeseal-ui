import { Box } from "@mui/material"
import ApplicationBar from "./components/ApplicationBar"
import ViewContainer from "./components/ViewContainer"

function Application() {
    return (
        <Box sx={{ width: "100vw", height: "100vh", minWidth: "1400px", overwflowX: "auto" }}>
            <ApplicationBar />
            <ViewContainer />
        </Box>
    )
}

export default Application
