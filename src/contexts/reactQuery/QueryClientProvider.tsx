"use client";

import { PropsWithChildren, useState } from "react";
import { type QueryClientConfig } from "@tanstack/react-query";
import {
  QueryClientProvider as BaseQueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const QUERY_RETRY = 2;
export const STALE_TIME = 1000 * 30;
export const REFETCH_INTERVAL = 1000 * 30;

const queryClientOption: QueryClientConfig = {
  defaultOptions: {
    queries: {
      retry: QUERY_RETRY,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      networkMode: "always",
      staleTime: STALE_TIME,
      refetchInterval: REFETCH_INTERVAL,
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
