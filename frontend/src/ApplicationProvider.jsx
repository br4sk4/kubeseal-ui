import { HopeProvider } from "@hope-ui/solid"
import Application from "./Application"

window.addEventListener("contextmenu", (e) => e.preventDefault())

function ApplicationProvider() {
    const config = {
        initialColorMode: "dark",
        darkTheme: {
            colors: {
                primary: "#008080",
                background: "#1e1e1e",
                color: "white",
                primary1: "#004040",
                primary2: "#004b4b",
                primary3: "#005555",
                primary4: "#006060",
                primary5: "#006b6b",
                primary6: "#007575",
                primary7: "#00a0a0",
                primary8: "#00c0c0",
                primary9: "#00dfe0",
                primary10: "#00ffff",
                primary11: "#20ffff",
                primary12: "#40ffff",
            },
        },
        lightTheme: {
            colors: {
                primary: "#008080",
                background: "#fffffe",
                color: "black",
                primary1: "#40ffff",
                primary2: "#20ffff",
                primary3: "#00ffff",
                primary4: "#00dfe0",
                primary5: "#00c0c0",
                primary6: "#00a0a0",
                primary7: "#007575",
                primary8: "#006b6b",
                primary9: "#006060",
                primary10: "#005555",
                primary11: "#004b4b",
                primary12: "#004040",
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
