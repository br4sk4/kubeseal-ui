import { Box, Typography, useTheme } from "@mui/material"
import { loader } from "@monaco-editor/react"
import * as monaco from "monaco-editor"
import { editor } from "monaco-editor"
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker"
import { useEffect } from "react"
import IStandaloneCodeEditor = editor.IStandaloneCodeEditor

self.MonacoEnvironment = {
    getWorker(_, label) {
        if (label != null) {
        }
        return new editorWorker()
    },
}

loader.config({ monaco })

function CodeEditor(props: any) {
    let editor: IStandaloneCodeEditor
    const theme = useTheme()

    useEffect(() => {
        let wrapper = document.getElementById(props.id)
        loader.init().then((monaco) => {
            let editorModel = monaco.editor.getModel(monaco.Uri.parse(props.id))
            editorModel = editorModel === null
                ? monaco.editor.createModel(props.content, "yaml", monaco.Uri.parse(props.id))
                : editorModel

            if (wrapper != null) {
                editor = monaco.editor.create(wrapper, {
                    value: "",
                    language: "yaml",
                    minimap: {
                        enabled: false,
                    },
                    roundedSelection: true,
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    readOnly: props.readOnly,
                    theme: "vs-" + theme.palette.mode,
                    model: editorModel,
                })

                if (editorModel != null) {
                    editorModel.onDidChangeContent(() => {
                        if (typeof props.onChange === "function") {
                            props.onChange(editor.getValue())
                        }
                    })
                }
            }
        })
    }, [])

    useEffect(() => {
        monaco.editor.setTheme("vs-" + theme.palette.mode)
        if (props.id === "sealedSecret") {
            let editorModel = monaco.editor.getModel(monaco.Uri.parse(props.id))
            if (editorModel != null) {
                editorModel.setValue(props.content)
            }
        }
    }, [theme.palette.mode, props.content])

    return (
        <Box sx={{ width: "100%", height: "100%" }}>
            <Box sx={{ paddingLeft: "15px", paddingTop: "5px", paddingBottom: "5px" }}>
                <Typography sx={{ height: "30px", lineHeight: "30px", fontWeight: "600" }}>{props.title}</Typography>
            </Box>
            <Box sx={{ width: "100%", height: "calc(100% - 40px)", padding: "0" }}>
                <div id={props.id} style={{ width: "100%", height: "100%", padding: "0" }} />
            </Box>
        </Box>
    )
}

export default CodeEditor
