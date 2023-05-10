import ReactDOM from "react-dom/client"
import "./index.css"
import ApplicationProvider from "./ApplicationProvider"
import { Provider } from "react-redux"
import store from "./stores/store"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <Provider store={store}>
        <ApplicationProvider />,
    </Provider>,
)
