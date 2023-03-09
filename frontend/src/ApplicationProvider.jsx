import { HopeProvider } from "@hope-ui/solid"
import Application from "./Application"

window.addEventListener("contextmenu", e => e.preventDefault());

function ApplicationProvider() {
    const config = {
        initialColorMode: "dark",
        darkTheme: {
            colors: {
                primary: "#c22517",
                background: "#1e1e1e",
                color: "white",
                primary1: "#61130c",
                primary2: "#71160d",
                primary3: "#81190f",
                primary4: "#911c11",
                primary5: "#a21f13",
                primary6: "#b22215",
                primary7: "#d8291a",
                primary8: "#e53425",
                primary9: "#e8493b",
                primary10: "#ea5d50",
                primary11: "#ed7166",
                primary12: "#ef857c",
            },
        },
        lightTheme: {
            colors: {
                primary: "#c22517",
                background: "#fffffe",
                color: "black",
                primary1: "#ef857c",
                primary2: "#ed7166",
                primary3: "#ea5d50",
                primary4: "#e8493b",
                primary5: "#e53425",
                primary6: "#d8291a",
                primary7: "#b22215",
                primary8: "#a21f13",
                primary9: "#911c11",
                primary10: "#81190f",
                primary11: "#71160d",
                primary12: "#61130c",
            },
        },
    }

    return (
        <HopeProvider config={config}>
            <Application />
        </HopeProvider>
    )
}

export default ApplicationProvider