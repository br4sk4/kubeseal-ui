import { Box, Container } from "@mui/material"
import SealingForm from "./SealingForm"

function ViewContainer() {
    return (
        <Container sx={{ minWidth: "1400px", padding: "0" }}>
            <Box sx={{ height: "calc(100vh - 60px)", padding: "25px 0", margin: "0" }}>
                <SealingForm />
            </Box>
        </Container>
    )
}

export default ViewContainer
