import { Button, css, IconButton, Text } from "@hope-ui/solid"
import { Show } from "solid-js"

const formButtonCSS = css({
    backgroundColor: "$neutral1",
    color: "$color",
    border: "1px solid $neutral9",
    "&:hover": {
        border: "1px solid $primary8",
        backgroundColor: "$neutral4",
        color: "$primary8",
    },
    "&:active": {
        backgroundColor: "$primary6",
    },
    "&:focus": {
        boxShadow: "none",
        border: "1px solid $neutral9",
        "&:hover": {
            border: "1px solid $primary8",
            backgroundColor: "$neutral4",
            color: "$primary8",
        },
        "&:active": {
            backgroundColor: "$primary6",
            color: "$primary8",
        },
    },
})

function FormButton(props) {
    return (
        <>
            <Show when={!!props.icon}>
                <IconButton
                    variant="default"
                    color="$color"
                    class={formButtonCSS()}
                    {...props}
                />
            </Show>
            <Show when={!!props.text && props.text !== ""}>
                <Button variant="default" class={formButtonCSS()} {...props}>
                    <Text>{props.text}</Text>
                </Button>
            </Show>
        </>
    )
}

export default FormButton
