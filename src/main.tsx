import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { InnogridUIProvider } from "innogrid-ui";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <InnogridUIProvider language="ko" theme="cloudit">
      <App />
    </InnogridUIProvider>
  </StrictMode>,
);
