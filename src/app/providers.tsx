"use client";

import { FlagsmithProvider } from "flagsmith/react";
import React from "react";
import flagsmith from "flagsmith/isomorphic";

export function Providers({ children }: { children: React.ReactElement }) {
  return <FlagsmithProvider flagsmith={flagsmith}>{children}</FlagsmithProvider>;
}
