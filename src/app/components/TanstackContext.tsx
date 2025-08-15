"use client";

import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

/**
 * The Tanstack Query provider for interacting with the GraphQL API.
 */
export const TanstackQueryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
