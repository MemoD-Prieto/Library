import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { HashRouter as Router } from "react-router-dom"; // Cambia BrowserRouter por HashRouter

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
    <React.StrictMode>
        {/* Envolvemos la app en HashRouter */}
        <Router>
            <App />
        </Router>
    </React.StrictMode>
);
