import { Alert, Box, Grid, Snackbar, Stack } from "@mui/material"
import { styled } from "@mui/material/styles"
import CodeEditor from "../widgets/CodeEditor"
import FormButton from "../widgets/FormButton"
import ProjectSelection from "../widgets/ProjectSelection"
import SealingService from "../services/SealingService"
import { useEffect, useState } from "react"

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
    const [notification, setNotification] = useState({ open: false, message: "" })
    const [project, setProject] = useState("")
    const [projects, setProjects] = useState([])
    const [sourceSecret, setSourceSecret] = useState("")
    const [sealedSecret, setSealedSecret] = useState("")

    useEffect(() => {
        SealingService.getProjects()
            .then((response) => {
                setProjects(response.projects)
            })
            .catch((error) => {
                console.log(error)
                setNotification({
                    open: true,
                    message: error,
                })
            })
    }, [])

    const onProjectSelectionChange = (value) => {
        setProject(value)
    }

    const onSourceSecretEditorChange = (value) => {
        setSourceSecret(value)
    }

    const onSealButtonClick = () => {
        setSealedSecret("")
        SealingService.sealSecret({
            project: project,
            sourceSecret: sourceSecret,
        })
            .then((response) => {
                setSealedSecret(response.sealedSecret)
            })
            .catch((error) => {
                console.log(error)
                setNotification({
                    open: true,
                    message: error,
                })
            })
    }

    const onReencryptButtonClick = () => {
        setSealedSecret("")
        SealingService.reencryptSecret({
            project: project,
            sourceSecret: sourceSecret,
        })
            .then((response) => {
                setSealedSecret(response.sealedSecret)
            })
            .catch((error) => {
                console.log(error)
                setNotification({
                    open: true,
                    message: error,
                })
            })
    }

    const closeNotification = (event, reason) => {
        if (reason === "clickaway") {
            return
        }

        setNotification({
            open: false,
            message: "",
        })
    }

    return (
        <FormBox>
            <SelectionBox>
                <Box sx={{ flexGrow: 1 }}>
                    <Stack direction="row" spacing="10px">
                        <Box sx={{ flexGrow: 1 }}>
                            <ProjectSelection
                                options={projects}
                                onChange={(value) => onProjectSelectionChange(value)}
                            />
                        </Box>
                        <Box sx={{ width: "120px" }}>
                            <FormButton
                                variant="outlined"
                                color="primary"
                                sx={{ width: "100%", height: "40px" }}
                                onClick={() => onReencryptButtonClick()}>
                                Reencrypt
                            </FormButton>
                        </Box>
                        <Box sx={{ width: "120px" }}>
                            <FormButton
                                variant="outlined"
                                color="primary"
                                sx={{ width: "100%", height: "40px" }}
                                onClick={() => onSealButtonClick()}>
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
                            <CodeEditor
                                id="sourceSecret"
                                title="Source Secret"
                                onChange={(value) => onSourceSecretEditorChange(value)}
                            />
                        </EditorBox>
                    </Grid>
                    <Grid item container xs={6}>
                        <EditorBox sx={{ marginLeft: "10px" }}>
                            <CodeEditor
                                id="sealedSecret"
                                title="Sealed Secret"
                                content={sealedSecret}
                                readOnly={true}
                            />
                        </EditorBox>
                    </Grid>
                </Grid>
            </FormBox>
            <Snackbar
                open={notification.open}
                autoHideDuration={5000}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                onClose={closeNotification}>
                <Alert onClose={closeNotification} severity="error" sx={{ width: "100%" }}>
                    {notification.message}
                </Alert>
            </Snackbar>
        </FormBox>
    )
}

export default SealingForm
