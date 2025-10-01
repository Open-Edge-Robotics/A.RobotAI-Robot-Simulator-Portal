import { StrictMode } from "react";
import { ToastContainer } from "react-toastify";

import { QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { InnogridUIProvider } from "innogrid-ui";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";
import AuthProvider from "./contexts/AuthProvider.tsx";
import { handleMutationError, handleQueryError } from "./utils/common/error.ts";

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: { onError: handleMutationError },
  },
  queryCache: new QueryCache({ onError: handleQueryError }),
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <InnogridUIProvider language="ko" theme="cloudit">
        <AuthProvider>
          <App />
        </AuthProvider>
        <ToastContainer position="top-center" newestOnTop autoClose={3000} />
      </InnogridUIProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </StrictMode>,
);
