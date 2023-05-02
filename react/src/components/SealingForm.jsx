import { Box, Grid, Stack } from "@mui/material"
import { styled } from "@mui/material/styles"
import CodeEditor from "../widgets/CodeEditor"
import FormButton from "../widgets/FormButton"
import ProjectSelection from "../widgets/ProjectSelection"

const FormBox = styled(Box)(() => ({
    width: "100%",
    height: "100%",
}))

const SelectionBox = styled(Box)(({ theme }) => ({
    width: "100%",
    height: "60px",
    padding: "10px",
    border: "solid 1px",
    borderRadius: "10px",
    borderColor: theme.palette.neutral.border,
}))

const EditorBox = styled(Box)(({ theme }) => ({
    width: "100%",
    height: "calc(100% - 80px)",
    marginTop: "20px",
    paddingBottom: "15px",
    border: "solid 1px",
    borderRadius: "10px",
    borderColor: theme.palette.neutral.border,
    backgroundColor: theme.palette.neutral.main,
}))

function SealingForm() {
    return (
        <FormBox>
            <SelectionBox>
                <Box sx={{ flexGrow: 1 }}>
                    <Stack direction="row" spacing="10px">
                        <Box sx={{ flexGrow: 1 }}>
                            <ProjectSelection />
                        </Box>
                        <Box sx={{ width: "120px" }}>
                            <FormButton variant="outlined" color="primary" sx={{ width: "100%", height: "40px" }}>
                                Reencrypt
                            </FormButton>
                        </Box>
                        <Box sx={{ width: "120px" }}>
                            <FormButton variant="outlined" color="primary" sx={{ width: "100%", height: "40px" }}>
                                Seal
                            </FormButton>
                        </Box>
                    </Stack>
                </Box>
            </SelectionBox>
            <FormBox>
                <Grid display="container" sx={{ height: "100%" }} columns={12}>
                    <Grid item container xs={6}>
                        <EditorBox sx={{ marginRight: "10px" }}>
                            <CodeEditor id="sourceSecret" title="Source Secret" />
                        </EditorBox>
                    </Grid>
                    <Grid item container xs={6}>
                        <EditorBox sx={{ marginLeft: "10px" }}>
                            <CodeEditor id="sealedSecret" title="Sealed Secret" />
                        </EditorBox>
                    </Grid>
                </Grid>
            </FormBox>
        </FormBox>
    )
}

export default SealingForm
