import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { InnogridUIProvider } from "innogrid-ui";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App.tsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <InnogridUIProvider language="ko" theme="cloudit">
        <App />
      </InnogridUIProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </StrictMode>,
);
