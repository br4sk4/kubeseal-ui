import { Box, Grid } from "@mui/material"
import { styled } from "@mui/material/styles"

const FormBox = styled(Box)(() => ({
    width: "100%",
    height: "100%",
}))

const SelectionBox = styled(Box)(({ theme }) => ({
    width: "100%",
    height: "60px",
    border: "solid 1px",
    borderColor: theme.palette.neutral.border,
    borderRadius: "10px",
    padding: "10px",
}))

const EditorBox = styled(Box)(({ theme }) => ({
    width: "100%",
    height: "calc(100% - 80px)",
    border: "solid 1px",
    borderColor: theme.palette.neutral.border,
    borderRadius: "10px",
    marginTop: "20px",
    paddingBottom: "15px",
}))

function SealingForm() {
    return (
        <FormBox>
            <SelectionBox />
            <FormBox>
                <Grid display="container" sx={{ height: "100%" }} columns={12}>
                    <Grid item container xs={6}>
                        <EditorBox sx={{ marginRight: "10px" }} />
                    </Grid>
                    <Grid item container xs={6}>
                        <EditorBox sx={{ marginLeft: "10px" }} />
                    </Grid>
                </Grid>
            </FormBox>
        </FormBox>
    )
}

export default SealingForm
