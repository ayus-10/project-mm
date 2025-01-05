import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import AuthenticatedUserProvider from "./providers/AuthenticatedUserProvider";
import ThemeProvider from "./providers/ThemeProvider";
import AuthGuard from "./guards/AuthGuard";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthenticatedUserProvider>
        <ThemeProvider>
          <AuthGuard>
            <App />
          </AuthGuard>
        </ThemeProvider>
      </AuthenticatedUserProvider>
    </BrowserRouter>
  </StrictMode>,
);
