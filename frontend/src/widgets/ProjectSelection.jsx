import { styled } from "@mui/material/styles"
import { Autocomplete, TextField } from "@mui/material"

const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
    "& .MuiAutocomplete-inputRoot": {
        color: theme.palette.neutral.contrastText,
        borderColor: theme.palette.neutral.border,
        backgroundColor: theme.palette.neutral.main,
        "& .MuiOutlinedInput-notchedOutline": {
            border: "1px solid",
            borderColor: theme.palette.neutral.border,
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
            border: "1px solid",
            borderColor: theme.palette.primary.main,
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: "1px solid",
            borderColor: theme.palette.primary.main,
        },
    },
}))

function ProjectSelection(props) {
    const changeSelection = (event, value) => {
        if (typeof props.onChange === "function") {
            props.onChange(value.id)
        }
    }

    return (
        <StyledAutocomplete
            size="small"
            disablePortal={true}
            options={props.options}
            getOptionLabel={(option) => option.label}
            onChange={(event, value) => changeSelection(event, value)}
            renderInput={(params) => (
                <TextField
                    {...params}
                    sx={{ width: "100%", height: "40px" }}
                    label="Project"
                    placeholder="select a project"
                />
            )}
        />
    )
}

export default ProjectSelection
