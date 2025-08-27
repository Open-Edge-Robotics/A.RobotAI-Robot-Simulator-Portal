
import { StrictMode } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { InnogridUIProvider } from "innogrid-ui";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";

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
