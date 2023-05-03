import { darken, lighten, styled } from "@mui/material/styles"
import { Autocomplete, Popper, TextField } from "@mui/material"

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

const StyledPopper = styled(Popper)(({ theme }) => ({
    "& ul": {
        backgroundColor: theme.palette.neutral.main,
    },
}))

const GroupHeader = styled("div")(({ theme }) => ({
    padding: "4px 10px",
    color: theme.palette.primary.main,
    backgroundColor:
        theme.palette.mode === "light"
            ? lighten(theme.palette.primary.light, 0.8)
            : darken(theme.palette.primary.main, 0.8),
}))

const GroupItems = styled("ul")({
    padding: 0,
})

function ProjectSelection(props) {
    const changeSelection = (event, value) => {
        if (typeof props.onChange === "function") {
            props.onChange(value !== null ? value.id : "")
        }
    }

    return (
        <StyledAutocomplete
            size="small"
            disablePortal={true}
            options={props.options}
            groupBy={(option) => option.group}
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
            renderGroup={(params) => (
                <li key={params.key}>
                    <GroupHeader>{params.group}</GroupHeader>
                    <GroupItems>{params.children}</GroupItems>
                </li>
            )}
            PopperComponent={StyledPopper}
        />
    )
}

export default ProjectSelection
