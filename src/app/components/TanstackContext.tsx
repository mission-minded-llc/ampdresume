"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import React, { useState } from "react";

export const TanstackQueryProvider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
