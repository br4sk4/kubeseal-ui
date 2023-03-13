import "monaco-editor/esm/vs/editor/editor.all.js"
import "monaco-editor/esm/vs/basic-languages/monaco.contribution"

import * as monaco from "monaco-editor/esm/vs/editor/editor.api"

import { createEffect, onMount } from "solid-js"
import { Heading, useColorMode } from "@hope-ui/solid"

function CodeEditor(props) {
    let editor
    const { colorMode } = useColorMode()

    onMount(() => {
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
            theme: "vs-dark",
        })

        editor.getModel().onDidChangeContent((event) => {
            if (typeof props.onChange === "function") {
                props.onChange(editor.getValue())
            }
        })
    })

    createEffect(() => {
        editor.getModel().setValue(props.content)
    })

    createEffect(() => {
        monaco.editor.setTheme("vs-" + colorMode())
    })

    return (
        <>
            <Heading
                paddingLeft="15px"
                paddingTop="5px"
                paddingBottom="5px"
                lineHeight="30px">
                {props.title}
            </Heading>
            <div
                id={props.id}
                style="height: calc(100% - 40px); width: 100%;"
            />
        </>
    )
}

export default CodeEditor
