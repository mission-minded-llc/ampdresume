"use client";

import { FlagsmithProvider } from "flagsmith/react";
import React from "react";
import flagsmith from "flagsmith/isomorphic";

export function Providers({ children }: { children: React.ReactElement }) {
  return (
    <FlagsmithProvider
      flagsmith={flagsmith}
      options={{ environmentID: process.env.NEXT_PUBLIC_FLAGSMITH_ENVIRONMENT_ID || "" }}
    >
      {children}
    </FlagsmithProvider>
  );
}
