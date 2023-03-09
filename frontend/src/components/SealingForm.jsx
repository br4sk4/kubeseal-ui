import { createStore } from "solid-js/store";
import {Box, css, Flex, Grid, GridItem, HStack, Spacer} from "@hope-ui/solid";
import CodeEditor from "../widgets/CodeEditor";
import FormButton from "../widgets/FormButton";
import SealingService from "../services/SealingService";

const boxCSS = css({
    width: "100%",
    height: "100%",
    backgroundColor: "$background"
})

const actionBoxCSS = css({
    width: "100%",
    height: "60px",
    border: "solid 1px $neutral9",
    borderRadius: "$lg",
    padding: "10px"
})

const editorBoxCSS = css({
    width: "100%",
    height: "calc(100% - 80px)",
    backgroundColor: "$neutral1",
    border: "solid 1px $neutral9",
    borderRadius: "$lg",
    marginTop: "20px",
    paddingBottom: "15px"
})

function SealingForm() {
    const [store, setStore] = createStore({
        rawSecret: "",
        sealedSecret: ""
    })

    const onRawSecretEditorChange = (value) => {
        setStore({
            rawSecret: value,
            sealedSecret: store.sealedSecret
        })
    }

    const onSealButtonClick = () => {
        SealingService.sealSecret({
            project: "default",
            rawSecret: store.rawSecret
        }).then((response) => {
            setStore({
                rawSecret: store.rawSecret,
                sealedSecret: response.sealedSecret
            })
        }).catch((error) => {
            // TODO (br4sk4): implement frontend notifications
            console.log(error)
        })
    }

    return (
        <Box class={boxCSS()}>
            <Box class={boxCSS()}>
                <Box class={actionBoxCSS()}>
                    <Flex>
                        <Spacer />
                        <HStack spacing="10px">
                            <FormButton id="reencryptButton" text="Reencrypt" width="120px" />
                            <FormButton id="sealButton" text="Seal" width="120px" onClick={() => onSealButtonClick()} />
                        </HStack>
                    </Flex>
                </Box>
                <Grid height="100%" templateColumns="repeat(2, 1fr)" gap="20px">
                    <GridItem w="100%" h="100%">
                        <Box class={editorBoxCSS()}>
                            <CodeEditor
                                id="rawSecret"
                                title="Raw Secret"
                                content={store.rawSecret}
                                onChange={(value) => onRawSecretEditorChange(value)} />
                        </Box>
                    </GridItem>
                    <GridItem w="100%" h="100%">
                        <Box class={editorBoxCSS()}>
                            <CodeEditor
                                id="sealedSecret"
                                title="Sealed Secret"
                                content={store.sealedSecret}
                                readOnly={true} />
                        </Box>
                    </GridItem>
                </Grid>
            </Box>
        </Box>
    )
}

export default SealingForm