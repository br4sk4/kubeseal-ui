import { createStore } from "solid-js/store"
import { Box, css, Flex, Grid, GridItem, HStack } from "@hope-ui/solid"
import CodeEditor from "../widgets/CodeEditor"
import FormButton from "../widgets/FormButton"
import SealingService from "../services/SealingService"
import FormSelect from "../widgets/FormSelect"
import { onMount } from "solid-js"

const boxCSS = css({
    width: "100%",
    height: "100%",
    backgroundColor: "$background",
})

const actionBoxCSS = css({
    width: "100%",
    height: "60px",
    border: "solid 1px $neutral9",
    borderRadius: "$lg",
    padding: "10px",
})

const editorBoxCSS = css({
    width: "100%",
    height: "calc(100% - 80px)",
    backgroundColor: "$neutral1",
    border: "solid 1px $neutral9",
    borderRadius: "$lg",
    marginTop: "20px",
    paddingBottom: "15px",
})

function SealingForm() {
    const [store, setStore] = createStore({
        project: "",
        projects: [],
        sourceSecret: "",
        sealedSecret: "",
    })

    onMount(() => {
        SealingService.getProjects()
            .then((response) => {
                setStore({
                    project: store.project,
                    projects: response.projects,
                    sourceSecret: store.sourceSecret,
                    sealedSecret: store.sealedSecret,
                })
            })
            .catch((error) => {
                // TODO (br4sk4): implement frontend notifications
                console.log(error)
            })
    })

    const onSourceSecretEditorChange = (value) => {
        setStore({
            project: store.project,
            projects: store.projects,
            sourceSecret: value,
            sealedSecret: store.sealedSecret,
        })
    }

    const onSealButtonClick = () => {
        SealingService.sealSecret({
            project: store.project,
            sourceSecret: store.sourceSecret,
        })
            .then((response) => {
                setStore({
                    project: store.project,
                    projects: store.projects,
                    sourceSecret: store.sourceSecret,
                    sealedSecret: response.sealedSecret,
                })
            })
            .catch((error) => {
                // TODO (br4sk4): implement frontend notifications
                console.log(error)
            })
    }

    const onProjectSelectionChange = (value) => {
        setStore({
            project: value,
            projects: store.projects,
            sourceSecret: store.sourceSecret,
            sealedSecret: store.sealedSecret,
        })
    }

    return (
        <Box class={boxCSS()}>
            <Box class={boxCSS()}>
                <Box class={actionBoxCSS()}>
                    <Flex>
                        <Box flex="1" marginRight="10px">
                            <FormSelect
                                width="100%"
                                options={store.projects}
                                onChange={(value) =>
                                    onProjectSelectionChange(value)
                                }
                            />
                        </Box>
                        <Box>
                            <HStack spacing="10px">
                                <FormButton
                                    id="reencryptButton"
                                    text="Reencrypt"
                                    width="120px"
                                />
                                <FormButton
                                    id="sealButton"
                                    text="Seal"
                                    width="120px"
                                    onClick={() => onSealButtonClick()}
                                />
                            </HStack>
                        </Box>
                    </Flex>
                </Box>
                <Grid height="100%" templateColumns="repeat(2, 1fr)" gap="20px">
                    <GridItem w="100%" h="100%">
                        <Box class={editorBoxCSS()}>
                            <CodeEditor
                                id="sourceSecret"
                                title="Source Secret"
                                content={store.sourceSecret}
                                onChange={(value) =>
                                    onSourceSecretEditorChange(value)
                                }
                            />
                        </Box>
                    </GridItem>
                    <GridItem w="100%" h="100%">
                        <Box class={editorBoxCSS()}>
                            <CodeEditor
                                id="sealedSecret"
                                title="Sealed Secret"
                                content={store.sealedSecret}
                                readOnly={true}
                            />
                        </Box>
                    </GridItem>
                </Grid>
            </Box>
        </Box>
    )
}

export default SealingForm
