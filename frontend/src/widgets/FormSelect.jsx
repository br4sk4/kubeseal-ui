import {
    Select,
    SelectContent,
    SelectIcon,
    SelectListbox,
    SelectOption,
    SelectOptionIndicator,
    SelectOptionText,
    SelectPlaceholder,
    SelectTrigger,
    SelectValue,
    Text,
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
                <SelectValue>
                    {({ selectedOptions }) =>
                        selectedOptions.map((option) => (
                            <Text>{option.value}</Text>
                        ))
                    }
                </SelectValue>
                <SelectIcon />
            </SelectTrigger>
            <SelectContent bg="$neutral1">
                <SelectListbox>
                    <For each={props.options}>
                        {(project) => (
                            <SelectOption value={project}>
                                <SelectOptionText>{project}</SelectOptionText>
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
