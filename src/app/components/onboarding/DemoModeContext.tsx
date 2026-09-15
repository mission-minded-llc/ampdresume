"use client";

import { createContext, useContext } from "react";

/**
 * When true, editor components skip GraphQL writes so tutorial demos
 * can use the real UI without changing the signed-in user's resume.
 */
export const DemoModeContext = createContext(false);

export const useDemoMode = () => useContext(DemoModeContext);
