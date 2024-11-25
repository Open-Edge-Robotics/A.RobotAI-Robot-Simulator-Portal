"use client";

import { PropsWithChildren, useState } from "react";
import { type QueryClientConfig } from "@tanstack/react-query";
import {
  QueryClientProvider as BaseQueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const RETRY = 1;
const STALE_TIME = 1000 * 60;

const queryClientOption: QueryClientConfig = {
  defaultOptions: {
    queries: {
      retry: RETRY,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      networkMode: "always",
      staleTime: STALE_TIME,
      throwOnError: true,
    },
    mutations: {
      networkMode: "always",
    },
  },
};

const QueryClientProvider = ({ children }: PropsWithChildren) => {
  const [queryClient] = useState(() => new QueryClient(queryClientOption));
  return (
    <BaseQueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </BaseQueryClientProvider>
  );
};

export default QueryClientProvider;
