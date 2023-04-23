import {
    Select,
    SelectContent,
    SelectIcon,
    SelectListbox,
    SelectOption,
    SelectOptionIndicator,
    SelectPlaceholder,
    SelectTrigger,
    SelectValue,
    Text,
    VStack,
} from "@hope-ui/solid"
import { For } from "solid-js"

const formSelectProps = {
    backgroundColor: "$neutral1",
    color: "$color",
    border: "1px solid $neutral9",
    _hover: {
        border: "1px solid $primary8",
        backgroundColor: "$neutral4",
        color: "$primary8",
    },
    _active: {
        backgroundColor: "$primary6",
    },
    _focus: {
        border: "1px solid $neutral9",
        boxShadow: "$none",
        _hover: {
            border: "1px solid $primary8",
            backgroundColor: "$neutral4",
            color: "$primary8",
        },
        _active: {
            backgroundColor: "$primary6",
            color: "$primary8",
        },
    },
}

function FormSelect(props) {
    const changeSelection = (value) => {
        if (typeof props.onChange === "function") {
            props.onChange(value)
        }
    }

    return (
        <Select
            value={props.value}
            onChange={(value) => changeSelection(value)}>
            <SelectTrigger {...props} {...formSelectProps}>
                <SelectPlaceholder>select a project</SelectPlaceholder>
                <SelectValue />
                <SelectIcon />
            </SelectTrigger>
            <SelectContent bg="$neutral1">
                <SelectListbox>
                    <For each={props.options}>
                        {(item) => (
                            <SelectOption value={item.id} textValue={item.label} px="$3" py="$1">
                                <VStack alignItems="flex-start">
                                    <Text>{item.label}</Text>
                                </VStack>
                                <SelectOptionIndicator />
                            </SelectOption>
                        )}
                    </For>
                </SelectListbox>
            </SelectContent>
        </Select>
    )
}

export default FormSelect
