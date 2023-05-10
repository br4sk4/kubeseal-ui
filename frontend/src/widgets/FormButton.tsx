import { styled } from "@mui/material/styles"
import { Button } from "@mui/material"

const StyledButton = styled(Button)(({ theme }) => ({
    width: "120px",
    fontSize: "1rem",
    fontWeight: "500",
    textTransform: "none",
    color: theme.palette.neutral.contrastText,
    border: "1px solid",
    borderColor: theme.palette.neutral.border,
    backgroundColor: theme.palette.neutral.main,
    "&:hover": {
        border: "1px solid",
        borderColor: theme.palette.primary.main,
        color: theme.palette.primary.main,
    },
    "&:focus": {
        outline: "0",
    },
}))

function FormButton(props: any) {
    return <StyledButton {...props} />
}

export default FormButton
