import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { KeyboardShortcutsProvider } from "./context/KeyboardShortcutsContext";
import { FormProvider } from "./context/FormContext";
import "./utils/disableTransitionsOnLoad";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ThemeProvider>
      <KeyboardShortcutsProvider>
        <FormProvider>
          <App />
        </FormProvider>
      </KeyboardShortcutsProvider>
    </ThemeProvider>
  </BrowserRouter>
);
