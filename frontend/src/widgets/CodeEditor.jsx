import "monaco-editor/esm/vs/editor/editor.all.js"
import "monaco-editor/esm/vs/basic-languages/monaco.contribution"

import * as monaco from "monaco-editor/esm/vs/editor/editor.api"
import { useEffect } from "react"
import { Box, Typography, useTheme } from "@mui/material"

function CodeEditor(props) {
    let editor

    const theme = useTheme()

    useEffect(() => {
        let container = document.getElementById(props.id)

        editor = monaco.editor.create(container, {
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
            model: monaco.editor.createModel(props.content, "yaml", monaco.Uri.parse(props.id)),
        })

        editor.getModel().onDidChangeContent(() => {
            if (props.id === "sourceSecret" && typeof props.onChange === "function") {
                props.onChange(editor.getValue())
            }
        })
    }, [])

    useEffect(() => {
        monaco.editor.setTheme("vs-" + theme.palette.mode)
        if (props.id === "sealedSecret") {
            monaco.editor.getModel(monaco.Uri.parse(props.id)).setValue(props.content)
        }
    })

    return (
        <Box sx={{ width: "100%", height: "100%" }}>
            <Box sx={{ paddingLeft: "15px", paddingTop: "5px", paddingBottom: "5px" }}>
                <Typography sx={{ height: "30px", lineHeight: "30px", fontWeight: "600" }}>{props.title}</Typography>
            </Box>
            <Box id={props.id} sx={{ width: "100%", height: "calc(100% - 40px)", padding: "0" }} />
        </Box>
    )
}

export default CodeEditor
